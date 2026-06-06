// FotoOwl AI — thư viện ảnh sự kiện tại photos.truongvietanh.com
// Lấy danh sách album (event) công khai qua open API, dùng để nhúng vào /hinh-anh/.
// Ảnh vẫn được host trên FotoOwl; trang chỉ hiển thị ảnh bìa + link sang album.

const FOTOOWL_DOMAIN = 'photos.truongvietanh.com';
const FOTOOWL_API = 'https://openapi.fotoowl.ai/open';
const FOTOOWL_STORAGE = 'https://storage.fotoowl.ai';

export type FotoowlAlbum = {
  id: number;
  name: string;
  date: string | null;
  link: string;        // URL mở album trên FotoOwl (đã kèm access_key)
  cover: string | null; // ảnh bìa (thumbnail)
};

function pickCover(ev: any): string | null {
  const c = ev?.cover_image_info ?? {};
  return (
    c.thumbnail_url ||
    c.path_dict?.thumbnail_url ||
    c.med_url ||
    c.path_dict?.med_url ||
    c.img_url ||
    c.path_dict?.img_url ||
    null
  );
}

// Album thiếu ảnh bìa: lấy tấm ảnh đầu tiên bên trong album làm bìa.
async function fetchFirstImageCover(eventId: number, accessKey: string | null | undefined): Promise<string | null> {
  if (!accessKey) return null;
  try {
    const url = `${FOTOOWL_API}/event/image-list?event_id=${eventId}&page=0&page_size=1&order_by=2&order_asc=true&direct=true&access_key=${accessKey}&team_view=false`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const img = (json?.data?.image_list || [])[0];
    const path: string | undefined = img?.med_path || img?.low_path || img?.raw_path;
    if (!path) return null;
    return `${FOTOOWL_STORAGE}/cdn-cgi/image/height=480,quality=80,format=auto/${encodeURI(path)}`;
  } catch {
    return null;
  }
}

export async function getFotoowlAlbums(): Promise<FotoowlAlbum[]> {
  try {
    const all: any[] = [];
    // API trả tối đa 100/trang; gom hết các trang (hiện ~108 album).
    for (let page = 0; page < 12; page++) {
      const url = `${FOTOOWL_API}/access_event_list?domain_url=${FOTOOWL_DOMAIN}&page=${page}&page_size=100&sort_type=3`;
      const res = await fetch(url);
      if (!res.ok) break;
      const json = await res.json();
      const list: any[] = Array.isArray(json?.data) ? json.data : [];
      if (list.length === 0) break;
      all.push(...list);
      if (list.length < 100) break;
    }

    const albums = all
      // chỉ album công khai, không hỏi PIN
      .filter((ev) => !ev.event_ask_pin && ev.link)
      .map((ev) => ({
        id: ev.event_id as number,
        name: (ev.name || '').trim(),
        date: ev.date || null,
        link: ev.link as string,
        cover: pickCover(ev),
        accessKey: (ev.event_access_key as string) || null,
      }))
      // giữ mọi album công khai có tên
      .filter((a) => a.name);

    // Album không có ảnh bìa → lấy tấm đầu tiên trong album (chạy song song).
    // Album rỗng thật sẽ vẫn cover=null và dùng placeholder ở UI.
    await Promise.all(
      albums
        .filter((a) => !a.cover)
        .map(async (a) => {
          a.cover = await fetchFirstImageCover(a.id, a.accessKey);
        })
    );

    return albums.map(({ accessKey, ...rest }) => rest);
  } catch {
    return [];
  }
}
