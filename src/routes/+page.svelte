<script>
	export let data;
	import Header from './Header.svelte';
	import DecisionTreeViewer from './DecisionTreeViewer.svelte';
	const decisionTree = data.props.decisionTrees;
	let selectedOption;
</script>

<body class="light-theme">
	<Header {decisionTree} />
	<DecisionTreeViewer />
</body>
