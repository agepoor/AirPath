<script>
	import { decisionTreeState, addBreadcrumb } from '$lib/stores';

	let state;
	let currentStep;

	decisionTreeState.subscribe((value) => {
		state = value;
		if (state.selectedTree && state.currentStepId) {
			currentStep = state.selectedTree.steps.find((step) => step.id === state.currentStepId);
		}
	});

	function handleDecision(option) {
		// Call this function when a decision is made
		addBreadcrumb(state.currentStepId, option);
		// ... rest of the decision handling logic ...
		console.log(state);
	}
</script>

<main>
	{#if currentStep}
		<div class="breadcrumbs">
			<!-- Breadcrumbs -->
		</div>
		<div class="current-step">
			{#if currentStep.type === 'start'}
				<p>{@html currentStep.description || 'Start of the process'}</p>
				<!-- Layout for start step -->
				<!-- Add specific UI for start here -->
			{:else if currentStep.type === 'decision'}
				<p>{@html currentStep.question || 'No question provided'}</p>
				<!-- Layout for decision step -->
				<!-- Add specific UI elements for decisions here -->
			{:else if currentStep.type === 'action'}
				<p>{@html currentStep.description || 'No description provided'}</p>
				<!-- Layout for action step -->
				<!-- Add specific UI elements for actions here -->
			{:else if currentStep.type === 'input'}
				<p>{@html currentStep.question || 'No input question provided'}</p>
				<!-- Layout for input step -->
				<!-- Add specific UI for input here -->
			{:else if currentStep.type === 'end'}
				<!-- This is the only type where there is no decision made -->
				<p>{@html currentStep.description || 'End of the process'}</p>
				<!-- Layout for end step -->
				<!-- Add specific UI for end here -->
			{:else}
				<p>Unrecognized step type</p>
			{/if}
		</div>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.breadcrumbs {
		display: flex;
		width: 600px;
		margin: 1rem auto;
		padding: 1rem;
	}
	.breadcrumbs span {
		/* Add styles for breadcrumbs */
		padding: 1rem 0.5rem;
	}
	.current-step {
		padding: 2rem;
		width: 600px;
		box-shadow: var(--shadow);
		/* Add styles for current step */
	}
	.current-step p {
		font-size: 1.2rem;
		font-weight: bold;
		text-align: center;
	}
</style>
