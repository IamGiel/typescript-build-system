// config for prod environment
const webpack = require('webpack');
module.exports = {
    mode:'production',
    devtool:'source-map',
    plugins:[
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('De Asis Prod')
        })
    ]

}