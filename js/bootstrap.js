require([
  "asi",

  // Libs
  "jquery",
  "use!backbone",
  "use!visualsearch",

  // Modules
  "modules/search",
  "modules/product",
  "modules/supplier",
],

function(asi, $, Backbone, VS, Search, Product, Supplier) {
  var jQuery = $;

  var asiSmartLink = {
    client_id: 0,
    client_secret: ''
  };

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "!/search/:q": "search_results",
      "!/search/:q/p:page": "search_results",
      "!/product/:id": "product_detail",
      "!/supplier/:id": "supplier_detail",
    },

    index: function() {
      if (window.visualSearch) {
        window.visualSearch.searchBox.clearSearch();
      }
      $("#main").html('<h1>Perform a new search!</h1>');
    },

    search_results: function(q, page) {
      query = encodeURIComponent(q);

      $.ajax('http://stage-api-2.asicentral.com/v1/products/search.json', {
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'AsiMemberAuth client_id=' + this.asiSmartLink.client_id + '&client_secret=' + this.asiSmartLink.client_secret);
        },
        data: {
          q: query,
          rpp: 40,
          page: page,
        },
        success:function (data) {
          if (typeof(data) === 'string') {
            data = JSON.parse(data);
          }

          var search_results = new Search.Views.Results({ model: data });

          // Attach the results to the DOM
          search_results.render(function(el) {
            $("#main").html(el);
          });
        }
      });
    },

    product_detail: function(id) {
      var product = new Product.Model({ id: id });

      product.fetch({
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'AsiMemberAuth client_id=' + this.asiSmartLink.client_id + '&client_secret=' + this.asiSmartLink.client_secret);
        },
        success:function (data) {
          var product_detail = new Product.Views.Detail({ model: data });

          // Attach the product to the DOM
          product_detail.render(function(el) {
            $("#main").html(el);
          });
        }
      });
    },

    supplier_detail: function(id) {
      var supplier = new Supplier.Model({ id: id });

      supplier.fetch({
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'AsiMemberAuth client_id=' + this.asiSmartLink.client_id + '&client_secret=' + this.asiSmartLink.client_secret);
        },
        success:function (data) {
          var supplier_detail = new Supplier.Views.Detail({ model: data });

          // Attach the supplier to the DOM
          supplier_detail.render(function(el) {
            $("#main").html(el);
          });
        }
      });
    }
  });

  // Shorthand the application namespace
  var app = asi.app;

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

  /*
    app.router.bind('all ', function(route, section) {
      var $el;
      route = route.replace('route: ', '');

alert('G: ' + route);
      $el = $('#nav - ' + route);

      if ($el.hasClass('selected')) {
        return;
      } else {
        $('#menu li.selected').removeClass('selected');
        $el.addClass('selected');
      }
    });
*/

    // Trigger the initial route
    Backbone.history.start();
  });

  require([
    "jquery",
    "css/bootstrap/js/bootstrap.js",
    "js/vendor/visualsearch/views/search_box.js",
    "js/vendor/visualsearch/views/search_facet.js",
    "js/vendor/visualsearch/views/search_input.js",
    "js/vendor/visualsearch/models/search_facets.js",
    "js/vendor/visualsearch/models/search_query.js",
    "js/vendor/visualsearch/utils/backbone_extensions.js",
    "js/vendor/visualsearch/utils/hotkeys.js",
    "js/vendor/visualsearch/utils/jquery_extensions.js",
    "js/vendor/visualsearch/utils/search_parser.js",
    "js/vendor/visualsearch/utils/inflector.js",
  ], function($) {
    $(function() {
      window.visualSearch = VS.init({
        container : $('.visual_search'),
        //query     : '',
        unquotable : [
          'asi',
          'canadian', 'canadian_friendly',
        ],
        callbacks : {
          search       : function(query, searchCollection) {
            console.log(["query", searchCollection.facets(), query]);

            Backbone.history.navigate("!/search/" + query, true);
          },
          facetMatches : function(callback) {
            callback([
              'category', 'color', 'size', 'shape', 'material',
              'canadian', 'canadian_friendly',
              { label: 'asi',    category: 'Supplier' }
            ]);
          },
          valueMatches : function(facet, searchTerm, callback) {
            switch (facet) {
              case 'canadian':
              case 'canadian_friendly':
                callback(['true', 'false']);
                break;
              case 'category':
              case 'color':
              case 'material':
              case 'shape':
              case 'size':
                $.get('http://stage-api-2.asicentral.com/v1/lists/auto_complete/' + facet + '.json', {
                  term: searchTerm
                }, function(data) {
                  callback(data);
                }, "json");
                break;
            }
          }
        }
      });
    });
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });

});
