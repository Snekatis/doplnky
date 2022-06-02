!(function($, document, window) {
    var pluginName = 'weatherData',
        defaults = {};

    function WeatherData(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.actualDate = new Date();
        this.timer = $(".bottom_timer");

        this.initClock = this.initClock.bind(this);

        this.init();
    }
    $.extend(WeatherData.prototype, {
        init: function() {
            this.setDates();
            this.initClock();
        },
        buildCache: function () {
            this.$element = $(this.element);
        },
        formatDate: function(date_) {
            var day = date_.getDate();
            var month = date_.getMonth()+1;
            var year = date_.getFullYear();

            if(day < 10) day = `0${day}`;

            if(month < 10) month = `0${month}`;

            return `${day}.${month}.${year}`;
        },
        setDates: function() {
            var todayDate = $(".time_today"),
                tomorrowDate = $(".time_tomorrow"),
                afterTomorrowDate = $(".time_after_tomorrow");

            todayDate.text(this.formatDate(this.actualDate));
            tomorrowDate.text(this.formatDate(this.addDays(this.actualDate, 1)));
            afterTomorrowDate.text(this.formatDate(this.addDays(this.actualDate, 2)));
        },
        addDays: function(date, days) {
            var copy = new Date(Number(date));
            copy.setDate(date.getDate() + days);

            return copy;
        },
        initClock: function() {
            var actualDate = new Date();
            var h = actualDate.getHours();
            var m = actualDate.getMinutes();

            if(h < 10) h = `0${h}`;

            if(m < 10) m = `0${m}`;

            this.timer.text(`${h}:${m}`);

            setTimeout(this.initClock, 10000);
        }
    });
    ($.fn.weatherData = function(options) {
        return this.each(function() {
            $.data(this, "plugin_" + pluginName) ||
                $.data(this, "plugin_" + pluginName, new WeatherData(this, options));
        });
    });

})(jQuery, document, window);