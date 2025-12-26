<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { authClient } from '$lib/auth-client';

	let { children } = $props();
	const session = authClient.useSession();
	let open = $state(false);
</script>

<!-- Header -->
<header class="fixed top-0 right-0 z-50 w-full">
	<div class="mx-auto flex max-w-6xl items-center justify-end gap-6 px-6 py-4">
		<!-- Nav -->
		<nav>
			<ul class="flex items-center gap-6">
				<li>
					<a href="/" class="text-sm font-medium underline-offset-4 hover:underline"> Home </a>
				</li>
				<li>
					<a href="/admin/" class="text-sm font-medium underline-offset-4 hover:underline">
						Blog
					</a>
				</li>
				<!-- <li class="relative">
					<button
						class="flex cursor-pointer items-center text-sm font-medium underline-offset-4"
						onclick={() => (open = !open)}
					>
						{$session.data?.user.name}
						<span class="text-lg">▾</span>
					</button>

					{#if open}
						<div class="absolute right-0 z-50 mt-2 w-32 cursor-pointer rounded-md shadow-md">
							<a href="/logout" class="block px-4 py-2 text-sm hover:bg-accent"> Logout </a>
						</div>
					{/if}
				</li> -->
			</ul>
		</nav>

		<!-- Mode Toggle -->
		<ThemeToggle />
	</div>
</header>

<!-- Page content -->
<main class="pt-20 pl-15">
	{@render children()}
</main>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
