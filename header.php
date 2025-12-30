<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&family=Headland+One&family=Inika:wght@400;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Jost:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lora:ital,wght@0,400..700;1,400..700&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif+JP:wght@200..900&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Shippori+Mincho+B1&family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&family=Zen+Old+Mincho&display=swap" rel="stylesheet">
  <title>JCGON</title>
  <?php wp_head(); ?>
</head>
<body>
  <header class="header">
    <div class="header__contents">
      <div class="header__logo">
        <a class="header__logoLink" href="https://jccg.jp/" target="_blank" rel="noopener noreferrer">
          <img
            class="header__logoImg"
            src="<?php echo get_template_directory_uri(); ?>/assets/img/common/jccgon_logo.png"
            alt="JCCGON"
          >
        </a>
        <a class="header__logoLink" href="https://www.project-redcap.org/" target="_blank" rel="noopener noreferrer">
          <img
            class="header__logoImg"
            src="<?php echo get_template_directory_uri(); ?>/assets/img/common/jccgon-redcap_logo.png"
            alt="JCCGON-ON REDCap事務局"
          >
        </a>
      </div>
      <nav class="header__nav" id="js-nav">
        <ul class="header__menu">
          <li class="header__list">
            <a class="header__link" href="<?php echo esc_url(home_url('/')); ?>#news">
              What’s New
            </a>
          </li>
          <li class="header__list">
            <a class="header__link" href="<?php echo esc_url(home_url('/')); ?>#account">
              REDCapアカウント
            </a>
          </li>
          <li class="header__list">
            <a class="header__link" href="<?php echo esc_url(home_url('/')); ?>#project">
              REDCapプロジェクト
            </a>
          </li>
          <li class="header__list">
            <a class="header__link" href="<?php echo esc_url(home_url('/')); ?>#others">
              REDCapその他
            </a>
          </li>
          <li class="header__list">
            <a class="header__link" href="<?php echo esc_url(home_url('/')); ?>#observation">
              小児固形腫瘍観察研究
            </a>
          </li>
          <li class="header__list">
            <a class="header__link" href="<?php echo esc_url(home_url('/')); ?>#image">
              画像診断／コンサルテーション
            </a>
          </li>
        </ul>
      </nav>
      <div class="header__hamburgerBtn" id="js-hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </header>