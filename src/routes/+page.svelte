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
	import Overview from './components/overview/Overview.svelte';

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
	body {
		position: relative;
		z-index: 1;
		font-family: var(--font);
	}

	body::before {
		content: '';
		position: absolute;
		min-height: 100vh;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		/* background-image: url('$lib/images/background.webp'); */
		background:grey;
		background-size: contain;
		filter: opacity(5%);
	}

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
		margin-bottom: 2rem;
	}
	aside {
		display: flex;
		width: 400px;
		flex-direction: column;
		/* align-items: center; */
	}
	@media (max-width: 1200px) {
		aside {
			display: none;
		}
	}
</style>
