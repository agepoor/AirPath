<script>
	import { get } from 'svelte/store';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faCoffee } from '@fortawesome/free-solid-svg-icons';
	import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
	import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
	import { faBackwardFast } from '@fortawesome/free-solid-svg-icons';
	import {
		allDecisionTrees,
		currentDecisionTree,
		currentStep,
		stepHistory,
		currentVariables,
		inputValue
	} from '$lib/stores';

	let trees = get(allDecisionTrees);
	// Set new decision tree based on selected value, by updating the currentDecisionTree store
	let newDecisionTree = (event) => {
		const selectedTitle = event.target.value;
		const selectedTreeData = trees.find((tree) => tree.title === selectedTitle);

		if (selectedTreeData) {
			currentDecisionTree.set(selectedTreeData);
			currentStep.set(selectedTreeData.steps[0]);
			stepHistory.set([]);
			currentVariables.set(selectedTreeData.variables);
			console.log($currentVariables);
		} else {
			console.error('Selected decision tree data not found');
		}
	};
	let backwardStep = () => {
		/* get last step from stepHistory */
		if (get(stepHistory).length > 0) {
			let lastStep = get(stepHistory)[get(stepHistory).length - 1];
			/* check if last step had answer in stepHistory */
			// lastStep had answer then we want to set the input value to that answer
			if (lastStep.answer && lastStep.node.type === 'input') {
				inputValue.set(lastStep.answer);
				console.log('lastStep had answer');
				console.log(lastStep.answer);
			}

			/* set currentStep to lastStep */
			currentStep.set(lastStep.node);

			/* remove lastStep from stepHistory */
			stepHistory.update((history) => history.slice(0, -1));
		} else {
			console.log('No more steps to go back to');
		}
	};
	let backwardFast = () => {
		/* This should go back to the start of the decision tree */
		if (get(stepHistory).length > 0) {
			currentStep.set(get(currentDecisionTree).steps[0]);
			stepHistory.set([]);
		} else {
			console.log('No more steps to go back to');
		}
	};
</script>

<header>
	<select on:change={newDecisionTree}>
		<option disabled selected>Select a decision tree</option>
		{#each trees as tree}
			<option value={tree.title}>{tree.title}</option>
		{/each}
	</select>
	<div class="header-options">
		<button class="options-button" disabled><FontAwesomeIcon icon={faFloppyDisk} /></button>
		<button class="options-button" on:click={backwardStep}
			><FontAwesomeIcon icon={faBackwardStep} /></button
		>
		<button class="options-button" on:click={backwardFast}
			><FontAwesomeIcon icon={faBackwardFast} /></button
		>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		margin-bottom: 2rem;
		box-shadow: var(--shadow);
	}
	select {
		border: 0.05rem solid var(--light-border);
		background-color: var(--light-background);
		color: var(--light-text);
		border-radius: var(--border-radius);
	}
	select,
	button {
		padding: 0.75rem 1rem;
	}
	.header-options {
		display: flex;
	}
	.options-button {
		background: var(--light-button);
		cursor: pointer;
		border: 0px solid transparent;
		margin-left: 1rem;
		border-radius: 50%;
	}
	.options-button:hover {
		background: var(--light-button-hover);
	}
	/* disabled */
	.options-button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
