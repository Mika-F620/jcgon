/** @format */
`use strict`;

// ハンバーガーメニュー開閉処理
const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');

ham.addEventListener('click', () => {
  ham.classList.toggle('active');
  nav.classList.toggle('active');
});

// ヘッダー内リンク（ハンバーガー内）のページ内リンク対応
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const ham = document.querySelector('#js-hamburger');
  const nav = document.querySelector('#js-nav');

  const getHeaderHeight = () => {
    if (!header) return 0;
    return Math.ceil(header.getBoundingClientRect().height);
  };

  const closeHamburger = () => {
    if (ham) ham.classList.remove('active');
    if (nav) nav.classList.remove('active');
  };

  const smoothScrollToHash = (hash) => {
    const target = document.querySelector(hash);
    if (!target) return;

    const offset = getHeaderHeight() + 8;
    const y = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // ヘッダー内のリンクをクリックしたとき
  document.querySelectorAll('.header__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      const url = new URL(link.href, window.location.href);
      const hash = url.hash; // "#news" など
      if (!hash) return;

      // 先に閉じる
      closeHamburger();

      // 同じページならJSでオフセットスクロール
      if (url.pathname === window.location.pathname) {
        e.preventDefault();
        history.pushState(null, '', hash);
        smoothScrollToHash(hash);
      }
      // 別ページ（トップ以外）→ デフォルト遷移に任せる（トップでhash処理）
    });
  });

  // hash付きでページが開かれたとき（/ #news など）にヘッダー分ずらす
  if (window.location.hash) {
    const hash = window.location.hash;

    // ブラウザのデフォルトジャンプだとヘッダーに隠れるので補正
    // 一旦上に戻してから補正スクロールすると安定します
    window.scrollTo(0, 0);
    setTimeout(() => smoothScrollToHash(hash), 50);
  }
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

// ページ内リンク
document.addEventListener("DOMContentLoaded", () => {
  const links = Array.from(document.querySelectorAll(".topLink__link"));

  // href="#..." から対象セクションを取得
  const targets = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const header = document.querySelector("header");

  // ヘッダー高さ（固定/可変の両方に対応）
  const getHeaderHeight = () => {
    if (!header) return 0;
    const rect = header.getBoundingClientRect();
    return Math.ceil(rect.height);
  };

  const setActiveById = (id) => {
    links.forEach((l) => l.classList.remove("is-active"));
    const active = links.find((l) => l.getAttribute("href") === `#${id}`);
    if (active) active.classList.add("is-active");
  };

  // クリックでスムーススクロール＋即アクティブ反映
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();

      // クリックした瞬間に丸を付ける（Observer反映待ちを防ぐ）
      setActiveById(target.id);

      // ヘッダー分＋少し余裕（4〜8px程度）
      const offset = getHeaderHeight() + 8;

      const y =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: y, behavior: "smooth" });

      // URLのハッシュも更新（戻るボタン等に効く）
      history.pushState(null, "", hash);
    });
  });

  // スクロール中の現在地判定（ヘッダー分考慮）
  let observer = null;

  const setupObserver = () => {
    if (observer) observer.disconnect();

    const headerH = getHeaderHeight();

    observer = new IntersectionObserver(
      (entries) => {
        // 同時に複数 isIntersecting になり得るので、
        // 画面上部に近いものを優先
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveById(visible[0].target.id);
        }
      },
      {
        // 上：ヘッダー分を除外 / 下：次のセクションに切り替わりやすくする
        rootMargin: `-${headerH + 8}px 0px -70% 0px`,
        threshold: 0,
      }
    );

    targets.forEach((t) => observer.observe(t));
  };

  // 初期化
  setupObserver();

  // リサイズでヘッダー高さが変わる場合に再設定
  window.addEventListener("resize", () => {
    setupObserver();
  });

  // 初期表示が #hash で来た場合もアクティブ化
  if (location.hash) {
    const first = document.querySelector(location.hash);
    if (first && first.id) setActiveById(first.id);
  } else if (targets[0]) {
    setActiveById(targets[0].id);
  }
});
