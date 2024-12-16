<script lang="ts">
	import { page } from '$app/stores';
	let data = $state($page.data.history);
	console.log(data);
	const coinHistory = $page.data.history.map((el) => el[1]);
	let j = $state(0);
	const coinLabel = $page.data.history.map(() => `hour: ${++j}`);

	console.log(coinHistory);

	import Chart from './Chart.svelte';

	const chartData = {
		labels: coinLabel,
		datasets: [
			{
				label: 'My First Dataset',
				data: coinHistory,
				fill: false,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(199, 199, 199, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(199, 199, 199, 1)'
				],
				borderWidth: 1
			}
		]
	};

	const chartOptions = {
		responsive: false,
		maintainAspectRatio: false,

		plugins: {
			legend: {
				position: 'top'
			},
			title: {
				display: true,
				text: 'Chart.js Bar Chart'
			}
		}
	};
</script>

<Chart type="line" {chartData} options={chartOptions} />
