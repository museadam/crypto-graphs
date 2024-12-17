<script>
	let placeholder = 'Select an option';
	let classList = '';
	let { symbol = $bindable(), symbols } = $props();
	$inspect(symbol);
	// let selectedOption;

	// onMount(() => {
	//   selectedOption = options.find(option => option.value === value) || null;
	// });

	function handleChange(event) {
		// symbol = event.target.value;
	}
</script>

<div class="flex">
	<select
		bind:value={symbol}
		class="
      block
      rounded-md
      border
      border-gray-300
      bg-white
      p-2.5
      text-sm
      font-medium
      text-gray-700
      placeholder-gray-400
      shadow-sm
      focus:border-indigo-500
      focus:ring-indigo-500"
	>
		{#each symbols as option}
			<option value={option.symbol}>{option.symbol}</option>
		{/each}
	</select>
</div>
