<script lang="ts">
	import * as config from '$lib/config';
	import Toggle from './toggle.svelte';
</script>

<nav>
	<a href="/" class="title">
		<b>{config.title}</b>
	</a>

	<!-- <ul class="links">
		<li>
			<a href="/about">About</a>
		</li>
		<li>
			<a href="/contact" rel="prefetch">Contact</a>
		</li>
	</ul> -->
	<Toggle />
</nav>

<style>
	nav {
		padding-block: var(--size-7);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	@media (max-width: 767px) {
		nav {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: var(--size-4);
			text-align: center;
		}
	}

	@media (min-width: 768px) {
		nav {
			display: flex;
			justify-content: space-between;
		}
		/* .links {
			display: flex;
			gap: var(--size-4);
			margin-block: 0;
		} */
	}
</style>
