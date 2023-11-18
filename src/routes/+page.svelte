<script>
	/* Svelte imports */
	import { get } from 'svelte/store';

	/* This makes the data available to the component */
	export let data;
	const decisionTree = data.props.decisionTrees;

	/* Import stores */
	import { decisionTreeState, updateDecisionTree } from '$lib/stores';

	/* Header */
	import Header from './Header.svelte';
	let trees = decisionTree;
	let newDecisionTree = (event) => {
		updateDecisionTree(event.target.value);
	};

	/* Decision tree viewer */
	import DecisionTreeViewer from './DecisionTreeViewer.svelte';

	/* This can be deleted when the component is finished */
	console.log(decisionTree);
	console.log(get(decisionTreeState));
</script>

<body class="light-theme">
	<Header {trees} {newDecisionTree} />
	<DecisionTreeViewer />
</body>
