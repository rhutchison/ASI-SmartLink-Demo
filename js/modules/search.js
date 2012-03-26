define([
  "asi",
  // Libs
  "use!backbone"
  // Modules
  // Plugins
],

function (asi, Backbone) {
  // Create a new module
  var Search = asi.module();

  // Example extendings
  Search.Model = Backbone.Model.extend({
    urlRoot: "http://stage-api-2.asicentral.com/v1/products/search",
  });

  Search.Collection = Backbone.Collection.extend({ /* ... */
  });

  Search.Router = Backbone.Router.extend({ /* ... */
  });

  Search.Views.Header = Backbone.View.extend({
    template: "js/templates/search/header.html",

    views: [
      {
        route: "!/detail",
        label: "Detail"
      },
      {
        route: "!/ratings",
        label: "Ratings"
      }
    ],

    render: function () {
      var view = this,
          data = {};

      data.views = this.views;

      // Fetch the template, render it to the View element and call done.
      asi.fetchTemplate(this.template, function (tmpl) {
        view.el.innerHTML = tmpl(data);
      });

      return view;
    }
  });

  Search.Views.Results = Backbone.View.extend({
    template: "js/templates/search/results.html",

    render: function (done) {
      var view = this,
          data = this.model;

      if (data.Links.Previous) {
        var prev = '/#!/search/';

        if (data.Query) {
          prev += escape(data.Query);
        }

        if (data.Page) {
          prev += '/p' + (parseInt(data.Page) - 1);
        }

        data.Previous = prev;
      }

      if (data.Links.Next) {
        var next = '/#!/search/';

        if (data.Query) {
          next += escape(data.Query);
        }

        if (data.Page) {
          next += '/p' + (parseInt(data.Page) + 1);
        }

        data.Next = next;
      }

      // Fetch the template, render it to the View element and call done.
      asi.fetchTemplate(this.template, function (tmpl) {
        view.el.innerHTML = tmpl(data);

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);

//          $('#section-header').html(new Search.Views.Header().render().el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Search;
});
