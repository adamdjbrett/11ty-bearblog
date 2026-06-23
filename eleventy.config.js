import baseline, { config as baselineConfig } from '@apleasantview/eleventy-plugin-baseline';
import settings from './src/_data/settings.js';

function isPublished(item) {
	return item?.data?.published !== false;
}

function asDate(date) {
	return date instanceof Date ? date : new Date(date);
}

function pad(value) {
	return String(value).padStart(2, '0');
}

function htmlDateString(date) {
	const value = asDate(date);
	return `${value.getUTCFullYear()}-${pad(value.getUTCMonth() + 1)}-${pad(value.getUTCDate())}`;
}

function readableDate(date) {
	const value = asDate(date);
	const day = pad(value.getUTCDate());
	const month = value.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
	return `${day} ${month}, ${value.getUTCFullYear()}`;
}

function absoluteUrl(path) {
	return new URL(path || '/', settings.url).href;
}

function xmlEscape(value = '') {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function stripHtml(value = '') {
	return String(value)
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function isPublicPage(page) {
	if (!page?.url) return false;
	if (page.data?.eleventyExcludeFromCollections) return false;
	if (!isPublished(page)) return false;
	if (page.data?.draft) return false;
	if (page.url.startsWith('/feed/')) return false;
	return !['/robots.txt', '/sitemap.xml', '/humans.txt'].includes(page.url);
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
	await eleventyConfig.addPlugin(
		baseline(settings, {
			sitemap: false,
			navigator: false,
			verbose: true
		})
	);

	eleventyConfig.addPassthroughCopy({ 'src/static': '/' });
	eleventyConfig.addPassthroughCopy({ 'src/feed/pretty-atom-feed.xsl': 'feed/pretty-atom-feed.xsl' });

	eleventyConfig.addPreprocessor('published', '*', (data) => {
		if (data.published === false) return false;
	});

	eleventyConfig.addCollection('posts', (collectionApi) => {
		return collectionApi
			.getFilteredByGlob('src/content/blog/*.md')
			.filter((post) => !post.inputPath.endsWith('/index.md'))
			.filter(isPublished)
			.sort((a, b) => b.date - a.date);
	});

	eleventyConfig.addCollection('menu', (collectionApi) => {
		return collectionApi
			.getAll()
			.filter(isPublished)
			.filter((page) => page.data?.menu === 'main')
			.sort((a, b) => (a.data.weight || 0) - (b.data.weight || 0));
	});

	eleventyConfig.addCollection('tagList', (collectionApi) => {
		const tags = new Set();
		for (const post of collectionApi.getFilteredByGlob('src/content/blog/*.md')) {
			if (post.inputPath.endsWith('/index.md')) continue;
			if (!isPublished(post)) continue;
			for (const tag of post.data.tags || []) tags.add(tag);
		}
		return [...tags]
			.filter((tag) => !['all', 'posts'].includes(tag))
			.sort((a, b) => a.localeCompare(b));
	});

	eleventyConfig.addFilter('readableDate', readableDate);
	eleventyConfig.addFilter('htmlDateString', htmlDateString);
	eleventyConfig.addFilter('absoluteUrl', absoluteUrl);
	eleventyConfig.addFilter('xmlEscape', xmlEscape);
	eleventyConfig.addFilter('jsonFeedDate', (date) => asDate(date).toISOString());
	eleventyConfig.addFilter('toJson', (value) => JSON.stringify(value));
	eleventyConfig.addFilter('stripHtml', stripHtml);
	eleventyConfig.addFilter('head', (array, count) => Array.isArray(array) ? array.slice(0, count) : []);
	eleventyConfig.addFilter('publicPages', (pages) => Array.isArray(pages) ? pages.filter(isPublicPage) : []);
	eleventyConfig.addFilter('postsByTag', (posts, tag) => {
		if (!Array.isArray(posts)) return [];
		return posts.filter(isPublished).filter((post) => (post.data.tags || []).includes(tag));
	});
}

export const config = baselineConfig;
