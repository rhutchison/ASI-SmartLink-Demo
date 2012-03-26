define([
  "asi",
  // Libs
  "use!backbone"
  // Modules
  // Plugins
],

function (asi, Backbone) {
  // Create a new module
  var Product = asi.module();

  // Example extendings
  Product.Model = Backbone.Model.extend({
    urlRoot: "http://stage-api-2.asicentral.com/v1/products",
  });

  Product.Collection = Backbone.Collection.extend({ /* ... */
  });

  Product.Router = Backbone.Router.extend({ /* ... */
  });

  Product.Views.Header = Backbone.View.extend({
    template: "js/templates/product/header.html",

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

  Product.Views.Detail = Backbone.View.extend({
    template: "js/templates/product/detail.html",

    render: function (done) {
      var view = this,
          data = this.model.toJSON();

      // Fetch the template, render it to the View element and call done.
      asi.fetchTemplate(this.template, function (tmpl) {
        view.el.innerHTML = tmpl(data);

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);

//          $('#section-header').html(new Product.Views.Header().render().el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Product;
});
