var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html


var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'entry'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, '/build'); //发布文件所存放的目录


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: APP_FILE
    },
    output: {
        path: BUILD_PATH, //编译到当前目录
        filename: '[name].js' //编译后的文件名字
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: 'babel-loader',
            include: [APP_PATH]
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style-loader', ['css', 'autoprefixer']),
            include: [APP_PATH]
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('css-loader!less-loader', ['less', 'autoprefixer']),
            include: [APP_PATH]
        },{
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]',
            include: [APP_PATH]
        }, {
            test: /\.(png|jpg)$/,
            exclude: /^node_modules$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            include: [APP_PATH]
        }, {
            test: /\.jsx$/,
            exclude: /^node_modules$/,
            loaders: ['jsx-loader', 'babel-loader'],
            include: [APP_PATH]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development') //定义编译环境
            }
        }),
        new HtmlWebpackPlugin({//根据模板插入css/js等生成最终HTML
            filename: './index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            hash: false,
        }),
        new ExtractTextPlugin('[name].css')
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css'], //后缀名自动补全
        alias: {
            "actions": path.resolve(__dirname, "src/actions"),
            "components": path.resolve(__dirname, "src/components"),
            "containers": path.resolve(__dirname, "src/containers"),
            "reducers": path.resolve(__dirname, "src/reducers"),
            "utils": path.resolve(__dirname, "src/utils")
        }
    }
};