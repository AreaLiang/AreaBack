const CompressionPlugin = require('compression-webpack-plugin');
const Webpack = require("webpack")
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin'); // 用于每次打包dist目录删除

 const assetsCDN = { //
    // 放置需要使用 cdn 的库
    externals:{
        vue: 'Vue',
        'element-plus': 'ElementPlus',
    },
    css:[
      // 存放 引用 css文件的地址
      // '//unpkg.com/element-plus@1.0.2-beta.48/lib/theme-chalk/index.css',
    ],
    js:[
      // 存放 引用 js 文件的地址
      // '//unpkg.com/vue@3.1.1/dist/vue.global.js',
    ]
  }


module.exports = {
	pages: {
		index: {
			entry: "src/main.js",
			chunks:['runtime','defaultVendors~index','vendor','index']
		}
	},
	// 基本路径
	publicPath: './',
	// 输出文件目录
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: false,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:5000', //跨域端口
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	configureWebpack: {
		plugins: [
			new CompressionPlugin({
				algorithm: 'gzip', // 使用gzip压缩
				test: /\.js$|\.html$|\.css$/, // 匹配文件名
				filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
				minRatio: 1, // 压缩率小于1才会压缩
				threshold: 10240, // 对超过10k的数据压缩
				deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
			}),
			new Webpack.ProvidePlugin({ //用于定义全局变量
				//vuex 的模块化
				mapState: ['vuex', 'mapState'],
				mapGetters: ['vuex', 'mapGetters'],
				mapActions: ['vuex', 'mapActions'],
				mapMutations: ['vuex', 'mapMutations'],

				//lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库,中文文档：https://www.lodashjs.com/
				_: 'lodash'
			}),
			new CleanWebpackPlugin(), // 用于每次打包dist目录删除
			new Webpack.DefinePlugin({ //用于注入全局变量，一般用在环境变量上
				// nameaa: "'蛙人'"
			})

			// new Webpack.IgnorePlugin(/.\/lib/, /element-ui/) //该插件能够使得指定目录被忽略，从而使得打包变快，文件变小
		],
		externals:{//　externals中的key是用于import，value表示的在全局中访问到该对象，就是window.echarts
			'echarts':'echarts' // 配置使用CDN
		}
	},

	chainWebpack: config => { //image-webpack-loader 图片压缩
		
		const imagesRule = config.module.rule('images');
		imagesRule
			.use('image-webpack-loader')
			.loader('image-webpack-loader')
			.options({
				bypassOnDebug: true
			})
			.end()
			
		config
		  .optimization.splitChunks({
			  chunks: 'all',
			  name: 'vendor',
			  cacheGroups: {
			  	defaultVendors: {
			  		test: /[\\/]node_modules[\\/]/,
			  		priority: -10,
			  		reuseExistingChunk: true,
			  	},
			  	default: {
			  		minChunks: 2,
			  		priority: -20,
			  		reuseExistingChunk: true,
			  	},
			  }
		  })
		   config.optimization.runtimeChunk('single')
	}
}
