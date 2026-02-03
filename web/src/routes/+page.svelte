<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="overflow-none h-screen w-screen bg-[#ffecc9] p-5">
	<h1 class="text-5xl text-[#241802]">The Great Family Tree</h1>
	<p class="my-5 text-balance">
		This is a project maintained by Aditya Vinodh Arjun to track and maintain my family history.
		<br />
		Explore the branches of my family tree and discover the stories that connect us all.
	</p>

	<p class="my-5">Tree size: {data.personCount}</p>

	<a
		href={resolve('/search')}
		class="bg-[#241802] px-4 py-2 text-[#ffecc9] inset-ring-3 inset-ring-[#9c6d17]"
		>Search our tree</a
	>
	<!-- <a -->
	<!-- 	href={resolve('/login')} -->
	<!-- 	class="bg-[#241802] px-4 py-2 text-[#ffecc9] inset-ring-3 inset-ring-[#9c6d17]" -->
	<!-- 	>Log in to grow our tree</a -->
	<!-- > -->
</div>
