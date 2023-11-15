<script>
	import { decisionTreeState } from '$lib/stores';

	let state;
	let currentStep;

	decisionTreeState.subscribe((value) => {
		state = value;
		if (state.selectedTree && state.currentStepId) {
			currentStep = state.selectedTree.steps.find((step) => step.id === state.currentStepId);
		}
	});
</script>

<main>
	{#if currentStep}
		<div class="breadcrumbs">
			<span> Broodkruim 1 </span><span> Broodkruim 2 </span>
			<!-- Dummy Content -->
			{#each state.breadcrumbs as breadcrumb}
				<span>{breadcrumb} Broodkruim 1 > Broodkruim 2 </span>
			{/each}
		</div>
		<div class="current-step">
			{#if currentStep.type === 'start'}
				<p>{currentStep.description || 'Start of the process'}</p>
				<!-- Layout for start step -->
			{:else if currentStep.type === 'decision'}
				<p>{currentStep.question || 'No question provided'}</p>
				<!-- Layout for decision step -->
				<!-- Add UI elements for options here -->
			{:else if currentStep.type === 'action'}
				<p>{currentStep.description || 'No description provided'}</p>
				<!-- Layout for action step -->
			{:else if currentStep.type === 'input'}
				<p>{currentStep.question || 'No input question provided'}</p>
				<!-- Layout for input step -->
				<!-- Add UI for input here -->
			{:else if currentStep.type === 'end'}
				<p>{currentStep.description || 'End of the process'}</p>
				<!-- Layout for end step -->
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
