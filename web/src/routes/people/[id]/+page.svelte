<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	console.log(data);

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
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

	<h1 class="mt-10 mb-5 text-5xl text-[#241802]">{data.person.fullName}</h1>

	{#if data.person.birthDate || data.person.birthCity || data.person.birthCountry}
		<div class="flex items-center gap-2 text-[#241802]">
			<svg class="size-7 fill-[#241802]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
				><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
					d="M182.4 53.5L157.8 95.6C154 102.1 152 109.6 152 117.2L152 120C152 142.1 169.9 160 192 160C214.1 160 232 142.1 232 120L232 117.2C232 109.6 230 102.2 226.2 95.6L201.6 53.5C199.6 50.1 195.9 48 192 48C188.1 48 184.4 50.1 182.4 53.5zM310.4 53.5L285.8 95.6C282 102.1 280 109.6 280 117.2L280 120C280 142.1 297.9 160 320 160C342.1 160 360 142.1 360 120L360 117.2C360 109.6 358 102.2 354.2 95.6L329.6 53.5C327.6 50.1 323.9 48 320 48C316.1 48 312.4 50.1 310.4 53.5zM413.8 95.6C410 102.1 408 109.6 408 117.2L408 120C408 142.1 425.9 160 448 160C470.1 160 488 142.1 488 120L488 117.2C488 109.6 486 102.2 482.2 95.6L457.6 53.5C455.6 50.1 451.9 48 448 48C444.1 48 440.4 50.1 438.4 53.5L413.8 95.6zM224 224C224 206.3 209.7 192 192 192C174.3 192 160 206.3 160 224L160 277.5C122.7 290.6 96 326.2 96 368L96 388.8C116.9 390.1 137.6 396.1 156.3 406.8L163.4 410.9C189.7 425.9 222.3 424.3 247 406.7C290.7 375.5 349.3 375.5 393 406.7C417.6 424.3 450.3 426 476.6 410.9L483.7 406.8C502.4 396.1 523 390.1 544 388.8L544 368C544 326.2 517.3 290.6 480 277.5L480 224C480 206.3 465.7 192 448 192C430.3 192 416 206.3 416 224L416 272L352 272L352 224C352 206.3 337.7 192 320 192C302.3 192 288 206.3 288 224L288 272L224 272L224 224zM544 437C531.3 438.2 518.9 442 507.5 448.5L500.4 452.6C457.8 476.9 405 474.3 365.1 445.8C338.1 426.5 301.9 426.5 274.9 445.8C235 474.3 182.2 477 139.6 452.6L132.5 448.5C121.1 442 108.7 438.1 96 437L96 512C96 547.3 124.7 576 160 576L480 576C515.3 576 544 547.3 544 512L544 437z"
				/></svg
			>
			{#if data.person.birthDate}
				<p>
					Born {months[data.person.birthMonth - 1]}
					{data.person.birthDate}, {data.person.birthYear}
					{data.person.birthCity || data.person.birthCountry
						? `in ${data.person.birthCity ?? ''}${data.person.birthCity && data.person.birthCountry ? ', ' : ''}${data.person.birthCountry ?? ''}`
						: ''}
				</p>
			{/if}
		</div>
	{/if}

	{#if data.relations.find((r) => (r.relation === 'mother' || r.relation === 'father') && r.person1Id === data.person.id)}
		<div class="mt-10">
			<h2 class="mb-2 text-xl text-[#241802]">Parents</h2>
			<div class="flex gap-2">
				{#each data.relations.filter((r) => (r.relation === 'mother' || r.relation === 'father') && r.person1Id === data.person.id) as rel (rel.id)}
					<a
						href={resolve(`/people/${rel.id}`)}
						class="w-xs rounded-sm bg-[#f2d7a5] p-2 text-sm text-[#241802]">{rel.fullName}</a
					>
				{/each}
			</div>
		</div>
	{/if}

	{#if data.relations.find((r) => r.relation === 'sibling')}
		<div class="mt-10">
			<h2 class="mb-2 text-xl text-[#241802]">Siblings</h2>
			<div class="flex gap-2">
				{#each data.relations.filter((r) => r.relation === 'sibling') as rel (rel.id)}
					<a
						href={resolve(`/people/${rel.id}`)}
						class="w-xs rounded-sm bg-[#f2d7a5] p-2 text-sm text-[#241802]">{rel.fullName}</a
					>
				{/each}
			</div>
		</div>
	{/if}

	{#if data.relations.find((r) => r.relation === 'spouse')}
		<div class="mt-10">
			<h2 class="mb-2 text-xl text-[#241802]">Spouse</h2>
			<div class="flex gap-2">
				{#each data.relations.filter((r) => r.relation === 'spouse') as rel (rel.id)}
					<a
						href={resolve(`/people/${rel.id}`)}
						class="w-xs rounded-sm bg-[#f2d7a5] p-2 text-sm text-[#241802]">{rel.fullName}</a
					>
				{/each}
			</div>
		</div>
	{/if}

	{#if data.relations.find((r) => (r.relation === 'mother' || r.relation === 'father') && r.person2Id === data.person.id)}
		<div class="mt-10">
			<h2 class="mb-2 text-xl text-[#241802]">Children</h2>
			<div class="flex gap-2">
				{#each data.relations.filter((r) => (r.relation === 'mother' || r.relation === 'father') && r.person2Id === data.person.id) as rel (rel.id)}
					<a
						href={resolve(`/people/${rel.id}`)}
						class="w-xs rounded-sm bg-[#f2d7a5] p-2 text-sm text-[#241802]">{rel.fullName}</a
					>
				{/each}
			</div>
		</div>
	{/if}

	{#if data.isAdmin}
		<div class="mt-10">
			<a
				href={resolve(`/people/${data.person.id}/add-relation`)}
				class="bg-[#241802] px-4 py-2 text-[#ffecc9] inset-ring-3 inset-ring-[#9c6d17]"
				>Add relation</a
			>
		</div>
	{/if}
</div>
