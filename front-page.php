<?php get_header(); ?>

<main class="main">

  <div class="main__contents wrapper">

    <?php get_template_part('component/front-page/link'); ?>

    <div class="main__details">

      <?php get_template_part('component/front-page/news'); ?>

      <?php get_template_part('component/front-page/account'); ?>

      <?php get_template_part('component/front-page/project'); ?>

      <?php get_template_part('component/front-page/others'); ?>

      <?php get_template_part('component/front-page/others-bottom'); ?>

    </div>
    
  </div>

</main>

<?php get_footer(); ?>

<?php get_template_part('component/common/faq'); ?>