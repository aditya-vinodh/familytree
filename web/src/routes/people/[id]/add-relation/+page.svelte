<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	console.log(data);

	let relation: string = $state(data.relation);

	async function addRelation(person2Id: number) {
		const res = await fetch(`/people/${data.person.id}/add-relation`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				relation,
				person2Id
			})
		});

		if (res.ok) {
			goto(resolve(`/people/${data.person.id}`));
		} else {
			alert('Failed to add relation');
		}
	}
</script>

<div class="overflow-none h-screen w-screen bg-[#ffecc9] p-2">
	<div class="flex items-center justify-between">
		<a href={resolve('/')} class="text-sm text-[#241802]">The Great Family Tree</a>

		<a href={resolve('/search')}
			><svg class="size-5 fill-[#241802]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
				><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
					d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
				/></svg
			></a
		>
	</div>

	<form action={`/people/${data.person.id}/add-relation`}>
		<div class="mt-5 mb-5 flex flex-col items-center">
			<div class="w-full max-w-md">
				<fieldset class="border">
					<legend>Select a relation</legend>

					<div>
						<input
							type="radio"
							id="mother"
							name="relation"
							value="mother"
							checked={data.relation === 'mother' || data.relation === ''}
							bind:group={relation}
						/>
						<label for="mother">Mother</label>
					</div>
					<div>
						<input
							type="radio"
							id="father"
							name="relation"
							value="father"
							checked={data.relation === 'father'}
							bind:group={relation}
						/>
						<label for="father">Father</label>
					</div>
					<div>
						<input
							type="radio"
							id="sibling"
							name="relation"
							value="sibling"
							checked={data.relation === 'sibling'}
							bind:group={relation}
						/>
						<label for="sibling">Sibling</label>
					</div>
					<div>
						<input
							type="radio"
							id="spouse"
							name="relation"
							value="spouse"
							checked={data.relation === 'spouse'}
							bind:group={relation}
						/>
						<label for="spouse">Spouse</label>
					</div>
				</fieldset>
			</div>
		</div>

		<div class="mb-5 flex flex-col items-center">
			<input
				type="text"
				id="q"
				name="q"
				placeholder="Search"
				class="inset-shadow-md h-[40px] w-full max-w-md border-0 bg-[#ffecc9] text-sm inset-ring-3 inset-ring-[#9c6d17] placeholder:text-[#ab8f6c] focus-visible:ring-0 focus-visible:outline-none"
				value={data.q}
			/>
		</div>

		<div class="flex flex-col items-center gap-2">
			{#each data.searchResults as person (person.id)}
				<button
					on:click={() => addRelation(person.id)}
					class="w-full max-w-md rounded-sm bg-[#f2d7a5] p-2 text-left text-sm text-[#241802]"
					>{person.fullName}</button
				>
			{/each}
		</div>
	</form>
</div>
