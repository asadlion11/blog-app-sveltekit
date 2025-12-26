<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';
	import { get_user } from './user.remote';
	import Button from '$lib/components/ui/button/button.svelte';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { children } = $props();
	// rerun when session changes/ when user data changes
	const user = $derived(await get_user());

	let open = $state(false);

	//logout function
	function logout() {
		authClient.signOut({
			fetchOptions: {
				onSuccess: async () => {
					await get_user().refresh();
					goto(resolve('/auth/login'));
				}
			}
		});
	}
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
				{#if user?.id}
					<li>
						<a href="/admin/" class="text-sm font-medium underline-offset-4 hover:underline">
							Blog
						</a>
					</li>
					<li class="relative">
						<button
							class="flex cursor-pointer items-center gap-1 text-sm font-medium underline-offset-4"
							onclick={() => (open = !open)}
						>
							{user?.username}
							<span class="text-xs">▾</span>
						</button>

						{#if open}
							<div class="absolute right-0 z-50 mt-2 w-32">
								<Button variant="link" class="cursor-pointer" onclick={logout}>Logout</Button>
							</div>
						{/if}
					</li>
				{/if}
				{#if !user?.id}
					<li>
						<a href="/auth/signup" class="text-sm font-medium underline-offset-4 hover:underline">
							Sign Up
						</a>
					</li>
					<li>
						<a href="/auth/login" class="text-sm font-medium underline-offset-4 hover:underline">
							Login
						</a>
					</li>
				{/if}
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
