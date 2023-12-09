<script>
	/* Svelte imports */
	import { get } from 'svelte/store';
	import { allDecisionTrees } from '$lib/stores';

	export let data;
	allDecisionTrees.set(data.props.decisionTrees);
	let trees = get(allDecisionTrees);
	console.log(trees);

	import Header from './components/Header.svelte';
	import DecisionTreeViewer from './components/DecisionTreeViewer.svelte';
	import Overview from './components/Overview.svelte';

	let showAside = false;

	function toggleAside() {
		showAside = !showAside;
	}
</script>

<body>
	<Header />
	<main class="main-container">
		<section>
			<DecisionTreeViewer />
		</section>
		<aside>
			<Overview />
		</aside>
	</main>
	<footer></footer>
</body>

<style>
	.main-container {
		display: flex;
		flex-direction: row;
	}
	section {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
	aside {
		display: flex;
		width: 300px;
		flex-direction: column;
		/* align-items: center; */
	}
	@media (max-width: 1200px) {
		aside {
			display: none;
		}
	}
</style>
