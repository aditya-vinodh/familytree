<script>
	import { resolve } from '$app/paths';
</script>

<div class="overflow-none h-screen w-screen bg-[#ffecc9] p-5">
	<h1 class="text-5xl text-[#241802]">Add person</h1>

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
