"use strict";

!(function($, window, document, undefined) {

  var pluginName = "testimonial_slider_new",
      defaults = {};

  function TestimonialSliderNew(element, options) {
    this.$element = $(element);
    this.settings = $.extend({}, defaults, options);
    //
    this.prevBtn = this.$element.find(".btn-prev");
    this.nextBtn = this.$element.find(".btn-next");
    this.slides = this.$element.find(".card");
    this.parent = this.$element.find(".testimonial_slider_box");
    //
    this.actualSlide = 0;
    //
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);

    this.init();
  }

  $.extend(TestimonialSliderNew.prototype, {
    init: function() {
      if ((this.parent.hasClass('d-slider') && $(window).width() > 768) || (this.parent.hasClass('m-slider') && $(window).width() < 769)) {
        this.switchSlide();
        this.bindEvents();
      }
    },
    switchSlide: function() {
      this.hideAllSlides();
      this.showActualSlide();
    },
    hideAllSlides: function() {
      this.slides.hide();
    },
    showActualSlide: function() {
      $(this.slides[this.actualSlide]).show();
    },
    bindEvents: function() {
      this.prevBtn.bind("click", this.prevSlide);
      this.nextBtn.bind("click", this.nextSlide);
    },
    prevSlide: function() {
      if(this.actualSlide === 0) this.actualSlide = this.slides.length - 1;
      else --this.actualSlide;

      this.switchSlide();
    },
    nextSlide: function() {
      if(this.actualSlide === this.slides.length - 1) this.actualSlide = 0;
      else ++this.actualSlide;

      this.switchSlide();
    }
  });

  $.fn.testimonialSliderNew = function(options) {
    return this.each(function() {
      $.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new TestimonialSliderNew(this, options));
    });
  }

})(jQuery, window, document);
