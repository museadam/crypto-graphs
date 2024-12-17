<script lang="ts">
	let { selected = $bindable('1H'), newDate } = $props();
	const buttons = ['1H', '1D', '1W', '1M', '1Y', 'All'];

	function selectButton(btn) {
		selected = btn;
		let item = selected.toLowerCase();
		newDate(item);
	}
</script>

<div class="content">
	<div class=" items-center space-x-4">
		{#each buttons as btn}
			<button
				class="font-medium text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-700"
				class:selected={selected === btn
					? 'text-blue-600 font-bold border-b-2 border-blue-600'
					: ''}
				onclick={() => selectButton(btn)}
			>
				{btn}
			</button>
		{/each}
	</div>
</div>

<style>
	button.selected {
		@apply border-b-2 border-blue-600 font-bold text-blue-600;
	}
	.content {
		align-content: center;
	}
</style>
