<script>
	import { resolve } from '$app/paths';
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
	<h1 class="mt-10 text-5xl text-[#241802]">Add person</h1>

	<form method="POST" action="/people/add" class="mt-10 flex w-md flex-col gap-6">
		<div class="flex w-full flex-col gap-2">
			<label for="fullname">Full Name</label>
			<input
				required
				name="fullname"
				id="fullname"
				type="text"
				class="inset-shadow-md h-[40px] w-full border-0 bg-[#ffecc9] text-sm inset-ring-3 inset-ring-[#9c6d17] focus-visible:ring-0 focus-visible:outline-none"
			/>
		</div>

		<div class="flex w-full flex-col gap-2">
			<label for="birthdate">Birthdate</label>
			<input
				name="birthdate"
				id="birthdate"
				type="date"
				class="inset-shadow-md h-[40px] w-full border-0 bg-[#ffecc9] text-sm inset-ring-3 inset-ring-[#9c6d17] focus-visible:ring-0 focus-visible:outline-none"
			/>
		</div>

		<div class="flex w-full flex-col gap-2">
			<label for="parent">Birth City</label>
			<input
				name="birthcity"
				id="birthcity"
				type="text"
				class="inset-shadow-md h-[40px] w-full border-0 bg-[#ffecc9] text-sm inset-ring-3 inset-ring-[#9c6d17] focus-visible:ring-0 focus-visible:outline-none"
			/>
		</div>

		<div class="flex w-full flex-col gap-2">
			<label for="parent">Birth Country</label>
			<input
				name="birthcountry"
				id="birthcountry"
				type="text"
				class="inset-shadow-md h-[40px] w-full border-0 bg-[#ffecc9] text-sm inset-ring-3 inset-ring-[#9c6d17] focus-visible:ring-0 focus-visible:outline-none"
			/>
		</div>

		<div>
			<button class="bg-[#241802] px-4 py-2 text-[#ffecc9] inset-ring-3 inset-ring-[#9c6d17]">
				Submit
			</button>
		</div>
	</form>
</div>
