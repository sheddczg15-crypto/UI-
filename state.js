// js/state.js
// 全局状态管理（localStorage 封装）
// 将功能挂到 window.AppState 上，方便其他脚本调用

(function () {
  const LS_FAVORITES = 'sdh_favorites';
  const LS_STATS = 'sdh_stats';
  const LS_SIGNUPS = 'sdh_signups';

  function _read(key, def) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : def;
    } catch (e) {
      console.warn('LS read error', key, e);
      return def;
    }
  }

  function _write(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('LS write error', key, e);
    }
  }

  function getFavorites() {
    return _read(LS_FAVORITES, []);
  }

  function isFavorite(id) {
    const arr = getFavorites();
    return arr.includes(id);
  }

  function addFavorite(id) {
    const arr = getFavorites();
    if (!arr.includes(id)) {
      arr.push(id);
      _write(LS_FAVORITES, arr);
      incrementStat('favorites', 1);
    }
    return arr;
  }

  function removeFavorite(id) {
    let arr = getFavorites();
    const idx = arr.indexOf(id);
    if (idx > -1) {
      arr.splice(idx, 1);
      _write(LS_FAVORITES, arr);
      incrementStat('favorites', -1);
    }
    return arr;
  }

  function toggleFavorite(id) {
    return isFavorite(id) ? (removeFavorite(id), false) : (addFavorite(id), true);
  }

  function getStats() {
    return _read(LS_STATS, { visits: 0, favorites: 0, checkins: 0 });
  }

  function saveStats(obj) {
    _write(LS_STATS, obj);
  }

  function incrementStat(key, delta = 1) {
    const s = getStats();
    s[key] = (s[key] || 0) + delta;
    if (s[key] < 0) s[key] = 0;
    saveStats(s);
    return s;
  }

  function incrementVisit() {
    return incrementStat('visits', 1);
  }

  function incrementCheckin() {
    return incrementStat('checkins', 1);
  }

  function getSignups() {
    return _read(LS_SIGNUPS, []);
  }

  function signUpActivity(id) {
    const arr = getSignups();
    if (!arr.includes(id)) {
      arr.push(id);
      _write(LS_SIGNUPS, arr);
      return true;
    }
    return false;
  }

  function isSignedUp(id) {
    return getSignups().includes(id);
  }

  function loadInitialState() {
    if (!localStorage.getItem(LS_FAVORITES)) _write(LS_FAVORITES, []);
    if (!localStorage.getItem(LS_SIGNUPS)) _write(LS_SIGNUPS, []);
    if (!localStorage.getItem(LS_STATS)) _write(LS_STATS, { visits: 0, favorites: 0, checkins: 0 });
  }

  // 暴露到全局
  window.AppState = {
    // favorites
    getFavorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    // stats
    getStats,
    saveStats,
    incrementStat,
    incrementVisit,
    incrementCheckin,
    // signups
    getSignups,
    signUpActivity,
    isSignedUp,
    // 初始化
    loadInitialState
  };
})();
