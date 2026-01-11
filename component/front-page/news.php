<section class="topNews" id="news">
  <h2 class="topNews__title">What’s New</h2>
  <dl class="topNews__details">
    <?php
      $args = array(
        'post_type' => 'post',
        'posts_per_page' => 5,
      );
      $the_query = new WP_Query($args);
    ?>
    <?php if ($the_query->have_posts()): ?>
      <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
        <a class="topNews__line" href="<?php the_permalink(); ?>">
          <dt class="topNews__detailsTitle"><?php echo get_the_date('Y.m.d'); ?></dt>
          <dd class="topNews__detailsContent"><?php the_title(); ?></dd>
        </a>
      <?php endwhile;?>
    <?php else : ?>
      <p class="topNews__none">お知らせはありません</p>
    <?php endif; wp_reset_postdata(); ?>
  </dl>
</section>