const contextPath = process.env.VUE_APP_CONTEXT
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
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
    publicPath: contextPath
};
