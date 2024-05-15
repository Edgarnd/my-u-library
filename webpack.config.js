const path = require('path');
module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.ts$|tsx/,
            exclude: /node_modules/
        }]
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        https: false,
        historyApiFallback: { index: "/", disableDotRule: true },
    }
};