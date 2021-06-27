const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')


module.exports = withCSS(
	withSass(
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
		    config.optimization.minimizer.push(new TerserPlugin());

		    return config
		  },
		})
	),
);
