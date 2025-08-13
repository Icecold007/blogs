import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolink from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				rehypeSlug,
				[rehypeAutolink, { behavior: 'wrap' }],
				[
					rehypePrettyCode,
					{
						theme: 'github-dark',
						defaultLang: 'js',
						aliases: {
							javascript: 'js',
							typescript: 'ts'
						},
						onVisitLine(node) {
							if (node.children.length === 0) {
								node.children = [{ type: 'text', value: ' ' }];
							}
						},
						onVisitHighlightedLine(node) {
							node.properties.className.push('highlighted');
						},
						onVisitHighlightedWord(node) {
							node.properties.className = ['word'];
						}
					}
				]
			]
		})
	]
};

export default config;
