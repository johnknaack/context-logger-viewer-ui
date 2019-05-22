module.exports = {
    mode: 'development',
    target: 'web',
    entry: './Index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader'
        }, {
            test: /\.js$/,
            enforce: 'pre',
            loader: 'source-map-loader'
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            query: {
                presets: ["@babel/env", "@babel/react"],
                "plugins": [
                  "@babel/plugin-proposal-class-properties"
                ]
            }
        }]
    }
};