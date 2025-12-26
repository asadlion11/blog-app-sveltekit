<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let error = $state('');

	//Signup function
	async function signup(e: Event) {
		e.preventDefault();

		// Get form data
		const form = e.target as HTMLFormElement;
		const username = form.username.value;
		const email = form.email.value;
		const password = form.password.value;
		const confirmPassword = form.confirmPassword.value;

		// Password and confirm password match check
		if (password != confirmPassword) {
			error = "Passwords do'not match";
			return;
		}

		// Check all form fields are filled
		// if (!username || !email || !password || !confirmPassword) {
		// 	error = 'Please fill all the fields';
		// 	return;
		// }

		// Call signup method from authClient // Implemeting the signup function
		await authClient.signUp.email(
			{
				email,
				password,
				name: username
			},
			{
				onSuccess: async () => {
					//after successful signup redirect to login page
					await goto(resolve('/'), { replaceState: true });
					window.location.reload();
				}
			}
		);
	}
</script>

<div class="flex min-h-screen w-full items-center justify-center px-4">
	<Card.Root class="-my-4 w-full max-w-sm ">
		<Card.Header>
			<Card.Title>Sign Up</Card.Title>
			<Card.Action></Card.Action>
		</Card.Header>
		<Card.Content>
			<form onsubmit={signup}>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="username">Username</Label>
						<Input id="username" name="username" type="text" required />
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" name="email" type="email" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
						</div>
						<div class="relative flex flex-row items-center">
							<Input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								required
							/>
							<button
								type="button"
								class="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								onclick={() => (showPassword = !showPassword)}
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
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="confirmPassword">Confirm Password</Label>
						</div>
						<div class="relative flex flex-row items-center">
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type={showConfirmPassword ? 'text' : 'password'}
								required
							/>
							<button
								type="button"
								class="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								onclick={() => (showConfirmPassword = !showConfirmPassword)}
								aria-label="Toggle show confirm password visibility"
							>
								{#if showConfirmPassword}
									<EyeOff class="h-5 w-5 cursor-pointer" />
								{:else}
									<Eye class="h-5 w-5 cursor-pointer" />
								{/if}
							</button>
						</div>
					</div>
					{#if error}
						<p class="text-sm text-red-600">{error}</p>
					{/if}
					<Button type="submit" class="w-full cursor-pointer">Sign Up</Button>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button variant="link" class="cursor-pointer"
				>Already have an account? <a href="/auth/login">Login</a></Button
			>
		</Card.Footer>
	</Card.Root>
</div>
