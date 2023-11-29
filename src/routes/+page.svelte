<script>
	/* Svelte imports */
	import { get } from 'svelte/store';
	import { allDecisionTrees } from '$lib/stores';

	export let data;
	allDecisionTrees.set(data.props.decisionTrees);
	let trees = get(allDecisionTrees);
	console.log(trees);

	import Header from './Header.svelte';
	import DecisionTreeViewer from './DecisionTreeViewer.svelte';
</script>

<body class="light-theme">
	<Header />
	<DecisionTreeViewer />
</body>
