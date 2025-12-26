<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { create_post } from '../../posts.remote';
</script>

<div class="flex min-h-full w-full justify-center px-4 my-20">
	<Card.Root class="-my-4 w-full max-w-sm ">
		<Card.Header>
			<Card.Title>Add New Post</Card.Title>
			<Card.Action></Card.Action>
		</Card.Header>
		<Card.Content>
			<form {...create_post}>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="title">Title</Label>
						<Input {...create_post.fields.title.as('text')} required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="body">Body</Label>
						</div>
						<Textarea {...create_post.fields.body.as('text')} required />
					</div>
                    <Button type="submit" class="w-full cursor-pointer">Add</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
