const path = require("path");
//import webpack because we plan to use plugin in module exports
const webpack = require("webpack");

//create a main configuration entry, output and mode
module.exports = {
    entry: './assets/js/script.js',
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
  ],
  mode: 'development'
};