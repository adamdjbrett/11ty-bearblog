export default {
	title: 'Hugo ʕ•ᴥ•ʔ Bear Blog',
	tagline: 'Hugo + Bear = :heart:',
	description: 'Hugo + Bear = :heart:',
	author: 'Jane Doe',
	copyright: 'Copyright © 2020, Jane Doe.',
	url: 'https://example.com/',
	defaultLocale: 'en-US',
	defaultLanguage: 'en',
	language: 'en-US',
	noindex: false,
	buildDate: new Date().toISOString(),
	favicon: '/images/favicon.png',
	images: ['/images/share.png'],
	hideMadeWithLine: false,
	enablePostNavigator: false,
	feed: {
		atom: '/feed/feed.xml',
		json: '/feed/feed.json',
		twtxt: '/feed/twtxt.txt',
		xsl: '/feed/pretty-atom-feed.xsl'
	},
	head: {
		link: [],
		meta: [],
		script: []
	},
	seo: {
		openGraph: { type: 'website' },
		twitter: { card: 'summary' }
	}
};
