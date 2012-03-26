define([
  "asi",
  // Libs
  "use!backbone"
  // Modules
  // Plugins
],

function (asi, Backbone) {
  // Create a new module
  var Supplier = asi.module();

  // Example extendings
  Supplier.Model = Backbone.Model.extend({
    urlRoot: "http://stage-api-2.asicentral.com/v1/suppliers",
  });

  Supplier.Collection = Backbone.Collection.extend({ /* ... */
  });

  Supplier.Router = Backbone.Router.extend({ /* ... */
  });

  Supplier.Views.Header = Backbone.View.extend({
    template: "js/templates/supplier/header.html",

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

  Supplier.Views.Detail = Backbone.View.extend({
    template: "js/templates/supplier/detail.html",

    render: function (done) {
      var view = this,
          data = this.model.toJSON();

      // Fetch the template, render it to the View element and call done.
      asi.fetchTemplate(this.template, function (tmpl) {
        view.el.innerHTML = tmpl(data);

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);

//          $('#section-header').html(new Supplier.Views.Header().render().el);
        }
      });
    }
  });

  Supplier.Views.Ratings = Backbone.View.extend({
    template: "js/templates/supplier/ratings.html",

    render: function (done) {
      var view = this,
          data = this.model.toJSON();

      // Fetch the template, render it to the View element and call done.
      asi.fetchTemplate(this.template, function (tmpl) {
        view.el.innerHTML = tmpl(data);

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);

//          $('#section-header').html(new Supplier.Views.Header().render().el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Supplier;
});
