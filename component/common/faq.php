<!-- FAQウィジェット -->
<div class="faqWidget" id="faqWidget" aria-expanded="false">
  <button class="faqWidget__header" id="faqToggle" type="button">
    <img
      class="faqWidget__toggleIcon"
      src="<?php echo get_template_directory_uri(); ?>/assets/img/common/faq_icon.png"
      alt=""
    >
    <span class="faqWidget__title">質問回答集</span>
  </button>

  <div class="faqWidget__body" id="faqBody" role="dialog" aria-label="質問回答集">
    <div class="faqWidget__msg">
      <img
        class="faqWidget__msgImg"
        src="<?php echo get_template_directory_uri(); ?>/assets/img/common/faq-img.png"
        alt=""
      >
      <p class="faqWidget__msgText">ご覧になりたい質問を、下記よりお選びください。</p>
    </div>

    <div class="faqWidget__content">
      <!-- JSがここを差し替え -->
      <div class="faqWidget__list" id="faqList"></div>

      <div class="faqWidget__footer">
        <button class="faqWidget__back" id="faqBack" type="button" hidden>戻る</button>
        <button class="faqWidget__reset" id="faqReset" type="button">最初に戻る</button>
      </div>
    </div>
  </div>
</div>
