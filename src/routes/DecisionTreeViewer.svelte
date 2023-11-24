<script>
	/* example decision treee */
	// 	{
	//   "title": "Pricing and Transportation Costs Decision Tree",
	//   "description": "This decision tree guides employees through pricing and transportation costs for different order types.",
	//   "steps": [
	//     {
	//       "id": "root",
	//       "type": "start",
	//       "description": "Start the decision process for determining pricing and transportation costs.",
	//       "nextStep": "identify_client_type"
	//     },
	//     {
	//       "id": "identify_client_type",
	//       "type": "decision",
	//       "description": "What is the type of the client?",
	//       "options": [
	//         {
	//           "value": "Online Kunden Profishop, Schaffelhuber",
	//           "nextStep": "online_kunden_profishop_schaffelhuber"
	//         },
	//         {
	//           "value": "Händler-Bestellungen vom Außendienst",
	//           "nextStep": "haendler_bestellungen_vom_aussendienst"
	//         },
	//         {
	//           "value": "Österreich und die Schweiz",
	//           "nextStep": "end_viktoria"
	//         },
	//         {
	//           "value": "Sonderkunden mit Sonderpreisen",
	//           "nextStep": "sonderkunden_mit_sonderpreisen"
	//         }
	//       ]
	//     },
	//     {
	//       "id": "online_kunden_profishop_schaffelhuber",
	//       "type": "action",
	//       "description": "Use the first price list and consider 'Ek bei 1200 €' column. Freight costs: €10 for packages, €59 for pallets. Check weight in product card or previous orders.",
	//       "nextStep": "end"
	//     },
	//     {
	//       "id": "haendler_bestellungen_vom_aussendienst",
	//       "type": "decision",
	//       "description": "Are action items ordered?",
	//       "options": [
	//         {
	//           "value": "Yes",
	//           "nextStep": "action_items_ordered"
	//         },
	//         {
	//           "value": "No",
	//           "nextStep": "standard_pricing"
	//         }
	//       ]
	//     },
	//     {
	//       "id": "action_items_ordered",
	//       "type": "action",
	//       "description": "Use prices from the action PDF. If order value is over €1200, apply 10% discount on standard items. Freight costs: Free for orders over €750, otherwise €20 for a package and €79 for a pallet. Check weight in product card or previous orders.",
	//       "nextStep": "end"
	//     },
	//     {
	//       "id": "standard_pricing",
	//       "type": "action",
	//       "description": "Use the second price list (customers DE 230304) and the 'EK Preis' column. For mixed orders with action items, note: No 10% discount on standard items for orders reaching €1200.",
	//       "nextStep": "end"
	//     },
	//     {
	//       "id": "sonderkunden_mit_sonderpreisen",
	//       "type": "action",
	//       "description": "Verify unknown customers or provide order numbers for review before processing.",
	//       "nextStep": "end_viktoria"
	//     },
	//     {
	//       "id": "end_viktoria",
	//       "type": "end",
	//       "description": "This order is handled by Viktoria."
	//     },
	//     {
	//       "id": "end",
	//       "type": "end",
	//       "description": "This is the end of the decision tree process."
	//     }
	//   ]
	// }

	import { get } from 'svelte/store';
	import { currentDecisionTree, currentStep, stepHistory } from '$lib/stores';
	let tree;
	currentDecisionTree.subscribe((value) => (tree = value));
	let currentNode;
	currentStep.subscribe((value) => (currentNode = value));
	let breadcrumbs;
	stepHistory.subscribe((value) => (breadcrumbs = value));
	let inputVariable;

	// The decision handler function
	let decisionHandler = (event) => {
		let buttonValue = event.target.value;
		let input = inputVariable;
		let answer = event.target.innerText;

		// Update stephistory with current node and answer
		// stepHistory.update((value) => [...value, { node: currentNode, answer: answer }]);
		stepHistory.update((value) => {
			let newHistory;
			if (currentNode.type === 'input') {
				newHistory = [...value, { node: currentNode, answer: input }];
			} else {
				newHistory = [...value, { node: currentNode, answer: answer }];
			}
			return newHistory;
		});

		// Switch statement to determine next step
		switch (currentNode.type) {
			case 'start':
				currentStep.set(tree.steps.find((step) => step.id === currentNode.nextStep));
				break;
			case 'decision':
				currentStep.set(tree.steps.find((step) => step.id === buttonValue));
				break;
			case 'input':
				currentStep.set(tree.steps.find((step) => step.id === currentNode.nextStep));
				break;
			case 'action':
				currentStep.set(tree.steps.find((step) => step.id === currentNode.nextStep));
				break;
			case 'end':
				currentStep.set(tree.steps.find((step) => step.id === currentNode.nextStep));
				break;
			default:
				break;
		}

		console.log(get(stepHistory));
	};
</script>

<main>
	<div class="breadcrumbs">
		<!-- TODO: Implement breadcrumbs logic-->
	</div>
	{#if !currentNode}
		<h2 class="make-selection">Selecteer een beslisboom</h2>
	{:else}
		<div class="current-step">
			<h2>{currentNode.description}</h2>
			{#if currentNode.explanation}
				<div class="explanation">{currentNode.explanation}</div>
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
					<input type="text" bind:value={inputVariable} />
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
		</div>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	/* Breadcrumbs styles */
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

	.breadcrumb-wrapper span:hover {
		background-color: #d4d4d4; /* Slightly darker on hover */
		color: #333;
	}

	.breadcrumb-wrapper span.answer {
		border-radius: 0px 5px 5px 0px;
		box-shadow: inset 0 0 0 2px #e6e6e6;
		/* margin-left: 0.15rem; */
		background: #f4f4f4; /* Blue background for answers */
		color: #222222;
	}

	.breadcrumb-wrapper span.variable {
		cursor: pointer;
		background: #ffff006c;
		box-shadow: inset 0 0 0 2px #ffeb3b;
		border-radius: 0px 5px 5px 0px;
		/* margin-left: 0.15rem; */
		/* font-style: italic; Styling for variable inputs */
	}
	.breadcrumb-wrapper span.variable:hover {
		background: #ffff50;
	}

	.breadcrumb-wrapper span.start {
		border-radius: 15px 5px 5px 15px;
		margin-left: 0;
	}

	.breadcrumb-wrapper span.end {
		border-radius: 5px 15px 15px 5px;
		margin-left: 0.15rem;
	}

	.make-selection {
		text-align: center;
		margin: 2rem 0;
	}

	.current-step {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		width: 700px;
		box-shadow: var(--shadow);
		/* Add styles for current step */
	}
	.current-step h2 {
		text-align: center;
		margin-bottom: 1rem;
	}
	.current-step .explanation {
		background: #f9f9f9; /* Subtle background color */
		color: #555; /* Dark gray color for text */
		font-size: 0.9rem; /* Slightly smaller font size */
		padding: 1rem; /* Adequate padding */
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
		background: #f0f0f0; /* Subtle solid background */
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
		background: #e8e8e8; /* Slight change in background on hover */
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
