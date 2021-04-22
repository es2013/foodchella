const path = require("path");
//import webpack because we plan to use plugin in module exports
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");



//create a main configuration entry, output and mode
const config  = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
      },      
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use:[
            {
                loader: 'file-loader',
                options:{//name returns the name of the file with the file ext
                    name (file) {
                        return "[path][name].[ext]"
                    },//changes our assignment url by replacing ../ with /assets/
                    publicPath:function(url) {
                        return url.replace("../","/assets")
                    }
                }
            },{
                loader:'image-webpack-loader'
            }
        ]//end of use
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static", // the report outputs to an HTML file in the dist folder
      }), //new is invoking construction function
      new WebpackPwaManifest({
        name: "Food Event",
        short_name: "Foodies",
        description: "An app that allows you to view upcoming food events.",
        start_url: "../index.html",
        background_color: "#01579b",
        theme_color: "#ffffff",
        fingerprints: false, //Fingerprints tell webpack whether or not it should generate unique fingerprints so that each time a new manifest is generated
        inject: false,
        icons: [{
          src: path.resolve("assets/img/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons")
        }]
      })
  ],
  mode: 'development'
};

module.exports = config;
