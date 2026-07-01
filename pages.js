// js/pages.js
// 页面级交互：渲染我的收藏并绑定一些交互（依赖 window.AppState、spotsData、app.js 中的一些函数）

(function () {
  function renderFavoritesList() {
    const container = document.getElementById('favorites-list');
    if (!container) return;

    const favs = (window.AppState && AppState.getFavorites && AppState.getFavorites()) || [];
    if (!favs || favs.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>暂无收藏，去景点页面收藏喜欢的景点吧！</p></div>';
      return;
    }

    container.innerHTML = favs
      .map((id) => {
        const spot = (window.spotsData && spotsData[id]) || null;
        if (!spot) return '';
        return `
        <div class="spot-card fav-card" data-id="${id}" style="position:relative;cursor:pointer;">
          <div class="card-image" style="background: linear-gradient(135deg, ${spot.color1} 0%, ${spot.color2} 100%);"></div>
          <div class="card-content">
            <h3>${spot.name}</h3>
            <p>${(spot.intro || '').slice(0, 70)}${(spot.intro || '').length > 70 ? '...' : ''}</p>
            <div class="card-meta">
              <span>⭐ ${spot.rating}</span>
              <span>📍 ${spot.location}</span>
            </div>
          </div>
          <button class="fav-remove-btn back-btn" data-id="${id}" style="position:absolute; right:10px; top:10px;">移除</button>
        </div>`;
      })
      .join('');
  }

  // 绑定收藏页内的点击（移除收藏 / 点击卡片进入详情）
  function bindFavoritesListEvents() {
    const container = document.getElementById('favorites-list');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.fav-remove-btn');
      if (removeBtn) {
        const id = Number(removeBtn.dataset.id);
        if (window.AppState && AppState.removeFavorite) {
          AppState.removeFavorite(id);
          if (typeof loadStateFromStorage === 'function') loadStateFromStorage();
          renderFavoritesList();
          if (typeof showToast === 'function') showToast('已移除收藏');
          if (typeof updateFavoriteButton === 'function') updateFavoriteButton(window.currentSpotId);
        }
        return;
      }

      const card = e.target.closest('.fav-card');
      if (card) {
        const id = Number(card.dataset.id);
        if (!isNaN(id) && typeof navigateToSpotDetail === 'function') {
          navigateToSpotDetail(id);
        }
      }
    });
  }

  // 绑定详情页收藏按钮（使用 AppState.toggleFavorite）
  function bindDetailFavorite() {
    document.addEventListener('click', (e) => {
      const el = e.target;
      if (!el) return;

      if (el.id === 'favorite-btn') {
        const id = window.currentSpotId;
        if (!id || !window.AppState) return;
        const nowFav = AppState.toggleFavorite(id);
        if (typeof loadStateFromStorage === 'function') loadStateFromStorage();
        if (typeof updateFavoriteButton === 'function') updateFavoriteButton(id);
        renderFavoritesList();
        if (typeof showToast === 'function') showToast(nowFav ? '已加入收藏' : '已取消收藏');
      }

      if (el.id === 'signup-btn') {
        const aid = window.currentActivityId;
        if (!aid || !window.AppState) return;
        const ok = AppState.signUpActivity(aid);
        if (ok) {
          if (typeof updateSignupButton === 'function') updateSignupButton(aid);
          if (typeof showToast === 'function') showToast('报名成功 🎉');
        } else {
          if (typeof showToast === 'function') showToast('您已报名该活动');
        }
      }
    });
  }

  // 页面初始化
  document.addEventListener('DOMContentLoaded', () => {
    // 确保状态初始化
    if (window.AppState && typeof AppState.loadInitialState === 'function') AppState.loadInitialState();

    // if app.js 提供了 loadStateFromStorage，调用它以更新统计数字
    if (typeof loadStateFromStorage === 'function') loadStateFromStorage();

    renderFavoritesList();
    bindFavoritesListEvents();
    bindDetailFavorite();
  });

  // 暴露一个可手动调用的渲染函数（调试用）
  window.RenderFavorites = renderFavoritesList;
})();
