<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from "mode-watcher";
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children, data } = $props();
</script>
<div class="fixed top-4 right-4">
	<ThemeToggle />
	<!-- <h1>{data.name}</h1> -->
</div>
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
{@render children()}
