<script>
	import { get } from 'svelte/store';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faCoffee } from '@fortawesome/free-solid-svg-icons';
	import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
	import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
	import { faBackwardFast } from '@fortawesome/free-solid-svg-icons';
	import { allDecisionTrees, currentDecisionTree, currentStep, stepHistory } from '$lib/stores';

	let trees = get(allDecisionTrees);
	// Set new decision tree based on selected value, by updating the currentDecisionTree store
	let newDecisionTree = (event) => {
		const selectedTitle = event.target.value;
		const selectedTreeData = trees.find((tree) => tree.title === selectedTitle);

		if (selectedTreeData) {
			currentDecisionTree.set(selectedTreeData);
			currentStep.set(selectedTreeData.steps[0]);
			stepHistory.set([]);
		} else {
			console.error('Selected decision tree data not found');
		}
	};
</script>

<header>
	<select on:change={newDecisionTree}>
		{#each trees as tree}
			<option value={tree.title}>{tree.title}</option>
		{/each}
	</select>
	<div class="header-options">
		<button class="options-button"><FontAwesomeIcon icon={faFloppyDisk} /></button>
		<button class="options-button"><FontAwesomeIcon icon={faBackwardStep} /></button>
		<button class="options-button"><FontAwesomeIcon icon={faBackwardFast} /></button>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		box-shadow: var(--shadow);
	}
	select,
	button {
		padding: 0.75rem 1rem;
	}
	.header-options {
		display: flex;
	}
	.options-button {
		cursor: pointer;
		border: 0px solid transparent;
		margin-left: 1rem;
		border-radius: 50%;
	}
</style>
