const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
  	rules: [
  	  {
  	  	test: /\.m?js$/,
  	  	exclude: /(node_modules|bower_components)/,
  	  	use: [
  	  	  {
  	  		loader: 'babel-loader',
  	  		options: {
  	  			presets: ['@babel/preset-env', '@babel/preset-react']
  	  		}
  	  	  }
  	  	]
  	  },
  	  {
  	    test: /\.s[ac]ss$/i, 
  	    use: [
  	      // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'resolve-url-loader',
          'sass-loader',
  	    ]
  	  },
  	  {
  	    test: /\.(ttf|eot|svg|gif|png|jpe?g)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  	    use: [{loader: 'file-loader'}]
  	  }
  	]
  }
};

/*/\.m?js$/*/
/*
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          
        ],
      },
    ],
  },
}
*/