const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const FileManagerPlugin = require("filemanager-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const PostcssPresetEnv = require('postcss-preset-env');
const MinimalClassnameGenerator = require("webpack-minimal-classnames");

const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const HtmlWebpackInjectPreload = require("@principalstudio/html-webpack-inject-preload");


// const generateMinimalClassname = MinimalClassnameGenerator({
//   length: 3,
//   excludePatterns: [/ad/i]
// })

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


// const devMode = process.env.NODE_ENV !== "production";


module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.[contenthash].js",
        assetModuleFilename: path.join("images", "[name].[contenthash][ext]")
    },
    devtool: "source-map",
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        allowedHosts: "all",
        port:  9092,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/template.html"),
            filename: "index.html",
        }),

        new HtmlWebpackInjectPreload({
            files: [
                {
                    match: /.*\.woff2$/,
                    attributes: {as: "font", type: "font/woff2", crossorigin: true},
                },
                {
                    match: /vendors\.[a-z-0-9]*.css$/,
                    attributes: {as: "style"},
                },
            ]
        }),


        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ["dist"]
                },
            }
        }),
        new MiniCssExtractPlugin(
            {
                filename: "[name].[contenthash].css",
            }
        ),
        new CompressionPlugin({
            algorithm: "gzip",
            threshold: 10240,
            minRatio: 0.8
        }),

    ],
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: path.join("fonts", "[name].[contenthash][ext]"),
                }
            },
            {
                test: /\.(doc|docx|pdf)$/,
                type: "asset/resource",
                generator: {
                    filename: path.join("docs", "[name].[contenthash][ext]"),
                }
            },
            {
                test: /\.(png|jp(e*)g|ico)$/,
                type: "asset/resource"
            },
            {
                test: /\.svg$/i,
                type: "asset/resource",
                generator: {
                    filename: path.join("icons", "[name].[contenthash][ext]"),
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    // devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            // importLoaders: 2,
                            // modules: {
                            //   getLocalIdent: generateMinimalClassname
                            // }
                        },
                    },
                    // "postcss-loader",
                    "sass-loader",

                ],
            },
            {
                test: /\.js|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: ["babel-loader"],
            },
        ],
    },
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    type: "css/mini-extract",
                    chunks: "all",
                    enforce: true,
                },
            },
        },
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: {removeAll: true},
                        },
                    ]

                },
                minify: [
                    CssMinimizerPlugin.cssnanoMinify,
                ],
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.svgoMinify,
                    options: {
                        encodeOptions: {
                            multipass: true,
                            plugins: [
                                "preset-default",
                            ],
                        },
                    },
                },
            }),
        ],
    },
};
