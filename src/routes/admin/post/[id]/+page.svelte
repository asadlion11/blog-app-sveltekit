<script lang="ts">
	import { page } from "$app/state";
	import { get_post_by_id, update_post } from "../../posts.remote";
    import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

    const post = await get_post_by_id(page.params.id!)
</script>

<div class="flex min-h-full w-full justify-center px-4 my-20">
	<Card.Root class="-my-4 w-full max-w-sm ">
		<Card.Header>
			<Card.Title>Update Post</Card.Title>
			<Card.Action></Card.Action>
		</Card.Header>
		<Card.Content>
			<form  {...update_post} >
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="id">Id</Label>
						<Input {...update_post.fields.id.as('text')} readonly value={post?.id} />
					</div>
					<div class="grid gap-2">
						<Label for="title">Title</Label>
						<Input {...update_post.fields.title.as('text')} required value={post?.title} />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="body">Body</Label>
						</div>
						<Textarea {...update_post.fields.body.as('text')} required value={post?.body} />
					</div>
                    <Button type="submit" class="w-full cursor-pointer">Update</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>