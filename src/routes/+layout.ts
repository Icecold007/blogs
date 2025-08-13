export const prerender = true;
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ url }: LoadEvent) {
	return {
		url: url.pathname
	};
}
