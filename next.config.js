const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');

module.exports = withCSS(
	withSass(
		withTM({
  		transpileModules: [
  			'react-flexbox-grid',
  			'react-syntax-highlighter',
  		],
			exportPathMap: function(defaultPathMap, { dev, dir, outDir, distDir, buildId }) 
			{
			  return {
			    '/blog': { page: '/blog' },
			    '/gears': { page: '/gears' },
			    '/': { page: '/' },
			    '/posts/creating-an-incoming-email-server-and-sending-data': { page:'/posts/[slug]', query: { slug: 'creating-an-incoming-email-server-and-sending-data' }},
		    }
		  },
  		webpack: function(config) {
		    config.module.rules.push({
		      test: /\.md$/,
		      use: 'raw-loader',
		    })
		    return config
		  },
		})
	),
);
