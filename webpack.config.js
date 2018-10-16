var path = require("path");
var webpack = require("webpack");
var MinifyPlugin = require("babel-minify-webpack-plugin");
var VueLoaderPlugin = require("vue-loader/lib/plugin");

var node_env;


module.exports = (env, argv) => {
	node_env = argv.mode;
  return {
    entry: path.resolve(__dirname, "./src/index.js"),

    output: {
      path: path.resolve(__dirname, "./dist"),
      publicPath: path.resolve(__dirname, "./dist"),
      filename: "ajax-form.js",
      library: "Formaj",
      libraryTarget: "window",
      libraryExport: "default"
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.js"
      },

      extensions: [".js", ".vue"]
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader"
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "env",
                  {
                    targets: {
                      browsers: ["last 2 versions", ">= 3%", "not ie <= 10"],
                      uglify: true
                    },
                    modules: false,
                    forceAllTransforms: node_env === "production"
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.svg$/,
          use: "svg-inline-loader?classPrefix"
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              query: {
                name: "[name].[ext]?[hash]"
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: '"' + node_env + '"'
        }
      }),
      new VueLoaderPlugin()
    ],

    devtool: "none",

    devServer: {
      historyApiFallback: true,
      noInfo: true,
      port: 8081
    }
  };
};

if (node_env == "production") {
  module.exports.devtool = "none";
  module.exports.plugins = module.exports.plugins.concat([
    new MinifyPlugin(
      {},
      {
        comments: false
      }
    )
  ]);
}
