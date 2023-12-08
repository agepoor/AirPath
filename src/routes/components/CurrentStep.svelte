<script>
	import { inputValue } from '$lib/stores';

	export let currentNode;
	export let decisionHandler;
	export let currentDepartment;
</script>

{#if !currentNode.type}
	<h2 class="make-selection">Selecteer een beslisboom</h2>
{:else}
	<div class="current-step modal">
		<h2>
			{currentNode.description}{#if currentNode.department}*{/if}
		</h2>
		{#if currentNode.explanation}
			<div class="explanation"><p>{@html currentNode.explanation}</p></div>
		{/if}
		{#if currentNode.type === 'start'}
			<div class="options">
				<button on:click={decisionHandler}>Start</button>
			</div>
		{:else if currentNode.type === 'decision'}
			<div class="options">
				{#each currentNode.options as option}
					<button on:click={decisionHandler} value={option.nextStep}>{option.value}</button>
				{/each}
			</div>
		{:else if currentNode.type === 'input'}
			<div class="options">
				<input type="text" bind:value={$inputValue} />
				<button on:click={decisionHandler}>Ga verder</button>
			</div>
		{:else if currentNode.type === 'action'}
			<div class="options">
				<button on:click={decisionHandler}>Ga verder</button>
			</div>
		{:else if currentNode.type === 'end'}
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
	.make-selection {
		text-align: center;
		margin: 2rem 0;
	}

	/* TODO: Very subtle department styling */
	/* Style for the current step */
	.current-step {
		/* existing styles */
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
		border-left: 4px solid #2193b0; /* Left border for emphasis */
		box-shadow: var(--shadow); /* Soft shadow */
		border-radius: 4px; /* Rounded corners */
	}

	:global(.current-step .explanation p) {
		margin: 0.5rem 0;
	}

	.current-step .options {
		display: flex;
		margin-top: 2rem;
		justify-content: center;
		flex-direction: row;
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
