<script>
	export let breadcrumbs;
	export let currentNode;

	function horizontalScroll(node) {
		function handleWheel(event) {
			if (event.deltaY != 0) {
				event.preventDefault();
				node.scrollLeft += event.deltaY;
			}
		}

		node.addEventListener('wheel', handleWheel);

		return {
			destroy() {
				node.removeEventListener('wheel', handleWheel);
			}
		};
	}
</script>

{#if breadcrumbs.length > 0}
	<div class="breadcrumbs" use:horizontalScroll>
		{#each breadcrumbs as breadcrumb, i}
			<div class="breadcrumb-wrapper">
				{#if breadcrumb.node.type === 'start'}
					<span class="start">Start</span>
				{:else if breadcrumb.node.type === 'end'}
					<span class="end">End</span>
				{:else if breadcrumb.node.type === 'decision'}
					<span><em>{i}</em>. {breadcrumb.node.description}</span>
					<span class="answer">{breadcrumb.answer}</span>
				{:else if breadcrumb.node.type === 'input'}
					<span><em>{i}</em>. {breadcrumb.node.description}</span>
					{#if breadcrumb.answer}
						<span class="variable">{breadcrumb.answer}</span>
					{:else}
						<span class="variable">...</span>
					{/if}
				{:else if breadcrumb.node.type === 'action'}
					<span><em>{i}</em>. {breadcrumb.node.description}</span>
					<span class="answer">✔</span>
				{/if}
			</div>
		{/each}
		{#if currentNode.type === 'end'}
			<div class="breadcrumb-wrapper">
				<span class="end">End</span>
			</div>
		{/if}
	</div>
{/if}

<style>
	.breadcrumbs {
		display: flex;
		overflow-x: auto;
		align-items: center;
		margin-top: 1rem;
		padding: 0.5rem;
		gap: 0.5rem;
		background: #f7f7f7; /* Light background for the breadcrumb container */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		margin-bottom: 1rem;
		width: 700px; /* Match the width of the current-step element */
	}

	.breadcrumb-wrapper {
		display: flex;
		align-items: center;
	}
	.breadcrumb-wrapper span {
		white-space: nowrap;
		padding: 0.5rem 1rem;
		font-size: 0.85rem;
		background: #e6e6e6; /* Subtle background for each breadcrumb */
		color: #666;
		border-radius: 5px 0px 0px 5px;
		transition:
			background-color 0.3s,
			color 0.3s;
	}

	.breadcrumb-wrapper span em {
		font-style: normal;
		color: #333;
	}

	.breadcrumb-wrapper span.answer {
		border-radius: 0px 5px 5px 0px;
		box-shadow: inset 0 0 0 2px #e6e6e6;
		/* margin-left: 0.15rem; */
		background: #eee;
		color: #222222;
	}

	.breadcrumb-wrapper span.variable {
		cursor: pointer;
		background: #ffffb46c;
		/* box-shadow: inset 0 0 0 2px #ffeb3b; */
		box-shadow: inset 0 0 0 2px #e6e6e6;
		border-radius: 0px 5px 5px 0px;
		/* margin-left: 0.15rem; */
		/* font-style: italic; Styling for variable inputs */
	}
	.breadcrumb-wrapper span.variable:hover {
		background: #ffff50;
	}

	.breadcrumb-wrapper span.start {
		/* background: rgb(182, 255, 185); */
		background: none;
		border-radius: 15px 5px 5px 15px;
		margin-left: 0;
	}

	.breadcrumb-wrapper span.end {
		/* background: rgb(255, 182, 182); */
		background: none;
		border-radius: 5px 15px 15px 5px;
		margin-left: 0.15rem;
	}
</style>
