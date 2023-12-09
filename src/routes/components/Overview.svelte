<!-- Tree.svelte -->
<script>
	import StepOptions from './StepOptions.svelte';

	import { currentDecisionTree, currentStep, highlightedStep } from '$lib/stores';
</script>

{#if $currentDecisionTree && $currentDecisionTree.steps}
	{#each $currentDecisionTree.steps as step}
		{#if step.id === $currentStep.id}
			<div class="node highlight">
				<StepOptions {step} />
			</div>
		{:else if $highlightedStep && step.id === $highlightedStep.id}
			<div class="node highlightstep">
				<StepOptions {step} />
			</div>
		{:else}
			<div class="node">
				<!-- display options and values -->
				<StepOptions {step} />
			</div>
		{/if}
	{/each}
{/if}

<style>
	.node {
		background-color: transparent;
		border-left: 5px solid #d1d1d1;
		padding: 10px 15px;
		margin: 5px 0;
		transition: border-color 0.2s ease;
		font-family: 'Arial', sans-serif;
		color: #333;
		text-align: left;
	}

	.node.highlight {
		border-left-color: #d20a11;
	}

	.node.highlightstep {
		border-left-color: #333;
	}
</style>
