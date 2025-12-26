<script lang="ts">
	import { page } from "$app/state";
	import { get_post_by_id } from "../../posts.remote";

    const post = await get_post_by_id(page.params.id!)
</script>

{#if post}
	<h1>{post.title}</h1>
	<h2>{post.body}</h2>
{/if}