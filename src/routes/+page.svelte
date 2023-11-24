<script>
	/* Svelte imports */
	import { get } from 'svelte/store';
	import { allDecisionTrees } from '$lib/stores';

	export let data;
	allDecisionTrees.set(data.props.decisionTrees);
	let trees = get(allDecisionTrees);
	console.log(trees);

	/* This makes the data available to the component */
	// let trees = decisionTrees;

	/* Import stores */
	// import { decisionTreeState, resetDecisionTree, nextStep } from '$lib/stores';
	import Header from './Header.svelte';
	import DecisionTreeViewer from './DecisionTreeViewer.svelte';

	// let breadcrumbs = [];
	// let currentNode = decisionTrees[0].steps[0];

	/* Header */
	// let newDecisionTree = (event) => {
	// 	const selectedTitle = event.target.value;
	// 	const selectedTreeData = decisionTrees.find((tree) => tree.title === selectedTitle);

	// 	if (selectedTreeData) {
	// 		resetDecisionTree(selectedTreeData);
	// 	} else {
	// 		console.error('Selected decision tree data not found');
	// 	}

	// 	currentNode = selectedTreeData.steps[0];
	// };

	/* When button is clicked, this checks node type, checks value (if type is not start or input), gets next step from current decision tree and updates */
	// let decisionHandler = (event) => {
	// 	const buttonValue = event.target.innerText;
	// 	const currentNodeType = currentNode.type;
	// 	const currentTreeData = get(decisionTreeState).decisionTree;

	// 	if (currentNodeType === 'decision') {
	// 		currentNode = currentTreeData.steps.find(
	// 			(step) =>
	// 				step.id === currentNode.options.find((option) => option.value === buttonValue).nextStep
	// 		);
	// 	} else if (currentNodeType === 'action' || currentNodeType === 'start') {
	// 		currentNode = currentTreeData.steps.find((step) => step.id === currentNode.nextStep);
	// 	} else if (currentNodeType === 'input') {
	// 	}

	// 	console.log(currentNode);
	// 	console.log(get(decisionTreeState));
	// };

	/* This can be deleted when the component is finished */
	// console.log(decisionTrees);
	// console.log(get(decisionTreeState));
	// console.log(get(decisionTreeState).stepHistory);
	// console.log(currentNode);
</script>

<body class="light-theme">
	<!-- <Header {trees} {newDecisionTree} /> -->
	<Header />
	<!-- <DecisionTreeViewer {currentNode} {decisionHandler} /> -->
	<DecisionTreeViewer />
</body>
