// ============================================================
// CueMaster Mock Data — 多赛季 + 球员头像 + 中式八球 + 九球
// ============================================================

// ---- Player avatars from snooker.org / WST ----
const AVATAR_BASE = 'https://cdn.snooker.org/headshots';
const FALLBACK_AVATAR = null; // will use initials

export function getPlayerAvatar(playerId) {
  // Real snooker.org headshots exist for most pros
  return `${AVATAR_BASE}/${playerId}.png`;
}

// ---- FLAG EMOJI MAP ----
const FLAGS = {
  ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', WAL: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', NIR: '🇬🇧',
  CHN: '🇨🇳', AUS: '🇦🇺', BEL: '🇧🇪', THA: '🇹🇭', IRI: '🇮🇷',
  IND: '🇮🇳', PAK: '🇵🇰', HKG: '🇭🇰', GER: '🇩🇪', SUI: '🇨🇭',
  MLT: '🇲🇹', NOR: '🇳🇴', USA: '🇺🇸', CAN: '🇨🇦', BRA: '🇧🇷',
  TPE: '🇹🇼', PHI: '🇵🇭', JPN: '🇯🇵', KOR: '🇰🇷', AUT: '🇦🇹',
  RUS: '🇷🇺', POL: '🇵🇱', NED: '🇳🇱', ESP: '🇪🇸',
};

// ======================================================================
// SNOOKER — PLAYERS (with avatar URLs & flags)
// ======================================================================
export const snookerPlayers = [
  { id:'s1',  name:'Judd Trump',       zh:'贾德·特鲁姆普', nation:'ENG', flag:FLAGS.ENG, rank:1,  points:1655550, change:0,  turnedPro:2005, highRank:1,  avatar:`${AVATAR_BASE}/trump.png` },
  { id:'s2',  name:'Neil Robertson',   zh:'尼尔·罗伯逊',   nation:'AUS', flag:FLAGS.AUS, rank:2,  points:1210550, change:3,  turnedPro:1998, highRank:1,  avatar:`${AVATAR_BASE}/robertson.png` },
  { id:'s3',  name:'Zhao Xintong',     zh:'赵心童',        nation:'CHN', flag:FLAGS.CHN, rank:3,  points:1176550, change:0,  turnedPro:2016, highRank:3,  avatar:`${AVATAR_BASE}/zhao.png` },
  { id:'s4',  name:'Wu Yize',          zh:'吴宜泽',        nation:'CHN', flag:FLAGS.CHN, rank:4,  points:1120900, change:5,  turnedPro:2019, highRank:4,  avatar:`${AVATAR_BASE}/wu.png` },
  { id:'s5',  name:'John Higgins',     zh:'约翰·希金斯',   nation:'SCO', flag:FLAGS.SCO, rank:5,  points:958350,  change:0,  turnedPro:1992, highRank:1,  avatar:`${AVATAR_BASE}/higgins.png` },
  { id:'s6',  name:'Shaun Murphy',     zh:'肖恩·墨菲',     nation:'ENG', flag:FLAGS.ENG, rank:6,  points:956800,  change:0,  turnedPro:1997, highRank:3,  avatar:`${AVATAR_BASE}/murphy.png` },
  { id:'s7',  name:'Mark Williams',    zh:'马克·威廉姆斯', nation:'WAL', flag:FLAGS.WAL, rank:7,  points:903400,  change:0,  turnedPro:1992, highRank:1,  avatar:`${AVATAR_BASE}/williams.png` },
  { id:'s8',  name:'Kyren Wilson',     zh:'凯伦·威尔逊',   nation:'ENG', flag:FLAGS.ENG, rank:8,  points:897100,  change:-6, turnedPro:2010, highRank:2,  avatar:`${AVATAR_BASE}/wilson.png` },
  { id:'s9',  name:'Mark Selby',       zh:'马克·塞尔比',   nation:'ENG', flag:FLAGS.ENG, rank:9,  points:849350,  change:0,  turnedPro:1999, highRank:1,  avatar:`${AVATAR_BASE}/selby.png` },
  { id:'s10', name:'Barry Hawkins',    zh:'巴里·霍金斯',   nation:'ENG', flag:FLAGS.ENG, rank:10, points:685350,  change:0,  turnedPro:1996, highRank:4,  avatar:`${AVATAR_BASE}/hawkins.png` },
  { id:'s11', name:'Xiao Guodong',     zh:'肖国栋',        nation:'CHN', flag:FLAGS.CHN, rank:11, points:658900,  change:0,  turnedPro:2007, highRank:11, avatar:`${AVATAR_BASE}/xiao.png` },
  { id:'s12', name:'Mark Allen',       zh:'马克·艾伦',     nation:'NIR', flag:FLAGS.NIR, rank:12, points:587750,  change:0,  turnedPro:2005, highRank:1,  avatar:`${AVATAR_BASE}/allen.png` },
  { id:'s13', name:'Chris Wakelin',    zh:'克里斯·韦克林', nation:'ENG', flag:FLAGS.ENG, rank:13, points:584200,  change:0,  turnedPro:2013, highRank:13, avatar:`${AVATAR_BASE}/wakelin.png` },
  { id:'s14', name:"Ronnie O'Sullivan",zh:'罗尼·奥沙利文', nation:'ENG', flag:FLAGS.ENG, rank:14, points:551250,  change:-9, turnedPro:1992, highRank:1,  avatar:`${AVATAR_BASE}/osullivan.png` },
  { id:'s15', name:'Ding Junhui',      zh:'丁俊晖',        nation:'CHN', flag:FLAGS.CHN, rank:15, points:464850,  change:0,  turnedPro:2003, highRank:1,  avatar:`${AVATAR_BASE}/ding.png` },
  { id:'s16', name:'Si Jiahui',        zh:'斯佳辉',        nation:'CHN', flag:FLAGS.CHN, rank:16, points:439400,  change:0,  turnedPro:2019, highRank:16, avatar:`${AVATAR_BASE}/si.png` },
  { id:'s17', name:'Jack Lisowski',    zh:'杰克·利索夫斯基',nation:'ENG',flag:FLAGS.ENG, rank:17, points:420000,  change:0,  turnedPro:2010, highRank:10, avatar:`${AVATAR_BASE}/lisowski.png` },
  { id:'s18', name:'Luca Brecel',      zh:'卢卡·布雷塞尔', nation:'BEL', flag:FLAGS.BEL, rank:18, points:395000,  change:-2, turnedPro:2011, highRank:2,  avatar:`${AVATAR_BASE}/brecel.png` },
  { id:'s19', name:'Ali Carter',       zh:'阿里·卡特',     nation:'ENG', flag:FLAGS.ENG, rank:19, points:380000,  change:0,  turnedPro:1996, highRank:2,  avatar:`${AVATAR_BASE}/carter.png` },
  { id:'s20', name:'Hossein Vafaei',   zh:'侯赛因·瓦菲',   nation:'IRI', flag:FLAGS.IRI, rank:20, points:360000,  change:3,  turnedPro:2012, highRank:16, avatar:`${AVATAR_BASE}/vafaei.png` },
];

// ======================================================================
// SNOOKER — MULTI-SEASON TOURNAMENTS
// ======================================================================
const S2024_25 = [
  { id:'wsc25', name:'斯诺克世界锦标赛', cat:'triple-crown', start:'2025-04-19', end:'2025-05-05', city:'谢菲尔德', country:'英格兰', venue:'Crucible Theatre', prize:'£2,395,000', status:'completed', champion:'Kyren Wilson' },
  { id:'uk24', name:'英锦赛', cat:'triple-crown', start:'2024-11-23', end:'2024-12-01', city:'约克', country:'英格兰', venue:'Barbican Centre', prize:'£1,205,000', status:'completed', champion:'Judd Trump' },
  { id:'masters25', name:'大师赛', cat:'triple-crown', start:'2025-01-12', end:'2025-01-19', city:'伦敦', country:'英格兰', venue:'Alexandra Palace', prize:'£1,015,000', status:'completed', champion:'Shaun Murphy' },
  { id:'saudi24', name:'沙特大师赛', cat:'ranking', start:'2024-08-30', end:'2024-09-07', city:'利雅得', country:'沙特', venue:'Green Halls', prize:'£2,302,000', status:'completed', champion:'Judd Trump' },
  { id:'wuhan24', name:'武汉公开赛', cat:'ranking', start:'2024-10-06', end:'2024-10-12', city:'武汉', country:'中国', venue:'武汉体育馆', prize:'£700,000', status:'completed', champion:'肖国栋' },
  { id:'intl24', name:'国际锦标赛', cat:'ranking', start:'2024-11-03', end:'2024-11-10', city:'南京', country:'中国', venue:'南京奥体中心', prize:'£825,000', status:'completed', champion:'张安达' },
  { id:'english24', name:'英格兰公开赛', cat:'ranking', start:'2024-09-12', end:'2024-09-22', city:'布伦特伍德', country:'英格兰', venue:'Brentwood Centre', prize:'£550,000', status:'completed', champion:'Mark Selby' },
  { id:'german25', name:'德国大师赛', cat:'ranking', start:'2025-01-27', end:'2025-02-02', city:'柏林', country:'德国', venue:'Tempodrom', prize:'£427,000', status:'completed', champion:'Judd Trump' },
];

const S2025_26 = [
  { id:'wsc26', name:'斯诺克世界锦标赛', cat:'triple-crown', start:'2026-04-18', end:'2026-05-04', city:'谢菲尔德', country:'英格兰', venue:'Crucible Theatre', prize:'£2,395,000', status:'completed', champion:'Judd Trump' },
  { id:'uk25', name:'英锦赛', cat:'triple-crown', start:'2025-11-29', end:'2025-12-07', city:'约克', country:'英格兰', venue:'Barbican Centre', prize:'£1,173,000', status:'completed', champion:'Judd Trump' },
  { id:'masters26', name:'大师赛', cat:'triple-crown', start:'2026-01-11', end:'2026-01-18', city:'伦敦', country:'英格兰', venue:'Alexandra Palace', prize:'£750,000', status:'completed', champion:'Shaun Murphy' },
  { id:'saudi25', name:'沙特大师赛', cat:'ranking', start:'2025-08-08', end:'2025-08-16', city:'吉达', country:'沙特', venue:'King Abdullah Sports City', prize:'£2,300,000', status:'completed', champion:'Judd Trump' },
  { id:'wuhan25', name:'武汉公开赛', cat:'ranking', start:'2025-08-24', end:'2025-08-30', city:'武汉', country:'中国', venue:'武汉体育馆', prize:'£700,000', status:'completed', champion:'肖国栋' },
  { id:'english25', name:'英格兰公开赛', cat:'ranking', start:'2025-09-11', end:'2025-09-21', city:'布伦特伍德', country:'英格兰', venue:'Brentwood Centre', prize:'£550,000', status:'completed', champion:'Judd Trump' },
  { id:'german26', name:'德国大师赛', cat:'ranking', start:'2026-01-26', end:'2026-02-01', city:'柏林', country:'德国', venue:'Tempodrom', prize:'£427,000', status:'completed', champion:'Judd Trump' },
  { id:'wgp26', name:'世界大奖赛', cat:'ranking', start:'2026-02-03', end:'2026-02-08', city:'香港', country:'中国', venue:'香港体育馆', prize:'£380,000', status:'completed', champion:'Neil Robertson' },
];

const S2026_27 = [
  { id:'shanghai26', name:'上海大师赛', cat:'invitational', start:'2026-07-28', end:'2026-08-03', city:'上海', country:'中国', venue:'上海体育馆', prize:'£825,000', status:'upcoming', champion:'Judd Trump' },
  { id:'saudi26', name:'沙特大师赛', cat:'ranking', start:'2026-08-08', end:'2026-08-16', city:'吉达', country:'沙特', venue:'King Abdullah Sports City', prize:'£2,300,000', status:'upcoming', champion:'Judd Trump' },
  { id:'wuhan26', name:'武汉公开赛', cat:'ranking', start:'2026-08-24', end:'2026-08-30', city:'武汉', country:'中国', venue:'武汉体育馆', prize:'£700,000', status:'upcoming', champion:'肖国栋' },
  { id:'english26', name:'英格兰公开赛', cat:'ranking', start:'2026-09-14', end:'2026-09-20', city:'布伦特伍德', country:'英格兰', venue:'Brentwood Centre', prize:'£550,000', status:'upcoming', champion:null },
  { id:'british26', name:'英国公开赛', cat:'ranking', start:'2026-09-22', end:'2026-09-28', city:'切尔滕纳姆', country:'英格兰', venue:'Cheltenham', prize:'£500,000', status:'upcoming', champion:null },
  { id:'xian26', name:'西安大奖赛', cat:'ranking', start:'2026-10-07', end:'2026-10-13', city:'西安', country:'中国', venue:'西安奥体中心', prize:'£800,000', status:'upcoming', champion:null },
  { id:'ni26', name:'北爱尔兰公开赛', cat:'ranking', start:'2026-10-19', end:'2026-10-26', city:'贝尔法斯特', country:'北爱尔兰', venue:'Waterfront Hall', prize:'£550,000', status:'upcoming', champion:null },
  { id:'intl26', name:'国际锦标赛', cat:'ranking', start:'2026-11-02', end:'2026-11-09', city:'天津', country:'中国', venue:'天津体育馆', prize:'£825,000', status:'upcoming', champion:null },
  { id:'uk26', name:'英锦赛', cat:'triple-crown', start:'2026-11-28', end:'2026-12-06', city:'约克', country:'英格兰', venue:'Barbican Centre', prize:'£1,200,000', status:'upcoming', champion:null },
  { id:'masters27', name:'大师赛', cat:'triple-crown', start:'2027-01-10', end:'2027-01-17', city:'伦敦', country:'英格兰', venue:'Alexandra Palace', prize:'£750,000', status:'upcoming', champion:null },
  { id:'german27', name:'德国大师赛', cat:'ranking', start:'2027-01-25', end:'2027-01-31', city:'柏林', country:'德国', venue:'Tempodrom', prize:'£450,000', status:'upcoming', champion:null },
  { id:'wsc27', name:'斯诺克世界锦标赛', cat:'triple-crown', start:'2027-04-17', end:'2027-05-03', city:'谢菲尔德', country:'英格兰', venue:'Crucible Theatre', prize:'£2,500,000', status:'upcoming', champion:null },
];

export const snookerSeasons = {
  '2024/25': S2024_25,
  '2025/26': S2025_26,
  '2026/27': S2026_27,
};

export const allSnookerTournaments = [...S2024_25, ...S2025_26, ...S2026_27];

// ---- Legacy compatibility ----
export const rankings = snookerPlayers; // alias
export const tournaments = S2025_26;    // default season

// ======================================================================
// CHINESE 8-BALL (中式八球) — 乔氏大师赛 2025
// ======================================================================
export const chinese8Players = [
  { id:'c1', name:'楚秉杰',   zh:'楚秉杰',   nation:'CHN', flag:FLAGS.CHN, rank:1, points:17538, change:0,  turnedPro:2012, highRank:1, avatar:null },
  { id:'c2', name:'唐春晓',   zh:'唐春晓',   nation:'CHN', flag:FLAGS.CHN, rank:2, points:16085, change:1,  turnedPro:2015, highRank:1, avatar:null },
  { id:'c3', name:'沈申义',   zh:'沈申义',   nation:'CHN', flag:FLAGS.CHN, rank:3, points:14620, change:-1, turnedPro:2018, highRank:2, avatar:null },
  { id:'c4', name:'孔德京',   zh:'孔德京',   nation:'CHN', flag:FLAGS.CHN, rank:4, points:13202, change:2,  turnedPro:2016, highRank:3, avatar:null },
  { id:'c5', name:'郑宇伯',   zh:'郑宇伯',   nation:'CHN', flag:FLAGS.CHN, rank:5, points:11648, change:-1, turnedPro:2010, highRank:1, avatar:null },
  { id:'c6', name:'赵汝亮',   zh:'赵汝亮',   nation:'CHN', flag:FLAGS.CHN, rank:6, points:11122, change:0,  turnedPro:2016, highRank:3, avatar:null },
  { id:'c7', name:'张鹏',     zh:'张鹏',     nation:'CHN', flag:FLAGS.CHN, rank:7, points:9914,  change:3,  turnedPro:2014, highRank:5, avatar:null },
  { id:'c8', name:'雷镒玮',   zh:'雷镒玮',   nation:'CHN', flag:FLAGS.CHN, rank:8, points:9234,  change:0,  turnedPro:2018, highRank:7, avatar:null },
  { id:'c9', name:'王云',     zh:'王云',     nation:'CHN', flag:FLAGS.CHN, rank:9, points:9000,  change:0,  turnedPro:2013, highRank:5, avatar:null },
  { id:'c10',name:'石汉青',   zh:'石汉青',   nation:'CHN', flag:FLAGS.CHN, rank:10,points:7573,  change:-2, turnedPro:2009, highRank:1, avatar:null },
  { id:'c11',name:'牛壮',     zh:'牛壮',     nation:'CHN', flag:FLAGS.CHN, rank:11,points:7400,  change:5,  turnedPro:2017, highRank:5, avatar:null },
  { id:'c12',name:'张泰艺',   zh:'张泰艺',   nation:'CHN', flag:FLAGS.CHN, rank:12,points:7100,  change:-1, turnedPro:2019, highRank:2, avatar:null },
  { id:'c13',name:'曹宇鹏',   zh:'曹宇鹏',   nation:'CHN', flag:FLAGS.CHN, rank:13,points:6890,  change:0,  turnedPro:2013, highRank:5, avatar:null },
  { id:'c14',name:'陈思明',   zh:'陈思明',   nation:'CHN', flag:FLAGS.CHN, rank:14,points:6500,  change:2,  turnedPro:2011, highRank:3, avatar:null },
  { id:'c15',name:'杨帆',     zh:'杨帆',     nation:'CHN', flag:FLAGS.CHN, rank:15,points:6300,  change:0,  turnedPro:2009, highRank:1, avatar:null },
  { id:'c16',name:'薄俊杰',   zh:'薄俊杰',   nation:'CHN', flag:FLAGS.CHN, rank:16,points:6100,  change:-3, turnedPro:2018, highRank:8, avatar:null },
];

export const chinese8Tournaments = [
  { id:'c-tj-a', name:'甲级分站赛（天津站）', cat:'major', start:'2025-03-17', end:'2025-03-29', city:'天津', country:'中国', venue:'天津体育馆', prize:'¥2,000,000', status:'completed', champion:'牛壮' },
  { id:'c-tj-s', name:'超级分站赛（天津站）', cat:'major', start:'2025-03-30', end:'2025-04-09', city:'天津', country:'中国', venue:'天津体育馆', prize:'¥4,000,000', status:'completed', champion:'唐春晓' },
  { id:'c-final-13', name:'第十三届全球总决赛', cat:'triple-crown', start:'2025-04-26', end:'2025-05-17', city:'成都', country:'中国', venue:'双流体育中心', prize:'¥10,000,000', status:'completed', champion:'牛壮' },
  { id:'c-bt-a', name:'甲级分站赛（包头站）', cat:'major', start:'2025-06-25', end:'2025-07-05', city:'包头', country:'中国', venue:'包头体育馆', prize:'¥2,000,000', status:'completed', champion:'王云' },
  { id:'c-bt-s', name:'超级分站赛（包头站）', cat:'major', start:'2025-07-06', end:'2025-07-16', city:'包头', country:'中国', venue:'包头体育馆', prize:'¥4,000,000', status:'completed', champion:'楚秉杰' },
  { id:'c-zj-a', name:'甲级分站赛（芷江站）', cat:'major', start:'2025-09-07', end:'2025-09-17', city:'芷江', country:'中国', venue:'芷江体育馆', prize:'¥2,000,000', status:'completed', champion:'赵剑波' },
  { id:'c-zj-s', name:'超级分站赛（芷江站）', cat:'major', start:'2025-09-18', end:'2025-09-27', city:'芷江', country:'中国', venue:'芷江体育馆', prize:'¥4,000,000', status:'completed', champion:'赵汝亮' },
  { id:'c-nn-a', name:'甲级分站赛（南宁站）', cat:'major', start:'2025-12-04', end:'2025-12-24', city:'南宁', country:'中国', venue:'南宁体育馆', prize:'¥2,000,000', status:'upcoming', champion:null },
  { id:'c-nn-s', name:'超级分站赛（南宁站）', cat:'major', start:'2025-12-25', end:'2026-01-04', city:'南宁', country:'中国', venue:'南宁体育馆', prize:'¥4,000,000', status:'upcoming', champion:null },
  { id:'c-final-14', name:'第十四届全球总决赛', cat:'triple-crown', start:'2026-03-13', end:'2026-04-02', city:'待定', country:'中国', venue:'待定', prize:'¥10,000,000', status:'upcoming', champion:null },
];

// ======================================================================
// 9-BALL (九球) — Matchroom WNT 2025
// ======================================================================
export const nineballPlayers = [
  { id:'n1', name:'Francisco Sanchez Ruiz', zh:'弗朗西斯科·桑切斯', nation:'ESP', flag:FLAGS.ESP, rank:1,  points:28500, change:0,  turnedPro:2015, highRank:1, avatar:null },
  { id:'n2', name:'Joshua Filler',          zh:'约书亚·菲勒',       nation:'GER', flag:FLAGS.GER, rank:2,  points:26100, change:0,  turnedPro:2016, highRank:1, avatar:null },
  { id:'n3', name:'Fedor Gorst',            zh:'菲多尔·戈斯特',     nation:'USA', flag:FLAGS.USA, rank:3,  points:24800, change:1,  turnedPro:2017, highRank:1, avatar:null },
  { id:'n4', name:'Jayson Shaw',            zh:'杰森·肖',           nation:'SCO', flag:FLAGS.SCO, rank:4,  points:22100, change:-1, turnedPro:2010, highRank:2, avatar:null },
  { id:'n5', name:'Albin Ouschan',          zh:'阿尔宾·欧斯纯',     nation:'AUT', flag:FLAGS.AUT, rank:5,  points:19500, change:2,  turnedPro:2008, highRank:1, avatar:null },
  { id:'n6', name:'Ko Ping Chung',          zh:'柯秉中',            nation:'TPE', flag:FLAGS.TPE, rank:6,  points:18200, change:0,  turnedPro:2014, highRank:3, avatar:null },
  { id:'n7', name:'Shane Van Boening',      zh:'肖恩·范伯宁',       nation:'USA', flag:FLAGS.USA, rank:7,  points:16800, change:-2, turnedPro:2005, highRank:1, avatar:null },
  { id:'n8', name:'Carlo Biado',            zh:'卡洛·比亚多',       nation:'PHI', flag:FLAGS.PHI, rank:8,  points:15100, change:3,  turnedPro:2009, highRank:1, avatar:null },
  { id:'n9', name:'Eklent Kaçi',            zh:'艾克伦特·卡奇',     nation:'ALB', flag:'🇦🇱',             rank:9,  points:14800, change:0,  turnedPro:2018, highRank:5, avatar:null },
  { id:'n10',name:'David Alcaide',          zh:'大卫·阿尔凯德',     nation:'ESP', flag:FLAGS.ESP, rank:10, points:13200, change:-2,  turnedPro:2006, highRank:3, avatar:null },
  { id:'n11',name:'Ko Pin Yi',              zh:'柯秉逸',            nation:'TPE', flag:FLAGS.TPE, rank:11, points:12500, change:4,   turnedPro:2007, highRank:1, avatar:null },
  { id:'n12',name:'Wiktor Zielinski',       zh:'维克托·泽林斯基',   nation:'POL', flag:FLAGS.POL, rank:12, points:11800, change:-1,  turnedPro:2019, highRank:8, avatar:null },
];

export const nineballTournaments = [
  { id:'n-wpc25', name:'世界九球锦标赛', cat:'triple-crown', start:'2025-07-21', end:'2025-07-26', city:'吉达', country:'沙特', venue:'King Abdullah Sports City', prize:'$250,000', status:'completed', champion:'Joshua Filler' },
  { id:'n-usopen25', name:'美国公开赛', cat:'major', start:'2025-08-18', end:'2025-08-23', city:'大西洋城', country:'美国', venue:'Harrah\'s Resort', prize:'$500,000', status:'completed', champion:'Fedor Gorst' },
  { id:'n-hanoi25', name:'河内公开赛', cat:'major', start:'2025-10-07', end:'2025-10-12', city:'河内', country:'越南', venue:'My Dinh Indoor Stadium', prize:'$200,000', status:'completed', champion:'Ko Pin Yi' },
  { id:'n-florida25', name:'佛罗里达公开赛', cat:'ranking', start:'2025-08-05', end:'2025-08-10', city:'奥兰多', country:'美国', venue:'Caribe Royale', prize:'$200,000', status:'completed', champion:'Jayson Shaw' },
  { id:'n-hanoi26', name:'河内公开赛', cat:'major', start:'2026-10-06', end:'2026-10-11', city:'河内', country:'越南', venue:'My Dinh Indoor Stadium', prize:'$200,000', status:'upcoming', champion:null },
];

// ======================================================================
// NEWS — Expanded Chinese + International Sources
// ======================================================================
export const MOCK_NEWS_POOL = [
  // WST / International
  { id:'n1',  title:'赵心童创造历史——成为首位打进世锦赛决赛的中国球员', summary:'赵心童在半决赛中以17-12击败尼尔·罗伯逊，轰出5杆破百，成为斯诺克历史上第一位进入世界锦标赛决赛的中国球员。', cat:'赛事', src:'WST 官方', time:'2026-05-02' },
  { id:'n2',  title:'特鲁姆普赢得第四个世锦赛冠军，追平希金斯', summary:'特鲁姆普在决赛中以18-15战胜赵心童，获得个人职业生涯第四个世界冠军头衔，成为第三位四冠王。', cat:'赛事', src:'BBC Sport', time:'2026-05-04' },
  { id:'n3',  title:'2026/27赛季赛程公布——中国赛事增至6站创历史新高', summary:'WST公布新赛季完整赛程，上海大师赛于7月28日拉开大幕。中国将举办上海、武汉、西安、天津、香港、北京共6站排名赛。', cat:'排名', src:'WST 官方', time:'2026-06-09' },
  { id:'n4',  title:'世界排名更新：特鲁姆普稳居第一，赵心童冲入前三', summary:'世锦赛后最新世界排名中，特鲁姆普以超过165万英镑继续榜首，赵心童首次进入前三，中国4人进入前16。', cat:'排名', src:'WST 官方', time:'2026-05-07' },
  { id:'n5',  title:'奥沙利文计划复出：瞄准第八个世界冠军', summary:'罗尼·奥沙利文确认将在新赛季恢复参赛，目标直指第八个世锦赛冠军。上赛季因医疗原因缺席多项赛事，排名跌至第14位。', cat:'球员', src:'BBC Sport', time:'2026-07-15' },
  { id:'n6',  title:'吴宜泽德国大师赛轰147满分——赛季第三杆满分', summary:'中国小将吴宜泽在德国大师赛资格赛中轰出职业生涯首杆147满分，也是2025/26赛季的第三杆147满分。', cat:'赛事', src:'SnookerHQ', time:'2026-01-28' },
  { id:'n7',  title:'丁俊晖确认参加上海大师赛——中国德比即将上演', summary:'丁俊晖确认将以外卡身份参加2026上海大师赛，有望在八强赛与新科世界亚军赵心童上演中国德比。', cat:'球员', src:'台球HQ', time:'2026-07-20' },
  { id:'n8',  title:'斯诺克在中国：年轻一代崛起，市场持续增长', summary:'随着赵心童、吴宜泽、斯佳辉等年轻选手崛起，中国已成为仅次于英国的第二大斯诺克市场，赞助商和转播收入持续攀升。', cat:'排名', src:'台球HQ', time:'2026-06-15' },

  // Chinese sources (新增)
  { id:'n9',  title:'乔氏大师赛南宁站：孔德京19-8大胜陈思明夺冠', summary:'2025乔氏中式八球大师赛甲级分站赛南宁站，孔德京以19-8的悬殊比分战胜陈思明，夺得60万元冠军奖金。', cat:'赛事', src:'新浪体育', time:'2025-12-24' },
  { id:'n10', title:'赵心童：从禁赛到世界亚军，中国斯诺克的涅槃重生', summary:'在经历了禁赛风波后，赵心童以惊人速度重返巅峰。世锦赛亚军的成绩是中国斯诺克的一个里程碑，也为年轻一代树立了榜样。', cat:'球员', src:'体坛周报', time:'2026-05-10' },
  { id:'n11', title:'WST与中国台协签署五年合作协议', summary:'世界斯诺克巡回赛与中国台球协会正式签署五年合作协议，未来五年将在中国举办至少30站排名赛，推动斯诺克在中国的全面发展。', cat:'排名', src:'新华体育', time:'2026-06-20' },
  { id:'n12', title:'中八转动！2025赛季乔氏大师赛国内赛事盘点', summary:'2025赛季乔氏中式八球大师赛全年共设4站甲级赛、4站超级赛和1站全球总决赛，总奖金突破3500万元，楚秉杰以17538分领跑超级积分榜。', cat:'赛事', src:'搜狐体育', time:'2025-12-28' },
  { id:'n13', title:'马克·威廉姆斯：将在2026/27赛季后评估退役', summary:'三届世锦赛冠军马克·威廉姆斯表示将在明年49岁生日后评估是否继续职业生涯，"75三杰"时代或将落幕。', cat:'球员', src:'BBC Sport', time:'2026-07-10' },
  { id:'n14', title:'九球世界锦标赛：菲勒击败范伯宁夺冠', summary:'德国名将约书亚·菲勒在吉达举行的2025世界九球锦标赛中11-8击败肖恩·范伯宁，赢得25万美元最高奖金。', cat:'赛事', src:'Matchroom Pool', time:'2025-07-27' },
  { id:'n15', title:'柯氏兄弟闪耀九球亚洲赛季：柯秉逸河内公开赛夺冠', summary:'中华台北选手柯秉逸在河内公开赛决赛中击败西班牙选手桑切斯，赢得20万美元冠军奖金，亚洲九球实力持续上升。', cat:'赛事', src:'自由时报', time:'2025-10-13' },
];

// Helper: format date
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth()+1}月${d.getDate()}日`;
}
export function getDaysUntil(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target - now) / (1000*60*60*24));
}
export function formatPrize(points) {
  if (points >= 1000000) return `£${(points/1000000).toFixed(1)}M`;
  if (points >= 1000) return `£${(points/1000).toFixed(0)}K`;
  return `£${points}`;
}
export function formatPrizeCN(points) {
  if (points >= 10000000) return `¥${(points/10000000).toFixed(0)}千万`;
  if (points >= 10000) return `¥${(points/10000).toFixed(1)}万`;
  return `¥${points}`;
}
export function formatPrizeUSD(points) {
  if (points >= 1000000) return `$${(points/1000000).toFixed(1)}M`;
  if (points >= 1000) return `$${(points/1000).toFixed(0)}K`;
  return `$${points}`;
}
