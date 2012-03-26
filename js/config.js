require.config({
  deps: ["bootstrap"],

  paths: {
    // JavaScript folders
    vendor: "vendor",
    plugins: "plugins",

    // Libraries
    "jquery": "vendor/jquery-min",
    "jquery-ui": "vendor/jquery-ui.min",
    "jquery-ui-autocomplete": "vendor/jquery.ui.autocomplete",
    "jquery-ui-position": "vendor/jquery.ui.position",
    "jquery-ui-widget": "vendor/jquery.ui.widget",
    "underscore": "vendor/underscore-min",
    "backbone": "vendor/backbone-min",
    "visualsearch": "vendor/visualsearch",

    // Shim Plugin
    use: "plugins/use"
  },

  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"
    },

    visualsearch: {
      deps: ["use!backbone", "order!jquery", "order!jquery-ui", "order!jquery-ui-widget", "order!jquery-ui-autocomplete", "order!jquery-ui-position"],
      attach: "VS"
    },

    underscore: {
      attach: "_"
    },
  }
});
