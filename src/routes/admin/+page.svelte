<script lang="ts">
	import { get_all_posts } from './posts.remote';
	import * as Table from '$lib/components/ui/table/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	//get all posts from server(remote function)
	const posts = await get_all_posts();
</script>

<div class="mx-10 my-10 w-3/4">
	<h1 class="mb-10 text-lg font-bold">All Posts</h1>
	<Table.Root>
		<Table.Caption>A list of your all posts</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>Title</Table.Head>
				<Table.Head>Body</Table.Head>
				<Table.Head class="text-end">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each posts as post}
				<Table.Row>
					<Table.Cell>{post.title}</Table.Cell>
					<Table.Cell>{post.body}</Table.Cell>
					<Table.Cell class="text-end">
						<div class="mt-2 flex gap-2 justify-end">
							<Button class="rounded-md bg-blue-500 px-3 py-1 text-white cursor-pointer">Edit</Button>
							<Button class="rounded-md bg-red-500 px-3 py-1 text-white cursor-pointer">Delete</Button>
						</div>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
