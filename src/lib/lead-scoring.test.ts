import { describe, test, expect } from 'vitest';
import {
  normalizePhone,
  computeLeadScore,
  isHotLead,
  HOT_LEAD_THRESHOLD,
  idempotencyKey,
  hashBucket,
  pickVariant,
} from './lead-scoring';

// ============================================================
// normalizePhone
// ============================================================
describe('normalizePhone', () => {
  test('strips spaces, dashes, parens', () => {
    expect(normalizePhone('0916 961 409')).toBe('0916961409');
    expect(normalizePhone('0916-961-409')).toBe('0916961409');
    expect(normalizePhone('(0916) 961 409')).toBe('0916961409');
  });

  test('converts +84 to 0 prefix', () => {
    expect(normalizePhone('+84916961409')).toBe('0916961409');
    expect(normalizePhone('+84 916 961 409')).toBe('0916961409');
  });

  test('converts 84 prefix (length 11) to 0', () => {
    expect(normalizePhone('84916961409')).toBe('0916961409');
  });

  test('leaves already-normalized phone alone', () => {
    expect(normalizePhone('0916961409')).toBe('0916961409');
  });

  test('handles null/undefined/empty', () => {
    expect(normalizePhone(null)).toBe('');
    expect(normalizePhone(undefined)).toBe('');
    expect(normalizePhone('')).toBe('');
  });
});

// ============================================================
// computeLeadScore
// ============================================================
describe('computeLeadScore', () => {
  test('empty input returns base weight × 10', () => {
    expect(computeLeadScore({})).toBe(10); // default weight 1.0 × 10
  });

  test('applies form weight', () => {
    expect(computeLeadScore({ lead_score_weight: 2.0 })).toBe(20);
    expect(computeLeadScore({ lead_score_weight: 3.0 })).toBe(30);
  });

  test('adds funnel base', () => {
    expect(computeLeadScore({}, { lead_score_base: 40 })).toBe(50); // 10 + 40
  });

  test('profile bonuses accumulate', () => {
    const data = {
      email: 'a@b.com',     // +5
      phone: '0916961409',  // +10
      full_name: 'A',       // +5
      child_name: 'B',      // +5
      school_level: 'thpt', // +5
    };
    expect(computeLeadScore(data)).toBe(10 + 5 + 10 + 5 + 5 + 5); // 40
  });

  test('campus + date bonuses for trial bookings', () => {
    expect(
      computeLeadScore({
        email: 'a@b.com',
        phone: '0916961409',
        full_name: 'A',
        preferred_campus: 'phu-nhuan', // +5
        preferred_date: '2026-05-01',  // +10
      }),
    ).toBe(10 + 5 + 10 + 5 + 5 + 10);
  });

  test('google/cpc gets highest UTM bonus', () => {
    expect(
      computeLeadScore({ utm_source: 'google', utm_medium: 'cpc' }),
    ).toBe(10 + 8);
    expect(
      computeLeadScore({ utm_source: 'GOOGLE', utm_medium: 'CPC' }),
    ).toBe(10 + 8); // case insensitive
  });

  test('facebook/paid gets +5', () => {
    expect(
      computeLeadScore({ utm_source: 'facebook', utm_medium: 'paid_social' }),
    ).toBe(10 + 5);
  });

  test('zalo +6, referral +4, unknown 0', () => {
    expect(computeLeadScore({ utm_source: 'zalo' })).toBe(10 + 6);
    expect(computeLeadScore({ utm_source: 'referral' })).toBe(10 + 4);
    expect(computeLeadScore({ utm_source: 'organic' })).toBe(10); // no bonus
  });

  test('only one UTM bonus applies (not stacked)', () => {
    const score = computeLeadScore({ utm_source: 'google', utm_medium: 'cpc' });
    expect(score).toBe(10 + 8); // google/cpc wins, no zalo/referral added
  });

  test('caps at 100', () => {
    const score = computeLeadScore(
      {
        email: 'a@b.com',
        phone: '0916961409',
        full_name: 'A',
        child_name: 'B',
        school_level: 'thpt',
        preferred_campus: 'phu-nhuan',
        preferred_date: '2026-05-01',
        lead_score_weight: 10.0, // exaggerated
        utm_source: 'google',
        utm_medium: 'cpc',
      },
      { lead_score_base: 100 },
    );
    expect(score).toBe(100);
  });

  test('realistic hot lead: trial booking + google ads', () => {
    const score = computeLeadScore(
      {
        email: 'parent@example.com',
        phone: '0916961409',
        full_name: 'Nguyễn Văn A',
        child_name: 'Nguyễn Văn B',
        school_level: 'thcs',
        preferred_campus: 'phu-nhuan',
        preferred_date: '2026-05-15',
        lead_score_weight: 2.0, // trial form
        utm_source: 'google',
        utm_medium: 'cpc',
      },
      { lead_score_base: 75 }, // trial_thcs_tham_quan base
    );
    // 20 + 75 + 5 + 10 + 5 + 5 + 5 + 5 + 10 + 8 = 148 → capped at 100
    expect(score).toBe(100);
    expect(isHotLead(score)).toBe(true);
  });

  test('realistic soft lead: lead magnet awareness page organic', () => {
    const score = computeLeadScore(
      { email: 'parent@example.com' }, // step 1 partial
      { lead_score_base: 15 }, // awareness
    );
    // 10 + 15 + 5 = 30
    expect(score).toBe(30);
    expect(isHotLead(score)).toBe(false);
  });
});

// ============================================================
// isHotLead / HOT_LEAD_THRESHOLD
// ============================================================
describe('isHotLead', () => {
  test('threshold is 70', () => {
    expect(HOT_LEAD_THRESHOLD).toBe(70);
  });

  test('69 is not hot, 70 is hot', () => {
    expect(isHotLead(69)).toBe(false);
    expect(isHotLead(70)).toBe(true);
    expect(isHotLead(100)).toBe(true);
  });
});

// ============================================================
// idempotencyKey
// ============================================================
describe('idempotencyKey', () => {
  test('returns 64-char hex SHA-256', async () => {
    const key = await idempotencyKey({ email: 'a@b.com', phone: '0916961409', page: '/x' });
    expect(key).toMatch(/^[0-9a-f]{64}$/);
  });

  test('same inputs within same hour → same key', async () => {
    const input = { email: 'a@b.com', phone: '0916961409', page: '/x' };
    const k1 = await idempotencyKey(input);
    const k2 = await idempotencyKey(input);
    expect(k1).toBe(k2);
  });

  test('different emails → different keys', async () => {
    const k1 = await idempotencyKey({ email: 'a@b.com', phone: '0916961409', page: '/x' });
    const k2 = await idempotencyKey({ email: 'c@d.com', phone: '0916961409', page: '/x' });
    expect(k1).not.toBe(k2);
  });

  test('different pages → different keys (same contact, different funnels)', async () => {
    const k1 = await idempotencyKey({ email: 'a@b.com', phone: '0916961409', page: '/x' });
    const k2 = await idempotencyKey({ email: 'a@b.com', phone: '0916961409', page: '/y' });
    expect(k1).not.toBe(k2);
  });

  test('missing fields still produce stable key', async () => {
    const k1 = await idempotencyKey({ phone: '0916961409' });
    const k2 = await idempotencyKey({ phone: '0916961409' });
    expect(k1).toBe(k2);
    expect(k1).toMatch(/^[0-9a-f]{64}$/);
  });
});

// ============================================================
// hashBucket + pickVariant (A/B testing)
// ============================================================
describe('hashBucket', () => {
  test('returns value in [0, 1)', () => {
    for (const seed of ['a', 'ab', 'test-123', 'squeeze_lop6_checklist:tuyen-sinh/thcs']) {
      const b = hashBucket(seed);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThan(1);
    }
  });

  test('same seed → same bucket (deterministic)', () => {
    expect(hashBucket('test')).toBe(hashBucket('test'));
    expect(hashBucket('mam-non/checklist:v_a')).toBe(hashBucket('mam-non/checklist:v_a'));
  });

  test('different seeds → different buckets', () => {
    expect(hashBucket('a')).not.toBe(hashBucket('b'));
  });

  test('well-distributed across many seeds', () => {
    // Simple distribution smoke test: generate 1000 hashes, check spread
    const buckets: number[] = [];
    for (let i = 0; i < 1000; i++) buckets.push(hashBucket(`user-${i}`));
    const lowHalf = buckets.filter((b) => b < 0.5).length;
    // Expect roughly 50/50 split, allow 40-60 range
    expect(lowHalf).toBeGreaterThan(400);
    expect(lowHalf).toBeLessThan(600);
  });
});

describe('pickVariant', () => {
  const variants = [
    { name: 'v_a', weight: 0.5 },
    { name: 'v_b', weight: 0.5 },
  ];

  test('bucket 0.0 picks first variant', () => {
    expect(pickVariant(variants, 0).name).toBe('v_a');
  });

  test('bucket 0.49 picks v_a, 0.51 picks v_b with equal weights', () => {
    expect(pickVariant(variants, 0.49).name).toBe('v_a');
    expect(pickVariant(variants, 0.51).name).toBe('v_b');
  });

  test('bucket 1.0 picks last variant', () => {
    expect(pickVariant(variants, 1.0).name).toBe('v_b');
  });

  test('unequal weights split proportionally (70/30)', () => {
    const uneven = [
      { name: 'v_a', weight: 0.7 },
      { name: 'v_b', weight: 0.3 },
    ];
    expect(pickVariant(uneven, 0.5).name).toBe('v_a');   // 0.5 ≤ 0.7
    expect(pickVariant(uneven, 0.75).name).toBe('v_b'); // 0.75 > 0.7
  });

  test('3-way split', () => {
    const three = [
      { name: 'a', weight: 1 },
      { name: 'b', weight: 1 },
      { name: 'c', weight: 1 },
    ];
    expect(pickVariant(three, 0.1).name).toBe('a'); // 0.1 ≤ 0.333
    expect(pickVariant(three, 0.5).name).toBe('b'); // 0.5 ≤ 0.666
    expect(pickVariant(three, 0.9).name).toBe('c'); // 0.9 > 0.666
  });

  test('weights normalize — absolute values do not matter', () => {
    const small = [{ name: 'a', weight: 1 }, { name: 'b', weight: 1 }];
    const large = [{ name: 'a', weight: 1000 }, { name: 'b', weight: 1000 }];
    // Same split regardless of absolute weights
    expect(pickVariant(small, 0.4).name).toBe(pickVariant(large, 0.4).name);
  });
});
