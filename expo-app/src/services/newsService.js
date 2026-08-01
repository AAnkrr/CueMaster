// News aggregation service
// In production: fetches from real RSS feeds via a CORS proxy or backend
// For now: provides a structured way to add real sources

const NEWS_SOURCES = {
  wst: {
    name: 'WST 官方',
    url: 'https://www.wst.tv/news',
    type: 'official',
  },
  bbc: {
    name: 'BBC Sport',
    url: 'https://www.bbc.com/sport/snooker',
    type: 'media',
  },
  snookerHQ: {
    name: 'SnookerHQ',
    url: 'https://snookerhq.com',
    type: 'blog',
  },
  taiqiuHQ: {
    name: '台球HQ',
    url: 'https://www.taiqiuhq.com',
    type: 'blog',
  },
};

// Expanded mock news pool for more variety
const MOCK_NEWS_POOL = [
  {
    id: 'n1', title: '赵心童创造历史——成为首位打进世锦赛决赛的中国球员',
    summary: '赵心童在半决赛中以17-12击败尼尔·罗伯逊，成为斯诺克历史上第一位进入世界锦标赛决赛的中国球员，全场轰出5杆破百。',
    cat: '赛事', src: 'WST 官方', time: '2026-05-02',
  },
  {
    id: 'n2', title: '特鲁姆普赢得第四个世锦赛冠军',
    summary: '特鲁姆普在决赛中以18-15战胜赵心童，获得个人第四个世界冠军头衔，成为继亨德利、奥沙利文后第三位四冠王。',
    cat: '赛事', src: 'BBC Sport', time: '2026-05-04',
  },
  {
    id: 'n3', title: '2026/27赛季赛程公布——中国赛事增至6站',
    summary: 'WST公布新赛季完整赛程，上海大师赛7月28日拉开新赛季大幕。中国赛事增加至6站，创历史新高。',
    cat: '排名', src: 'WST 官方', time: '2026-06-09',
  },
  {
    id: 'n4', title: '世界排名更新：特鲁姆普稳居第一，赵心童冲入前三',
    summary: '世锦赛后最新世界排名中，特鲁姆普以超过165万英镑继续位居榜首，赵心童首次进入世界前三，中国4人进入前16。',
    cat: '排名', src: 'WST 官方', time: '2026-05-07',
  },
  {
    id: 'n5', title: '奥沙利文计划复出：瞄准第八个世界冠军',
    summary: '罗尼·奥沙利文表示将在新赛季恢复参赛，目标第八个世锦赛冠军。这位七届世界冠军上赛季因医疗原因排名跌至第14位。',
    cat: '球员', src: 'BBC Sport', time: '2026-07-15',
  },
  {
    id: 'n6', title: '吴宜泽德国大师赛轰147满分——赛季第三杆147',
    summary: '中国小将吴宜泽在德国大师赛资格赛中轰出职业生涯首杆147满分，这也是2025/26赛季的第三杆满分。',
    cat: '赛事', src: 'SnookerHQ', time: '2026-01-28',
  },
  {
    id: 'n7', title: '丁俊晖确认参加上海大师赛——中国德比即将上演',
    summary: '丁俊晖确认将以外卡身份参加2026上海大师赛，有望在八强与中国新星赵心童上演中国德比。',
    cat: '球员', src: '台球HQ', time: '2026-07-20',
  },
  {
    id: 'n8', title: '斯诺克运动在中国：年轻一代崛起',
    summary: '随着赵心童、吴宜泽、斯佳辉等年轻选手的崛起，斯诺克在中国的热度持续攀升。中国已经成为仅次于英国的第二大斯诺克市场。',
    cat: '排名', src: '台球HQ', time: '2026-06-15',
  },
  {
    id: 'n9', title: '马克·威廉姆斯宣布2026/27赛季后考虑退役',
    summary: '三届世锦赛冠军马克·威廉姆斯表示将在明年49岁生日后评估是否继续职业生涯，或将2026/27赛季作为告别赛季。',
    cat: '球员', src: 'BBC Sport', time: '2026-07-10',
  },
  {
    id: 'n10', title: 'WST推出全新赛事体系——更多机会给年轻球员',
    summary: '世界斯诺克巡回赛宣布从下赛季起推出全新资格赛体系，为年轻球员提供更多参与排名赛的机会。',
    cat: '赛事', src: 'WST 官方', time: '2026-06-01',
  },
];

// Simulate fetching news (replace with real API calls in production)
export async function fetchNews({ sport = 'snooker', category = 'all', language = 'zh' } = {}) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

  let items = [...MOCK_NEWS_POOL];

  if (category !== 'all') {
    items = items.filter(n => n.cat === category);
  }

  // Add relative time
  const now = new Date();
  items = items.map(item => {
    const published = new Date(item.time);
    const diffMs = now - published;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    let timeAgo;
    if (diffMins < 60) timeAgo = `${diffMins}分钟前`;
    else if (diffHours < 24) timeAgo = `${diffHours}小时前`;
    else if (diffDays < 7) timeAgo = `${diffDays}天前`;
    else if (diffDays < 30) timeAgo = `${Math.floor(diffDays / 7)}周前`;
    else timeAgo = item.time;

    return { ...item, timeAgo };
  });

  return items;
}

export { NEWS_SOURCES };
