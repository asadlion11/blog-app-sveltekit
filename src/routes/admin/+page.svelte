<script lang="ts">
	import { get_all_posts } from './posts.remote';
	import * as Table from '$lib/components/ui/table/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	//get all posts from server(remote function)
	const posts = await get_all_posts();
</script>

<div class="mx-10 my-10 w-3/4">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="mb-10 text-lg font-bold">All Posts</h1>
		<Button variant="link" class="cursor-pointer bg-[#4e84da] text-white"
			><a href="/admin/post/new">Add New Post</a></Button
		>
	</div>
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
						<div class="mt-2 flex justify-end gap-2">
							<Button class="cursor-pointer rounded-md bg-blue-500 px-3 py-1 text-white"
								>Edit</Button
							>
							<Button class="cursor-pointer rounded-md bg-red-500 px-3 py-1 text-white"
								>Delete</Button
							>
						</div>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
