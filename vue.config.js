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
    productionSourceMap: false
};
