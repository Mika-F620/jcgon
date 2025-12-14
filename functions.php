<?php

/**
 * cssやjsを読み込む
 * https://www.at-freak.jp/column/wordpress_css/
 * https://web-creates.com/code/wordpress-head-js-css/
*/
function enqueue_scripts()
{
    // 共通ファイルを読み込み
    wp_enqueue_style(
      'global', // globalという名前を設定
      get_template_directory_uri().'/assets/styles/global.css', // パス
      array(), // style.cssより先に読み込むCSSは無いので配列は空
    );

    // front-pageページのみ読み込むファイル
    if (((is_front_page() && is_home()) || (is_front_page() && ! is_home())) && ! is_paged()) {
      wp_enqueue_style(
        'front-page', // front-pageという名前を設定
        get_template_directory_uri().'/assets/styles/front-page.css', // パス
        array('global'), // global.cssより後に読み込む
      );
    }

    // 特定の固定ページのみ読み込むファイル。固定ページのスラッグを指定
    // 仮にworksというスラッグの固定ページのみ読み込む場合
    if (is_page('works')) {
      wp_enqueue_style(
        'works', // worksという名前を設定
        get_template_directory_uri().'/assets/styles/works.css', // パス
        array('global'), // global.cssより後に読み込む
      );
    }

    // 通常の投稿のシングルページにだけ適用したい処理
    if (is_single()) {
      wp_enqueue_style(
        'single', // singleという名前を設定
        get_template_directory_uri().'/assets/styles/single.css', // パス
        array('global'), // global.cssより後に読み込む
      );
    }

}
add_action('wp_enqueue_scripts', 'enqueue_scripts');


/**
 * アイキャッチ画像を使用可能にする
*/
add_theme_support('post-thumbnails');

