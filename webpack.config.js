const path = require("path");
//import webpack because we plan to use plugin in module exports
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


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
      })
  ],
  mode: 'development'
};

module.exports = config;
