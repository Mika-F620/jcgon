<section class="newsContents">
  <div class="wrapper newsContents__contents">
    <div class="newsContents__heading">
      <h2 class="newsContents__title"><?php the_title(); ?></h2>
      <p class="newsContents__date"><?php echo get_the_date('Y.m.d'); ?></p>
    </div>
    <div class="newsContents__text"><?php the_content(); ?></div>
  </div>
</section>