const path = require('path');

module.exports = {
    entry: './frontend/index.js',
    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'frontend/build/'),
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
            },
        ]
    }
};
