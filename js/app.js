(function ($) {

  var Loader = function (options) {

    this.options = options;

  };

  Loader.prototype = {

    constructor: Loader,

    start: function () {

      this.createLightbox();
      this.bindEvents();
      this.updateProgress(this.options.start);
      this.beginAnimation();

    },

    createLightbox: function () {

      var $body = $('body');

      this.$tint = $('<div>').attr('id', 'loader_tint').appendTo($body);
      this.$container = $('<div>').attr('id', 'loader_container').appendTo($body);

      var $box = $('<div>').addClass('box').appendTo(this.$container);

      var $header = $('<div>').addClass('header').appendTo($box);
      var $headerText = $('<h1>').text('Progress').appendTo($header);
      this.$close = $('<a>').attr('href', '#').appendTo($header);
      var $closeImage = $('<img>').attr('src', 'images/close.png').appendTo(this.$close);
      var $clear = $('<div>').addClass('clear').appendTo($header);

      var $content = $('<div>').addClass('content').appendTo($box);
      var $barContainer = $('<div>').addClass('bar_container').appendTo($content);
      this.$bar = $('<img>').attr('src', 'images/bar_inprogress.png').appendTo($barContainer);
      this.$description = $('<div>').addClass('description').appendTo($content);

    },

    bindEvents: function () {

      var loader = this;

      this.$close.click(function (e) {

        e.preventDefault();

        loader.removeLightbox();

      });

    },

    beginAnimation: function () {

      var loader = this;

      this.$bar.css('width', this.options.start + '%');
      this.$bar.animate({width: this.options.finish + '%'}, {
        duration: this.options.duration,
        easing: 'linear',
        step: function (progress) {

          loader.updateProgress(parseInt(progress, 10));

        }
      });

    },

    updateProgress: function (progress) {

      if (progress < 100) {
        this.$description.text('Progress ' + progress + '%');
      } else {
        this.$bar.attr('src', 'images/bar_complete.png');
        this.$description.text('This task is 100% completed');
        this.$description.append($('<img>').attr('src', 'images/tick.png'));
      }

    },

    removeLightbox: function () {

      this.$bar.stop();
      this.$tint.remove();
      this.$container.remove();

      delete this.$tint;
      delete this.$container;
      delete this.$close;
      delete this.$bar;
      delete this.$description;

    }

  };

  var View = function (delegate) {

    this.delegate = delegate;
    this.$start = $('#start');
    this.bindEvents();

  };

  View.prototype = {

    constructor: View,

    bindEvents: function () {

      var view = this;

      this.$start.click(function (e) {

        e.preventDefault();

        view.delegate.startClicked();

      });

    },

    error: function (message) {

      // TODO - show an error message (out of scope)

    },

    loader: function (options, callback) {

      var loader = new Loader(options, callback);
      loader.start();

    }

  };

  var App = function () {

    this.view = new View(this);
    this.data = null;

  };

  App.prototype = {

    constructor: App,

    begin: function () {

      var app = this;

      this.getData(function (error, data) {

        if (error) {
          app.view.error(error);
        } else {
          app.data = data;
          app.loader();
        }

      });

    },

    getData: function (callback) {

      var app = this;

      $.getJSON('js/data.json').done(function (response, status, xhr) {

        var error, data;

        if (typeof response !== 'object' ||
            typeof response.total !== 'number' ||
            response.total < 1 ||
            typeof response.data !== 'object' ||
            typeof response.data.lightbox !== 'object') {

          error = 'Invalid response';

        } else {

          data = response.data;

        }

        callback.call(app, error, data);

      }).fail(function (xhr, status, error) {

        callback.call(app, error, null);

      });

    },

    loader: function () {

      if (this.data) {
        this.view.loader(this.data.lightbox);
      }

    },

    /* Delegate Methods */

    startClicked: function () {

      this.loader();

    }

  };

  $(document).ready(function () {

    var app = new App();
    app.begin();

  });

})(jQuery);
