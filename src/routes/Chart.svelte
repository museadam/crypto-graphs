<script>
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';

	let { type, chartData, options = {}, chart = $bindable() } = $props();

	let canvas = $state();

	onMount(() => {
		chart = new Chart(canvas, {
			type,
			data: chartData,
			options: {
				...options
			}
		});
		console.log(chart);

		// Cleanup chart instance when component is destroyed
		return () => chart.destroy();
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: 600px;
		height: 400px;
	}
</style>
