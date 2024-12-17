<script lang="ts">
	import { page } from '$app/stores';
	import { binance, kLines } from './utils/binance-api';
	import Chart from './Chart.svelte';
	import DateFilter from './DateFilter.svelte';
	import SymbolSelect from './SymbolSelect.svelte';

	let selected = $state('1H');

	let data = $state($page.data.history);
	let price = $state($page.data.avg.price);
	let symbols = $state($page.data.symbols); //  $state($page.data.symbols.symbols.filter((el) => el.symbol.includes('USD')));

	// $inspect($page.data.symbols);
	let symbol = $state('BTCUSDT');
	let coinHistory = $derived(data.map((el) => el[1]));
	// let j = $state(0);
	let interval = $state('1m');
	let coinLabel = $derived(data.map((el, j) => '')); //$derived(data.map((el, j) => `${interval[1]}: ${j + 1}`));
	let chart = $state();
	// $inspect('chart', chart);
	function updateDate() {
		if (chart?.data) {
			// console.log(chart.data);

			chart.data = chartData;
			// chart.data.labels = coinLabel;

			chart.update();
			// console.log(chart.data);
		}
	}
	function removeDate() {
		if (chart?.data) {
			chart.data.datasets.pop();
			chart.update();
		}
	}
	// $inspect(coinHistory);
	// $inspect(coinHistory);

	// console.log(data);

	let startTime = $state(new Date());
	let limit = $state(60);
	function getStartDate(item: string) {
		const date = new Date();
		let ret = new Date();
		switch (item) {
			case '1h':
				startTime = new Date(date.getDate() - 24 * 60 * 7);
				limit = 60;
				interval = '1m';

				break;
			case '1d':
				startTime = new Date(date.getDate() - 24 * 60 * 7);
				limit = 24;
				interval = '1h';

				break;
			case '1w':
				startTime = new Date(date.getDate() - 24 * 60 * 7);
				limit = 7;

				break;
			case '1m':
				startTime = new Date(date.getDate() - 24 * 60 * 30);
				limit = 30;

				break;
			case '1y':
				startTime = new Date(date.getDate() - 24 * 60 * 365);
				limit = 365;
				break;
			case 'all':
				startTime = new Date(date.getDate() - 24 * 60 * 365);
				limit = 1000;
				interval = '1d';

				break;
		}
	}
	async function updateData(selected: string) {
		interval = '1h';
		if (interval !== selected) interval = '1d';

		const today = new Date();
		const yesterday = new Date(today);
		console.log('symbol ' + symbol);

		console.log('selected ' + selected);
		getStartDate(selected);

		const da = await binance(kLines(symbol, interval, startTime, limit));
		// console.log(da);
		data = [...da];
		// console.log(chart);

		removeDate();
		updateDate();
	}

	let chartData = $derived({
		labels: coinLabel,
		datasets: [
			{
				label: symbol,
				data: coinHistory,
				fill: true,
				pointRadius: 1,
				pointHoverRadius: 4,
				// backgroundColor: [
				// 	'rgba(255, 99, 132, 0.2)',
				// 	'rgba(54, 162, 235, 0.2)',
				// 	'rgba(255, 206, 86, 0.2)',
				// 	'rgba(75, 192, 192, 0.2)',
				// 	'rgba(153, 102, 255, 0.2)',
				// 	'rgba(255, 159, 64, 0.2)',
				// 	'rgba(199, 199, 199, 0.2)'
				// ],
				// borderColor: [
				// 	'rgba(255, 99, 132, 1)',
				// 	'rgba(54, 162, 235, 1)',
				// 	'rgba(255, 206, 86, 1)',
				// 	'rgba(75, 192, 192, 1)',
				// 	'rgba(153, 102, 255, 1)',
				// 	'rgba(255, 159, 64, 1)',
				// 	'rgba(199, 199, 199, 1)'
				// ],
				borderWidth: 1
			}
		]
	});
	// $inspect('chartData', chartData);
	// const afterDatasetsDraw = () => {
	// 	const { ctx } = chart;
	// 	const meta = chart.getDatasetMeta(0);
	// 	const data = chart.data.datasets[0].data;

	// 	// Find max and min values with their indices
	// 	const maxValue = Math.max(...data);
	// 	const minValue = Math.min(...data);
	// 	const maxIndex = data.indexOf(maxValue);
	// 	const minIndex = data.indexOf(minValue);

	// 	const maxElement = meta.data[maxIndex];
	// 	const minElement = meta.data[minIndex];

	// 	// Styling for labels
	// 	ctx.save();
	// 	ctx.font = '12px Arial';
	// 	ctx.textAlign = 'center';
	// 	ctx.fillStyle = 'black';

	// 	// Draw label for max value
	// 	if (maxElement) {
	// 		const { x, y } = maxElement.tooltipPosition();
	// 		ctx.fillText(`Max: ${maxValue}`, x, y - 10);
	// 	}

	// 	// Draw label for min value
	// 	if (minElement) {
	// 		const { x, y } = minElement.tooltipPosition();
	// 		ctx.fillText(`Min: ${minValue}`, x, y - 10);
	// 	}

	// 	ctx.restore();
	// };
	const chartOptions = {
		responsive: false,
		maintainAspectRatio: false,
		// elements: {
		// 	line: { tension: 0.5 }
		// }
		scales: {
			x: {
				display: false
			},
			y: {
				display: false
			}
		},
		plugins: {
			legend: {
				position: 'top'
				//         labels: {

				//         }
			},
			title: {
				display: true,
				text: `${price}`
			}
			// afterDatasetsDraw
		}
	};
</script>

<main class="container mx-auto p-4 text-center">
	<Chart type="line" {chartData} options={chartOptions} bind:chart />
	<DateFilter bind:this={selected} newDate={(selected) => updateData(selected)} />
	<SymbolSelect bind:symbol {symbols} />
</main>
