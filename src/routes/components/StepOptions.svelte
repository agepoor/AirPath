<script>
	import { currentDecisionTree, currentStep, highlightedStep } from '$lib/stores';

	export let step;
	let highlightStep = (event) => {
		let stepId = event.target.innerText;
		let step = $currentDecisionTree.steps.find((step) => step.id === stepId);
		console.log(step);
		highlightedStep.set(step);
		console.log($highlightedStep);
	};
	let deHighLightStep = () => {
		highlightedStep.set(null);
		console.log($highlightedStep);
	};
</script>

{#if $highlightedStep && step.id === $highlightedStep.id}
	<span class="step-id-highlighted">{step.id}</span>
{:else}
	<span class="step-id">{step.id}</span>
{/if}

{#if step.options}
	<div class="options">
		{#each step.options as option}
			<div class="option-value">{option.value}</div>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="option-next" on:mouseenter={highlightStep} on:mouseleave={deHighLightStep}>
				{option.nextStep}
			</div>
		{/each}
	</div>
{:else}
	<div class="option-next" on:mouseenter={highlightStep} on:mouseleave={deHighLightStep}>
		{step.nextStep}
	</div>
{/if}

<style>
	.step-id {
		font-weight: bold;
		color: #333;
	}
	.step-id-highlighted {
		font-weight: bold;
		color: #d20a11;
	}
	.options {
		padding-left: 20px;
		margin-top: 8px;
	}

	.option-value,
	.option-next {
		padding: 5px 0;
		border: none;
		background-color: transparent;
		transition: color 0.2s ease;
	}

	.option-value:hover,
	.option-next:hover {
		color: #555;
	}

	.option-value {
		font-weight: normal;
		color: #4a4a4a;
	}

	.option-next {
		cursor: default;
		font-size: 0.8em;
		color: #6b6b6b;
		text-align: left;
	}
</style>
