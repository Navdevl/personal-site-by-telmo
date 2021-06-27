const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = withCSS(
	withTM({
		transpileModules: [
			'react-flexbox-grid',
			'react-syntax-highlighter',
		],
		webpack: function(config) {
	    config.module.rules.push({
	      test: /\.md$/,
	      use: 'raw-loader',
	    })
			config.optimization.minimizer = [];
			config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));

	    return config
	  },
	})
);
