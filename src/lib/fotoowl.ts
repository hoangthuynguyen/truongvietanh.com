// FotoOwl AI — thư viện ảnh sự kiện tại photos.truongvietanh.com
// Lấy danh sách album (event) công khai qua open API, dùng để nhúng vào /hinh-anh/.
// Ảnh vẫn được host trên FotoOwl; trang chỉ hiển thị ảnh bìa + link sang album.

const FOTOOWL_DOMAIN = 'photos.truongvietanh.com';
const FOTOOWL_API = 'https://openapi.fotoowl.ai/open';

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

    return all
      // chỉ album công khai, không hỏi PIN
      .filter((ev) => !ev.event_ask_pin && ev.link)
      .map((ev) => ({
        id: ev.event_id,
        name: (ev.name || '').trim(),
        date: ev.date || null,
        link: ev.link,
        cover: pickCover(ev),
      }))
      // giữ mọi album công khai có tên; album không có ảnh bìa sẽ dùng placeholder ở UI
      .filter((a) => a.name);
  } catch {
    return [];
  }
}
