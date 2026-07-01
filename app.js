// js/app.js
// 核心交互与数据（用于本地演示，使用 localStorage 存储简单状态）

let currentBannerIndex = 0;
let bannerAutoPlayTimer = null;

// 示例数据（展示用）
const spotsData = {
  1: {
    name: '沙坡头景区',
    location: '中卫市',
    rating: '5/5',
    intro:
      '宁夏最著名的沙漠星空观测点，拥有无污染的星空资源。这里远离城市光污染，天空清晰度极高，是摄影爱好者和天文观测者的天堂。',
    starIndex: 90,
    color1: '#6C7BFF',
    color2: '#0E1B3A',
  },
  2: {
    name: '星海湖景区',
    location: '石嘴山市',
    rating: '4.8/5',
    intro:
      '银河倒影最佳拍摄地点，夜景摄影爱好者天堂。湖水宁静，星光倒映，形成绝美画面。',
    starIndex: 85,
    color1: '#F7C948',
    color2: '#6C7BFF',
  },
  3: {
    name: '贺兰山天文台',
    location: '银川市',
    rating: '5/5',
    intro:
      '专业级星空观测基地，配备天文望远镜设备，提供专业的天文讲解与实时观测体验。',
    starIndex: 95,
    color1: '#0E1B3A',
    color2: '#F7C948',
  },
  4: {
    name: '腾格里沙漠营地',
    location: '阿拉善左旗',
    rating: '4.9/5',
    intro:
      '荒漠星空露营首选，远离城市光污染。营地提供舒适的露营设施，可观赏完整的银河美景。',
    starIndex: 88,
    color1: '#2d1b4e',
    color2: '#F7C948',
  },
  5: {
    name: '西夏王陵星空观景台',
    location: '银川市',
    rating: '4.5/5',
    intro:
      '历史文化与星空的完美结合，位于西夏王陵遗址旁，是文化与天文爱好者都喜爱的地点。',
    starIndex: 80,
    color1: '#6C7BFF',
    color2: '#2d1b4e',
  },
};

const activitiesData = {
  1: {
    name: '夏日星空露营节',
    time: '7月15-17日',
    location: '腾格里沙漠营地',
    price: '¥688',
    intro:
      '三天两夜的专业星空露营体验，包含讲座、望远镜观测、摄影工作坊等。',
    color1: '#6C7BFF',
    color2: '#0E1B3A',
  },
  2: {
    name: '家庭观星营',
    time: '每周末',
    location: '沙坡头景区',
    price: '¥298',
    intro: '适合家庭的观星活动，包含亲子互动的天文体验。',
    color1: '#F7C948',
    color2: '#6C7BFF',
  },
  3: {
    name: '银河摄影工作坊',
    time: '8月1-3日',
    location: '星海湖景区',
    price: '¥1288',
    intro: '专业摄影师带队，包含实地拍摄与后期教学。',
    color1: '#0E1B3A',
    color2: '#F7C948',
  },
  4: {
    name: '星空延时摄影课程',
    time: '9月10-12日',
    location: '贺兰山天文台',
    price: '¥999',
    intro: '学习延时摄影与视频制作，提供实操与设备演示。',
    color1: '#2d1b4e',
    color2: '#F7C948',
  },
};

const guidesData = {
  1: {
    title: '1日星空之旅',
    duration: '1天',
    itinerary: [
      { time: '09:00', title: '上午', desc: '抵达景区，参观并准备' },
      { time: '14:00', title: '下午', desc: '沙漠探险与休息' },
      { time: '20:00', title: '晚上', desc: '专业讲解与观星' },
    ],
  },
  2: {
    title: '2日星空露营',
    duration: '2天',
    itinerary: [
      { time: '14:00', title: 'Day1', desc: '营地入驻' },
      { time: '20:00', title: '晚上', desc: '天文讲座与观测' },
      { time: '06:00', title: 'Day2', desc: '日出观赏' },
    ],
  },
  3: {
    title: '3日深度体验',
    duration: '3天',
    itinerary: [
      { time: '09:00', title: 'Day1', desc: '集合与第一站' },
      { time: '20:00', title: '晚上', desc: '专业观测' },
      { time: '09:00', title: 'Day2', desc: '工作坊与拍摄' },
      { time: '09:00', title: 'Day3', desc: '天文台参访' },
    ],
  },
};

// ---------- Banner 轮播 ----------
function startBannerAutoPlay() {
  stopBannerAutoPlay();
  bannerAutoPlayTimer = setInterval(() => {
    currentBannerIndex = (currentBannerIndex + 1) % 3;
    updateBannerPosition();
  }, 3000);
}
function stopBannerAutoPlay() {
  if (bannerAutoPlayTimer) {
    clearInterval(bannerAutoPlayTimer);
    bannerAutoPlayTimer = null;
  }
}
function updateBannerPosition() {
  const wrapper = document.querySelector('.banner-wrapper');
  if (!wrapper) return;
  wrapper.style.transform = `translateX(-${currentBannerIndex * 100}%)`;
  document.querySelectorAll('.dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentBannerIndex);
  });
}
function prevBanner() {
  currentBannerIndex = (currentBannerIndex - 1 + 3) % 3;
  updateBannerPosition();
  startBannerAutoPlay();
}
function nextBanner() {
  currentBannerIndex = (currentBannerIndex + 1) % 3;
  updateBannerPosition();
  startBannerAutoPlay();
}
function setCurrentBanner(i) {
  currentBannerIndex = i % 3;
  updateBannerPosition();
  startBannerAutoPlay();
}

// ---------- 页面导航 ----------
function navigateToPage(pageId) {
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
  const el = document.getElementById(pageId);
  if (el) el.classList.add('active');
  updateBottomNav(pageId);
  window.scrollTo(0, 0);
}
function updateBottomNav(pageId) {
  const map = {
    'home-page': 0,
    'spots-page': 1,
    'weather-page': 2,
    'guide-page': 3,
    'profile-page': 4,
  };
  document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
  const idx = map[pageId];
  if (typeof idx === 'number') {
    const items = document.querySelectorAll('.nav-item');
    if (items[idx]) items[idx].classList.add('active');
  }
}

// ---------- 详情页导航（景点/活动/攻略） ----------
function navigateToSpotDetail(id) {
  const spot = spotsData[id];
  if (!spot) return;
  recordVisit();
  document.getElementById('detail-name').textContent = spot.name;
  document.getElementById('detail-location').textContent = `📍 ${spot.location}`;
  document.getElementById('detail-rating').textContent = `⭐ ${spot.rating}`;
  document.getElementById('detail-intro').textContent = spot.intro;
  document.getElementById('detail-star-text').textContent = `观星指数: ${spot.starIndex}%`;
  const indexFill = document.getElementById('detail-star-index');
  if (indexFill) indexFill.style.width = spot.starIndex + '%';
  const hero = document.getElementById('detail-hero');
  if (hero) hero.style.background = `linear-gradient(135deg, ${spot.color1} 0%, ${spot.color2} 100%)`;
  window.currentSpotId = id;
  updateFavoriteButton(id);
  navigateToPage('spot-detail-page');
}
function navigateToActivityDetail(id) {
  const a = activitiesData[id];
  if (!a) return;
  document.getElementById('activity-detail-name').textContent = a.name;
  document.getElementById('activity-detail-time').textContent = `📅 ${a.time}`;
  document.getElementById('activity-detail-location').textContent = `📍 ${a.location}`;
  document.getElementById('activity-detail-price').textContent = a.price;
  document.getElementById('activity-detail-intro').textContent = a.intro;
  const hero = document.getElementById('activity-detail-hero');
  if (hero) hero.style.background = `linear-gradient(135deg, ${a.color1} 0%, ${a.color2} 100%)`;
  window.currentActivityId = id;
  updateSignupButton(id);
  navigateToPage('activity-detail-page');
}
function navigateToGuideDetail(id) {
  const g = guidesData[id];
  if (!g) return;
  document.getElementById('guide-detail-title').textContent = g.title;
  document.getElementById('guide-detail-duration').textContent = g.duration;
  const container = document.getElementById('guide-detail-itinerary');
  container.innerHTML = g.itinerary
    .map(
      (it) => `<div class="itinerary-item"><h4>⏰ ${it.time} - ${it.title}</h4><p>${it.desc}</p></div>`
    )
    .join('');
  navigateToPage('guide-detail-page');
}

// ---------- 简单提示 ----------
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

// ---------- 本地状态（localStorage） ----------
// keys
const LS_FAVORITES = 'sdh_favorites';
const LS_STATS = 'sdh_stats';
const LS_SIGNUPS = 'sdh_signups';

function loadStateFromStorage() {
  // stats: visit, favoriteCount, checkinCount
  const stats = JSON.parse(localStorage.getItem(LS_STATS) || '{}');
  document.getElementById('visit-count').textContent = stats.visits || 0;
  document.getElementById('favorite-count').textContent = stats.favorites || 0;
  document.getElementById('checkin-count').textContent = stats.checkins || 0;
  // ensure favorites set exists
  if (!localStorage.getItem(LS_FAVORITES)) localStorage.setItem(LS_FAVORITES, JSON.stringify([]));
  if (!localStorage.getItem(LS_SIGNUPS)) localStorage.setItem(LS_SIGNUPS, JSON.stringify([]));
}
function recordVisit() {
  const stats = JSON.parse(localStorage.getItem(LS_STATS) || '{}');
  stats.visits = (stats.visits || 0) + 1;
  localStorage.setItem(LS_STATS, JSON.stringify(stats));
  document.getElementById('visit-count').textContent = stats.visits;
}
function updateFavoriteButton(spotId) {
  const favBtn = document.getElementById('favorite-btn');
  const favs = JSON.parse(localStorage.getItem(LS_FAVORITES) || '[]');
  if (favs.includes(spotId)) {
    favBtn.classList.add('favorited');
    favBtn.textContent = '❤️ 已收藏';
  } else {
    favBtn.classList.remove('favorited');
    favBtn.textContent = '❤️ 收藏';
  }
}
function toggleFavorite() {
  const id = window.currentSpotId;
  if (!id) return;
  const favs = JSON.parse(localStorage.getItem(LS_FAVORITES) || '[]');
  const stats = JSON.parse(localStorage.getItem(LS_STATS) || '{}');
  const index = favs.indexOf(id);
  if (index === -1) {
    favs.push(id);
    stats.favorites = (stats.favorites || 0) + 1;
    showToast('已加入收藏');
  } else {
    favs.splice(index, 1);
    stats.favorites = Math.max(0, (stats.favorites || 1) - 1);
    showToast('已取消收藏');
  }
  localStorage.setItem(LS_FAVORITES, JSON.stringify(favs));
  localStorage.setItem(LS_STATS, JSON.stringify(stats));
  loadStateFromStorage();
  updateFavoriteButton(id);
}
function checkIn() {
  const stats = JSON.parse(localStorage.getItem(LS_STATS) || '{}');
  stats.checkins = (stats.checkins || 0) + 1;
  localStorage.setItem(LS_STATS, JSON.stringify(stats));
  document.getElementById('checkin-count').textContent = stats.checkins;
  showToast('打卡成功 📍');
}

// 活动报名（示例）
function updateSignupButton(activityId) {
  const signups = JSON.parse(localStorage.getItem(LS_SIGNUPS) || '[]');
  const btn = document.getElementById('signup-btn');
  if (signups.includes(activityId)) {
    btn.textContent = '已报名';
    btn.disabled = true;
  } else {
    btn.textContent = '📝 报名';
    btn.disabled = false;
  }
}
function signUp() {
  const id = window.currentActivityId;
  if (!id) return;
  const signups = JSON.parse(localStorage.getItem(LS_SIGNUPS) || '[]');
  if (!signups.includes(id)) {
    signups.push(id);
    localStorage.setItem(LS_SIGNUPS, JSON.stringify(signups));
    showToast('报名成功 🎉');
    updateSignupButton(id);
  }
}

// ---------- 初始化 ----------
document.addEventListener('DOMContentLoaded', () => {
  startBannerAutoPlay();
  updateBottomNav('home-page');
  loadStateFromStorage();

  // attach simple handlers (for elements possibly created later)
  document.querySelectorAll('.nav-item').forEach((el) => {
    el.addEventListener('click', () => {
      const idx = Array.from(document.querySelectorAll('.nav-item')).indexOf(el);
      const pageMap = ['home-page', 'spots-page', 'weather-page', 'guide-page', 'profile-page'];
      navigateToPage(pageMap[idx] || 'home-page');
    });
  });
});

// 暂停轮播在不可见时
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopBannerAutoPlay();
  else startBannerAutoPlay();
});

// ---------- 暴露给其他脚本使用（pages.js 等会用到） ----------
window.spotsData = spotsData;
window.activitiesData = activitiesData;
window.guidesData = guidesData;

// 暴露常用函数（按需暴露，保证 pages.js 可以调用）
window.loadStateFromStorage = loadStateFromStorage;
window.updateFavoriteButton = updateFavoriteButton;
window.updateSignupButton = updateSignupButton;
window.showToast = showToast;
window.navigateToSpotDetail = navigateToSpotDetail;
window.navigateToActivityDetail = navigateToActivityDetail;
window.navigateToGuideDetail = navigateToGuideDetail;
window.toggleFavorite = toggleFavorite;
window.checkIn = checkIn;

// optional debug log
if (typeof console !== 'undefined') {
  console.log('app.js loaded — data and helper functions exposed to window');
}
