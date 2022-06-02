(function($, window, document, undefined) {

    "use strict";

    let pluginName = "beautiful8";

    function beautiful8(element, options) {
        this.element = element;
        this._name = pluginName;
        this.init();
    }

    function isComponentVisible(element) {
        let viewportTop = $(window).scrollTop()
        let viewportBottom = $(window).scrollTop() + $(window).height()
        let componentTopPos = $(element).position().top
        let componentBottomPos = $(element).position().top + $(element).height()
        return ((componentTopPos <= viewportBottom) && (componentBottomPos >= viewportTop))
    }

    $.extend(beautiful8.prototype, {
        init: function() {
            this.buildCache();
            this.bindEvents();
        },

        // Remove plugin instance completely
        destroy: function() {
            this.unbindEvents();
            this.$element.removeData();
        },

        // Cache DOM nodes for performance
        buildCache: function() {
            this.$element = $(this.element);
        },

        // Bind events that trigg
        bindEvents: function() {
            let plugin = this;

            if (document.forms.length != 0) {
                plugin.scrollToForm.call(plugin);
            }
            plugin.parallax.call(plugin);
        },

        scrollToForm: function() {
            this.$element.find('.button').on("click", function(event) {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $('#form').offset().top - 100
                }, 1000);
            })
        },

        parallax: function () {
            if (this.element.classList.contains('parallax-unfixed')) {
                let scrollFactor = 1;
                let lastScrollTop = 0;
                let scrollY = 0;
                $(window).on('scroll', () => {
                    if (isComponentVisible(this.element)) {
                        let st = $(window).scrollTop();
                        if (st > lastScrollTop) {
                            scrollY += scrollFactor;
                        } else {
                            scrollY -= scrollFactor;
                        }
                        $(this.$element).css('background-position', `center ${scrollY}%`)
                        lastScrollTop = st;
                    }
                })
            }
        }
    });

    $.fn.beautiful8 = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new beautiful8(this, options));
            }
        });
    };

})(jQuery, window, document)