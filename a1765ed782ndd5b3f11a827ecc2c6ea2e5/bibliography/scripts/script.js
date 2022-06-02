(function($, window, document, undefined) {

    "use strict";

    let pluginName = "bibliography";

    function bibliography(element, options) {
        this.element = element;
        this._name = pluginName;
        this.init();
    }

    $.extend(bibliography.prototype, {
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

            plugin.showBibliography.call(plugin);
        },

        showBibliography: function() {

            // console.log(Object.keys(bibligraphyJSON));

            // console.log(bibligraphyJSON);


            let headline = this.$element.find('.headline'),
                list = this.$element.find('.list')

            headline.on("click", function(event) {
                list.slideToggle();
            })
        },
    });

    $.fn.bibliography = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new bibliography(this, options));
            }
        });
    };

})(jQuery, window, document)