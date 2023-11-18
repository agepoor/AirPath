<script>
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faCoffee } from '@fortawesome/free-solid-svg-icons';
	import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
	import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
	import { faBackwardFast } from '@fortawesome/free-solid-svg-icons';

	export let trees;
	export let newDecisionTree;
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
