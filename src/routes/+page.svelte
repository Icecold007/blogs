<script lang="ts">
	import * as config from '$lib/config';
	export let data;
	import { formatDate } from '$lib/utils';
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href={post.slug} class="title">{post.title}</a>
				<p class="date">{formatDate(post.date)}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.posts {
		display: grid;
		gap: var(--size-7);
		padding: 0;
		margin: 0 auto;
		max-width: 100vw;
	}

	.post {
		max-inline-size: var(--size-content-3);
		padding: var(--size-4) var(--size-3);
		box-sizing: border-box;
	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}

	.title {
		font-size: var(--font-size-fluid-3);
		text-transform: capitalize;
		word-break: break-word;
	}

	.date {
		color: var(--text-2);
		font-size: 0.95em;
	}

	.description {
		margin-top: var(--size-3);
		word-break: break-word;
	}

	/* Responsive styles for mobile */
	@media (max-width: 600px) {
		.posts {
			gap: var(--size-5);
			padding: 0 var(--size-2);
		}

		.post {
			max-inline-size: 100%;
			padding: var(--size-3) var(--size-1);
		}

		.title {
			font-size: 1.1rem;
		}

		.description {
			font-size: 0.98rem;
		}
	}
</style>
