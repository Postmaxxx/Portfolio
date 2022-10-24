const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './assets/js/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './_layout.twig' 
        }),
       new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },
            {
                test: /\.(png|bmp|jpe?g|gif|svg)$/,
                type: 'asset/resource',
                generator : {
                    filename : 'images/[name].[contenthash][ext][query]',
                  }
            },
            {
                test: /\.(ttf|woff|woff2|out)$/,
                type: 'asset/resource',
                generator : {
                    filename : 'fonts/[name][ext][query]',
                  }
            },
            {
                test: /\.twig$/,
                use: [
                  'raw-loader',
                  {
                    loader: 'twig-html-loader',
                    options: {
                      data: {}
                    }
                  }
                ]
              },
        ]
    },
    devServer: {
        static: {
          directory: './build',
        },
        compress: false,
        port: 80,
        client: {
            progress: true,
        },
        liveReload: true,
      },
}