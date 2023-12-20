<script>
	import { inputValue, stepHistory, currentDecisionTree, currentStep } from '$lib/stores';

	export let decisionHandler;
	export let currentDepartment;

	// Initialize progress values
	let progressLength;
	let progressValue;


	stepHistory.subscribe((value) => {
		if ($currentStep.type !== 'end') {
			progressValue = value.length;
		} else if (value.length === 0) {
			progressValue = 0;
		} else {
			progressValue = currentDecisionTree.steps.length;
		}
		console.log(progressValue);
	});

	currentStep.subscribe((value) => {
		if ($currentDecisionTree.steps && value.type !== 'end') {
			progressLength = $currentDecisionTree.steps.length;
			console.log(progressLength);
		} else {
			progressLength = progressValue;
		}
		console.log(progressLength);
	});

	// Reactive statement to enable/disable button
	$: isInputValid = $inputValue.trim().length > 0;

	// Reactive statement to enable/disable button
	$: isInputValid = $inputValue.trim().length > 0;
</script>

{#if !$currentStep.type}
	<h2 class="make-selection">Selecteer een beslisboom</h2>
{:else}
	<div class="current-step modal">
		<div class="progress-wrapper">
			<progress value={progressValue} max={progressLength} class="progress-bar"></progress>
		</div>
		<h2>
			{$currentStep.description}{#if $currentStep.department}*{/if}
		</h2>
		{#if $currentStep.explanation}
			<div class="explanation"><p>{@html $currentStep.explanation}</p></div>
		{/if}
		{#if $currentStep.type === 'start'}
			<div class="options">
				<button on:click={decisionHandler}>Start</button>
			</div>
		{:else if $currentStep.type === 'decision'}
			<div class="options">
				{#each $currentStep.options as option}
					<button on:click={decisionHandler} value={option.nextStep}>{option.value}</button>
				{/each}
			</div>
		{:else if $currentStep.type === 'input'}
			<div class="options">
				<input type="text" bind:value={$inputValue} class="input" placeholder="Type here..." />
				<button on:click={decisionHandler} disabled={!isInputValid} id="input-button"
					>Ga verder</button
				>
			</div>
		{:else if $currentStep.type === 'action'}
			<div class="options">
				<button on:click={decisionHandler}>Ga verder</button>
			</div>
		{:else if $currentStep.type === 'end'}
			<hr />
			<h2>End of decision tree</h2>
		{/if}
		{#if currentDepartment}
			<div class="department-info">
				<p>
					<em>*Handled by department:</em> <strong>{currentDepartment.name}</strong> - {currentDepartment.description}
				</p>
			</div>
		{/if}
	</div>
{/if}

<style>
	/* Progress Wrapper */
	.progress-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 2rem;
	}

	/* Progress Bar */
	.progress-bar {
		appearance: none; /* Remove default browser appearance */
		width: 100%;
		height: 6px; /* Thinner bar for a more subtle appearance */
		border-radius: 3px; /* Small radius for a slight curve */
		background-color: #f0f0f0; /* Very light background color */
		border: none; /* No border for simplicity */
		overflow: hidden; /* Keeps the inner bar within the border-radius */
	}

	/* Progress Bar Value */
	.progress-bar::-webkit-progress-value {
		background-color: #d20a11; /* Soft blue/gray color */
		border-radius: 3px; /* Maintain the rounded corners */
		transition: width 0.5s ease; /* Smooth transition for changes */
	}

	.progress-bar::-moz-progress-bar {
		background-color: #d20a11; /* Soft blue/gray color (for Firefox) */
		border-radius: 3px; /* Maintain the rounded corners */
	}

	.make-selection {
		text-align: center;
		margin: 2rem 0;
	}

	/* TODO: Very subtle department styling */
	/* Style for the current step */
	.current-step {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		width: 700px;
		background: #fff;
		margin-bottom: 2rem; /* add a bit of margin at the bottom */
	}

	/* Style for the department information within the current step */
	.department-info {
		margin-top: 2rem; /* Spacing from the main content */
		padding-top: 0.5rem; /* Padding from the preceding text */
		border-top: 1px solid #ddd; /* Dashed line for a subtle separation */
		font-size: 0.85rem; /* Slightly smaller font size */
		color: #666; /* Soft color for the text */
	}

	.department-info em {
		font-style: italic; /* Italicize 'Handled by department' for emphasis */
		margin-right: 0.25rem; /* Space after the label */
		color: #666; /* Matching color for a cohesive look */
	}

	.department-info strong {
		font-weight: bold; /* Bold for the department name */
		color: #333; /* Slightly darker for emphasis */
	}

	.current-step {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		width: 700px;
	}
	.current-step h2 {
		text-align: center;
		margin-bottom: 1rem;
	}
	.current-step .explanation {
		background: var(--light-info-background); /* Subtle background color */
		color: #555; /* Dark gray color for text */
		/* font-size: 0.9rem; Slightly smaller font size */
		padding: 1rem 2rem; /* Adequate padding */
		margin-top: 1rem; /* Margin to separate from question */
		border-left: 4px solid #d20a11; /* Left border for emphasis */
		box-shadow: var(--shadow); /* Soft shadow */
		border-radius: 4px; /* Rounded corners */
	}

	:global(.current-step .explanation p) {
		margin: 0.5rem 0;
	}

	:global(.current-step .explanation table) {
		font-size: 0.9rem; /* Slightly smaller font size */
		width: 100%;
		border-collapse: collapse;
	}

	:global(.current-step .explanation table th),
	:global(.current-step .explanation table td) {
		padding: 0.8rem; /* Ample padding for readability */
		border-bottom: 1px solid #e0e0e0; /* Subtle border for each cell */
		text-align: left; /* Aligns text to the left */
		color: #666; /* Soft color for the text */
	}

	:global(.current-step .explanation table th) {
		background-color: #f8f8f8; /* Light background for headers */
		text-transform: capitalize; /* Capitalized header text */
		font-weight: 600; /* Slightly bolder than data cells */
	}

	:global(.current-step .explanation table tr:hover) {
		background-color: #f0f0f0; /* Gentle hover effect */
	}

	:global(.current-step .explanation img) {
		margin: 1rem 0;
		max-width: 100%;
	}

	.current-step .options {
		display: flex;
		margin-top: 2rem;
		justify-content: center;
		flex-direction: row;
	}

	.current-step .options .input {
		border: 1px solid #ddd; /* Subtle border */
		border-radius: 4px; /* Slightly rounded corners */
		padding: 0.8rem 1rem; /* Adjusted padding */
		margin: 0 0.5rem; /* Spacing between input and button */
	}

	.current-step .options button {
		background: var(--light-button); /* Subtle solid background */
		cursor: pointer;
		margin: 0 0.5rem;
		padding: 0.8rem 1.5rem; /* Adjusted padding */
		border: 1px solid #ddd; /* Subtle border */
		border-radius: 4px; /* Slightly rounded corners */
		color: #333; /* Subtle text color */
		font-weight: 500; /* Less bold font */
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
		transition:
			background-color 0.2s ease,
			box-shadow 0.2s ease; /* Smooth transitions */
	}

	#input-button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.current-step .options button:hover {
		background: var(--light-button-hover); /* Slight change in background on hover */
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15); /* Slightly more pronounced shadow on hover */
	}

	.current-step hr {
		/* Styling that signifies the end of the decision tree. This should be a cool animation. */
		width: 100%;
		height: 2px;
		background: #2193b0;
		border: none;
		margin: 2rem 0;
	}
</style>
