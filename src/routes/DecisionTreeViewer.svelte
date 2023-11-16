<script>
	import { decisionTreeState, addBreadcrumb } from '$lib/stores';

	let state;
	let currentStep;
	let userInput;

	decisionTreeState.subscribe((value) => {
		state = value;
		if (state.selectedTree && state.currentStepId) {
			currentStep = state.selectedTree.steps.find((step) => step.id === state.currentStepId);
		}
	});

	function handleDecision(option) {
		// Add breadcrumb for tracking
		addBreadcrumb(state.currentStepId, option);

		let nextStepId;

		switch (currentStep.type) {
			case 'start':
			case 'action':
				// For start and action steps, move to the next step directly
				nextStepId = currentStep.nextStep;
				break;

			case 'decision':
				// For decision and input steps, find the next step based on the user's choice
				nextStepId = currentStep.options.find((o) => o.value === option)?.nextStep;
				break;

			case 'input':
				nextStepId = currentStep.nextStep;

			default:
				console.error('Unrecognized step type');
				break;
		}

		// Update the state with the next step
		if (nextStepId) {
			decisionTreeState.update((state) => ({ ...state, currentStepId: nextStepId }));
		} else {
			console.error('Next step not found');
		}
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
				<div class="start-step">
					<p>{@html currentStep.description || 'Start of the process'}</p>
					<button on:click={() => handleDecision(null)}>Start</button>
				</div>
			{:else if currentStep.type === 'decision'}
				<div class="decision-step">
					<p>{@html currentStep.question || 'No question provided'}</p>
					{#each currentStep.options as option}
						<button on:click={() => handleDecision(option.value)}>{option.value}</button>
					{/each}
				</div>
			{:else if currentStep.type === 'action'}
				<div class="action-step">
					<p>{@html currentStep.description || 'No description provided'}</p>
					<button on:click={() => handleDecision(null)}>Continue</button>
				</div>
			{:else if currentStep.type === 'input'}
				<div class="input-step">
					<p>{@html currentStep.question || 'No input question provided'}</p>
					<input type="text" bind:value={userInput} />
					<button on:click={() => handleDecision(userInput)}>Submit</button>
				</div>
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
