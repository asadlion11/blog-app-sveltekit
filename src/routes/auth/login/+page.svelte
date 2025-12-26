<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Eye, EyeOff } from 'lucide-svelte';
	let showPassword = false;
</script>

<div class="flex min-h-screen w-full items-center justify-center px-4">
	<Card.Root class="-my-4 w-full max-w-sm ">
		<Card.Header>
			<Card.Title>Login</Card.Title>
			<Card.Action></Card.Action>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
						</div>
						<div class="relative flex flex-row items-center">
							<Input id="password" type={showPassword ? 'text' : 'password'} required />
							<button
								type="button"
								class="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								on:click={() => (showPassword = !showPassword)}
								aria-label="Toggle password visibility"
							>
								{#if showPassword}
									<EyeOff class="h-5 w-5 cursor-pointer" />
								{:else}
									<Eye class="h-5 w-5 cursor-pointer" />
								{/if}
							</button>
						</div>
					</div>
					<Button type="submit" class="w-full cursor-pointer">Login</Button>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button variant="link" class="cursor-pointer"
				>Don't have an account? <a href="/auth/signup">Sign Up</a></Button
			>
		</Card.Footer>
	</Card.Root>
</div>
