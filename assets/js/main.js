/** @format */
`use script`;

// ハンバーガーメニュー開閉処理
const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');

ham.addEventListener('click', () => {
  ham.classList.toggle('active');
  nav.classList.toggle('active');
});

// ハンバーガーメニューが開く位置（top）
function setHeaderHeight() {
  const header = document.querySelector('.header');
  if (!header) return;

  const height = header.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--header-height', `${height}px`);
}

window.addEventListener('load', setHeaderHeight);
window.addEventListener('resize', setHeaderHeight);