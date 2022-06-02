;
(function($, window, document, undefined) {
    "use strict";
    var pluginName = 'image';

    function Image(element, options) {
        this.element = element;
        this._name = pluginName;

        this.init();
    }

    $.extend(Image.prototype, {

        // Initialization logic
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

        // Bind events that trigger methods
        bindEvents: function() {
            var plugin = this;
            let $img = this.$element.find("img");
            $img.on("load", function() {
                plugin.someOtherFunction.call(plugin);
              }).each(function() {
                if(this.complete) {
                    $(this).load(plugin.someOtherFunction.call(plugin));
                }
              });
        },

        // Unbind events that trigger methods
        unbindEvents: function() {
            this.$element.off('.' + this._name);
        },

        // Create custom methods
        someOtherFunction: function() {
            var justify = {
                "rtl": {
                    "center": "center",
                    "left": "flex-end",
                    "right": "flex-start",
                },
                "ltr": {
                    "center": "center",
                    "left": "flex-start",
                    "right": "flex-end",
                }
            }
            var direction = "ltr";
            this.$element.find(".text-container").css("justify-content", justify[direction][this.$element.css("text-align")]);
            if(this.$element.find(".text-container").find("div").length>0)
                this.$element.find(".text-container").find("div").css("justify-content", justify[direction][this.$element.css("text-align")]);
            this.$element.find(".text-container").find('p').css("max-width", this.$element.find("img").width());
        },

    });

    $.fn.image = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Image(this, options));
            }
        });
        return this;
    };


})(jQuery, window, document);
