const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const getHtmlConfig = (name,title) => {
    return{
        template: `ejs-loader!./src/view/${name}.ejs`,
        filename: `view/${name}.html`,
        favicon: './favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: [name,'common','splitChunks']
    }
};

let config = {
    mode: 'development',
    entry: {
        'common': ['./src/page/common/common.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'payment': ['./src/page/payment/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-password-reset': ['./src/page/user-password-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-password-update': ['./src/page/user-password-update/index.js'],
        'result': ['./src/page/result/index.js'],
        'about': ['./src/page/about/index.js']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname,'dist'),
        proxy : {
            '/user/*' : {
                target: 'http://test.happymmall.com/',
                changeOrigin : true,
                secure: false
            },
            '/cart/*' : {
                target: 'http://test.happymmall.com/',
                changeOrigin : true,
                secure: false
            },
            '/product/*' : {
                target: 'http://test.happymmall.com/',
                changeOrigin : true,
                secure: false
            },
            '/order/*' : {
                target: 'http://test.happymmall.com/',
                changeOrigin : true,
                secure: false
            },
            '/shipping/*' : {
                target: 'http://test.happymmall.com/',
                changeOrigin : true,
                secure: false
            }
        }
    },
    output: {
        path: path.resolve(__dirname,'/dist/'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                   'file-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            name: 'splitChunks',
            chunks: "all",
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index','Index')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','User Login')),
        new HtmlWebpackPlugin(getHtmlConfig('list','List of results')),
        new HtmlWebpackPlugin(getHtmlConfig('result','Result')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','Detail')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','Shopping cart')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','Confirm order')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','Order list')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','Order detail')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','Payment')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','Register')),
        new HtmlWebpackPlugin(getHtmlConfig('user-password-reset','Password reset')),
        new HtmlWebpackPlugin(getHtmlConfig('user-password-update','Password update')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','User center')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','Update user info')),
        new HtmlWebpackPlugin(getHtmlConfig('about','About mmall')),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({_: "underscore"})
    ]
};

module.exports = config;

