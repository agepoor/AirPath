<script>
	// import { get } from 'svelte/store';
	import {
		currentDecisionTree,
		currentStep,
		stepHistory,
		currentDepartment,
		inputValue,
		currentVariables
	} from '$lib/stores';

	// import components
	import Breadcrumbs from './Breadcrumbs.svelte';
	import CurrentStep from './CurrentStep.svelte';
	import Notes from './Notes.svelte';
	import Memos from './Memos.svelte';

	// import stores
	let tree, currentNode, breadcrumbs;
	currentDecisionTree.subscribe((value) => (tree = value));
	currentStep.subscribe((value) => (currentNode = value));
	stepHistory.subscribe((value) => (breadcrumbs = value));

	// The decision handler function
	let decisionHandler = (event) => {
		let buttonValue = event.target.value;
		let answer = event.target.innerText;

		// If the current node is an input node, update the current variables
		if (currentNode.type === 'input') {
			currentVariables.update((value) => {
				let newVariables = { ...value };
				newVariables[currentNode.variable].value = $inputValue;
				return newVariables;
			});
			console.log($currentVariables);
		}

		// Update stephistory with current node and answer
		stepHistory.update((value) => {
			let newHistory;
			if (currentNode.type === 'input') {
				newHistory = [...value, { node: currentNode, answer: $inputValue }];
			} else {
				newHistory = [...value, { node: currentNode, answer: answer }];
			}
			return newHistory;
		});

		// Switch statement to determine next step
		switch (currentNode.type) {
			case 'start':
				currentStep.set(tree.steps.find((step) => step.id === currentNode.nextStep));
				break;
			case 'decision':
				currentStep.set(tree.steps.find((step) => step.id === buttonValue));
				break;
			case 'input':
				currentStep.set(tree.steps.find((step) => step.id === currentNode.nextStep));
				break;
			case 'action':
				currentStep.set(tree.steps.find((step) => step.id === currentNode.nextStep));
				break;
			case 'end':
				currentStep.set(tree.steps.find((step) => step.id === currentNode.nextStep));
				break;
			default:
				break;
		}

		// Reset input value
		console.log($inputValue);
		inputValue.set('');
		console.log($inputValue);
		console.log($currentStep);
	};
</script>

<Breadcrumbs {breadcrumbs} {currentNode} />
<CurrentStep {currentNode} {decisionHandler} currentDepartment={$currentDepartment} />
<Memos />
<Notes />
