const contextPath = process.env.VUE_APP_CONTEXT
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleString())
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createThemeColorReplacerPlugin = require('./theme.plugin.config')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']
const isProd = ['production', 'prod'].includes(process.env.NODE_ENV)

function resolve (dir) {
    return path.join(__dirname, dir)
}

const vueConfig = {
    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            createThemeColorReplacerPlugin()
        ]
    },
    chainWebpack: (config) => {
        config.resolve.alias.set('@$', resolve('src'))
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'border-radius-base': '2px'
                    },
                    javascriptEnabled: true
                }
            }
        }
    },
    productionSourceMap: false,
    publicPath: contextPath,
};

if (isProd) {
    // ** Compress is not working under current version of webpack
    // vueConfig.configureWebpack.plugins.push(new CompressionWebpackPlugin({
    //     filename: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    //     threshold: 10240,
    //     minRatio: 0.8
    // }))
}

module.exports = vueConfig
