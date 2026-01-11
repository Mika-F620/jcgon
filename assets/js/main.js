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

// FAQ
document.addEventListener("DOMContentLoaded", () => {
  const widget = document.getElementById("faqWidget");
  const toggle = document.getElementById("faqToggle");
  const listEl = document.getElementById("faqList");
  const backBtn = document.getElementById("faqBack");
  const resetBtn = document.getElementById("faqReset");
  const closeBtn = document.getElementById("faqClose");

  if (!widget || !toggle || !listEl || !backBtn || !resetBtn || !closeBtn) return;

  // ▼ 分岐データ（ここを増やす）
  // type: "menu" = 選択肢
  // type: "answer" = 回答
  const FLOW = {
    start: {
      type: "menu",
      options: [
        { label: "アカウントについて", next: "account" },
        { label: "アクセス権について", next: "project" },
        { label: "その他", next: "others" },
      ],
    },

    account: {
      type: "menu",
      options: [
        { label: "アカウントが停止された場合の停止解除の申請について", next: "account_application" },
        { label: "アカウントの登録情報を修正したい", next: "account_fix" },
        { label: "ユーザー名がわからない", next: "account_user" },
        { label: "アカウントを持っているか忘れた", next: "account_existence" },
        { label: "パスワードがわからない", next: "account_pw" },
        { label: "二段階認証ができない", next: "account_factor" },
        { label: "ログインできない", next: "account_login" },
        { label: "施設を異動したので必要な手続きを知りたい。", next: "account_procedure" },
      ],
    },

    account_application: {
      type: "answer",
      title: "アカウントが停止された場合の停止解除の申請について",
      answer: `
        以下URLより停止解除依頼をご申請ください。<br>
        <a href="https://redcap.link/account_change_request" target="_blank" rel="noopener">
          https://redcap.link/account_change_request
        </a>
      `,
    },

    account_fix: {
      type: "answer",
      title: "アカウントの登録情報を修正したい",
      answer: [
        "以下URLよりJCCG-ON REDCapアカウント情報変更届をご申請ください。",
        `<a href="https://redcap.link/account_change_request" target="_blank" rel="noopener">
          https://redcap.link/account_change_request
        </a>`,
        "ただし、以下の変更はお受けできません。",
        "・ユーザー名の変更",
        "・特別なご理由以外での施設アドレスからGmailアドレス等への変更",
      ],
    },

    account_user: {
      type: "answer",
      title: "ユーザー名がわからない",
      answer: `
        以下URLよりお問合せください。<br>
        <a href="https://redcap.link/account_change_request" target="_blank" rel="noopener">
          https://redcap.link/account_change_request
        </a>
      `,
    },

    account_existence: {
      type: "answer",
      title: "アカウントを持っているか忘れた",
      answer: `
        以下URLよりお問合せください。<br>
        <a href="https://redcap.link/account_change_request" target="_blank" rel="noopener">
          https://redcap.link/account_change_request
        </a>
      `,
    },

    account_pw: {
      type: "answer",
      title: "パスワードがわからない",
      answer: [
        "ログイン画面の「パスワードを忘れたらここをクリック」より、パスワードリセットが可能です。",
        "JCCG-ON REDCapアカウントのユーザー名が必要になります。",
        "パスワードリセットメールを受信できない場合は、迷惑メールフォルダーをご確認ください。",
        "メールの受信を確認できない場合は、以下URLよりお問合せください。",
        {
          type: "link",
          url: "https://redcap.link/account_change_request",
          label: "お問い合わせフォームはこちら",
        },
      ],
    },

    account_factor: {
      type: "answer",
      title: "二段階認証ができない",
      answer: [
        "リターンコードの有効期限は2分となります。受信後2分以内にご入力をお願いいたします。",
        "リターンコードを受信しない場合は、迷惑メールフォルダーをご確認ください。",
        "複数回発行しても、2分以内に届かない場合は以下のURLよりお問合せください。",
        {
          type: "link",
          url: "https://redcap.link/account_change_request",
          label: "お問い合わせフォームはこちら",
        },
      ],
    },

    account_login: {
      type: "answer",
      title: "ログインできない",
      answer: [
        "キャッシュのクリアをお試しください。それでも問題が解決しない場合は、以下URLより再度ログインをお願いいたします。",
        {
          type: "link",
          url: "https://redcap.jccg-on.org/",
          label: "REDCap ログインページはこちら",
        },
        "上記ご対応いただきましても解決しない場合、以下のURLよりお問合せください。",
        {
          type: "link",
          url: "https://redcap.link/account_change_request",
          label: "お問い合わせフォームはこちら",
        },
      ],
    },

    account_procedure: {
      type: "answer",
      title: "施設を異動したので必要な手続きを知りたい。",
      answer: [
        "以下URLよりJCCG-ON REDCapアカウント情報変更届をご申請ください。",
        {
          type: "link",
          url: "https://redcap.link/account_change_request",
          label: "JCCG-ON REDCapアカウント情報変更届はこちら",
        },
      ],
    },

    project: {
      type: "menu",
      options: [
        { label: "プロジェクトへのユーザー追加について", next: "project_add" },
        { label: "プロジェクトへのユーザー削除について", next: "project_delete" },
        { label: "アクセス権申請で、CRCなど研究責任医師、研究分担医師以外の場合も申請可能でしょうか。", next: "project_others" },
      ],
    },

    project_add: {
      type: "answer",
      title: "プロジェクトへのユーザー追加について",
      answer: [
        '変更届「<a href="https://redcap.link/change_request_form" target="_blank" rel="noopener">https://redcap.link/change_request_form</a>」より申請してください。なお、研究分担医師リスト等の変更手続きには各研究事務局へお問い合わせください。'
      ],
    },

    project_delete: {
      type: "answer",
      title: "プロジェクトへのユーザー削除について",
      answer: [
        '変更届「<a href="https://redcap.link/change_request_form" target="_blank" rel="noopener">https://redcap.link/change_request_form</a>」より申請してください。なお、研究分担医師リスト等の変更手続きには各研究事務局へお問い合わせください。'
      ],
    },

    project_others: {
      type: "answer",
      title: "アクセス権申請で、CRCなど研究責任医師、研究分担医師以外の場合も申請可能でしょうか。",
      answer: [
        "ロール「その他」にてご申請可能です。",
        "研究分担医師リストの掲載対象外のユーザーをご登録いただく際は、貴施設の責任において、アクセス権付与の適否をご確認ください。",
        "そのうえで、貴施設の方針に従ってご登録をお願いいたします。",
      ],
    },

    others: {
      type: "menu",
      options: [
        { label: "研究のプロジェクトが表示されない（開けない）。", next: "others_no" },
        { label: "データ入力後、フォームを保存しないまま時間が経過してしまい、入力内容が消えてしまった。データをもとに戻したい。", next: "others_return" },
        { label: "繰り返しフォームに間違ってデータ入力をしてしまった。フォーム全体を削除してほしい。", next: "others_delete" },
        { label: "データ修正したいがフォームがロックされている。", next: "others_lock" },
        { label: "研究期間中に転院したが、どうすればよいか。", next: "others_transfer" },
        { label: "連絡をしたが、返事が来ない。", next: "others_reply" },
      ],
    },

    others_no: {
      type: "answer",
      title: "研究のプロジェクトが表示されない（開けない）。",
      answer: [
        "JCCG成育データセンター（nchdc@ncchd.go.jp）へお問合せください。",
      ],
    },

    others_return: {
      type: "answer",
      title: "データ入力後、フォームを保存しないまま時間が経過してしまい、入力内容が消えてしまった。データをもとに戻したい。",
      answer: [
        "セキュリティ上、60分間保存やページの移動等がない場合、自動的にログアウトします。",
        "ログアウトする前に「保存」をしていなかった入力データは破棄されますのでご注意ください。",
      ],
    },

    others_delete: {
      type: "answer",
      title: "繰り返しフォームに間違ってデータ入力をしてしまった。フォーム全体を削除してほしい。",
      answer: [
        "JCCG成育データセンター（nchdc@ncchd.go.jp）へお問合せください。",
      ],
    },

    others_lock: {
      type: "answer",
      title: "データ修正したいがフォームがロックされている。",
      answer: [
        "JCCG成育データセンター（nchdc@ncchd.go.jp）へお問合せください。",
      ],
    },

    others_transfer: {
      type: "answer",
      title: "研究期間中に転院したが、どうすればよいか。",
      answer: [
        "該当研究のプロジェクトに「転院届」が設定されている場合はご入力ください。",
        "「転院届」がない場合は、JCCG成育データセンター（nchdc@ncchd.go.jp）へお問合せください。",
      ],
    },

    others_reply: {
      type: "answer",
      title: "連絡をしたが、返事が来ない。",
      answer: [
        "1週間経過してもInvitationメールが届かない場合は、JCCG成育データセンター（nchdc@ncchd.go.jp）へお問合せください。",
        "もしくは、迷惑メールとしてごみ箱トレイに振り分けられている可能性もございますので、ご確認ください。",
      ],
    },
  };

  // 履歴（戻る用）
  const historyStack = [];

  const titleEl = toggle.querySelector(".faqWidget__title");

  const setOpen = (open) => {
    widget.classList.toggle("is-open", open);
    widget.setAttribute("aria-expanded", open ? "true" : "false");

    if (titleEl) {
      titleEl.textContent = open ? "よくあるご質問" : "ご質問はこちら";
    }
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!widget.classList.contains("is-open"));
  });

  // ★FAQウィジェット内のクリックは外側判定に伝播させない
  widget.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const render = (nodeKey) => {
    const node = FLOW[nodeKey];
    if (!node) return;

    backBtn.hidden = historyStack.length === 0;
    listEl.innerHTML = "";

    if (node.type === "menu") {
      node.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "faqWidget__item";
        btn.textContent = opt.label;

        btn.addEventListener("click", () => {
          historyStack.push(nodeKey);
          render(opt.next);
        });

        listEl.appendChild(btn);
      });
    }

    // ✅ ここだけ改善（テキスト・順番は変更しない）
    if (node.type === "answer") {
      const box = document.createElement("div");
      box.className = "faqWidget__answer";

      const answerHtml = Array.isArray(node.answer)
        ? node.answer
            .map((item) => {
              // 文字列はそのまま（HTML含めOK）
              if (typeof item === "string") return item;

              // linkオブジェクトは label をそのまま表示してリンク化（文言は変えない）
              if (item && item.type === "link") {
                return `<a href="${item.url}" target="_blank" rel="noopener">${item.label}</a>`;
              }

              // 想定外は空（[object Object] を出さない）
              return "";
            })
            .join("<br>")
        : (node.answer || "");

      box.innerHTML = `<strong>${node.title || ""}</strong><br>${answerHtml}`;
      listEl.appendChild(box);
    }
  };

  backBtn.addEventListener("click", () => {
    const prev = historyStack.pop();
    render(prev || "start");
  });

  resetBtn.addEventListener("click", () => {
    historyStack.length = 0;
    render("start");
  });

  closeBtn.addEventListener("click", () => {
    setOpen(false);

    // 閉じたら中身も初期状態に戻したい場合（おすすめ）
    historyStack.length = 0;
    render("start");
  });

  document.addEventListener("click", (e) => {
    // 開いてないなら何もしない
    if (!widget.classList.contains("is-open")) return;

    // faqWidget の中をクリックしたなら閉じない
    if (widget.contains(e.target)) return;

    // 外側をクリックした → 閉じる
    setOpen(false);

    // 閉じたら中身も初期化したい場合（今の挙動と合わせる）
    historyStack.length = 0;
    render("start");
  });

  // 初期表示
  render("start");
  setOpen(false); // 最初はヘッダーのみ
});
