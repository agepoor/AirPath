<script>
	/* example decision treee */
	// 	{
	//   "title": "Pricing and Transportation Costs Decision Tree",
	//   "description": "This decision tree guides employees through pricing and transportation costs for different order types.",
	//   "departments": {
	//     "customer_service": {
	//       "name": "Customer Service",
	//       "description": "Customer service is responsible for handling orders from customers."
	// },
	//     "technical_support": "Technische Ondersteuning",
	//     "shipping_department": "Verzendafdeling",
	//     "accounting": "Boekhouding"
	//   },
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
	// "department": "customer_service",
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

	// import { get } from 'svelte/store';
	import {
		currentDecisionTree,
		currentStep,
		stepHistory,
		currentDepartment,
		inputValue,
		currentVariables
	} from '$lib/stores';

	// import components
	import Breadcrumbs from './Breadcrumbs.svelte';
	import CurrentStep from './CurrentStep.svelte';

	// import stores
	let tree, currentNode, breadcrumbs;
	currentDecisionTree.subscribe((value) => (tree = value));
	currentStep.subscribe((value) => (currentNode = value));
	stepHistory.subscribe((value) => (breadcrumbs = value));

	// The decision handler function
	let decisionHandler = (event) => {
		let buttonValue = event.target.value;
		let answer = event.target.innerText;

		// If the current node is an input node, update the current variables
		if (currentNode.type === 'input') {
			currentVariables.update((value) => {
				let newVariables = { ...value, [currentNode.variable]: $inputValue };
				return newVariables;
			});
		}

		// Update stephistory with current node and answer
		stepHistory.update((value) => {
			let newHistory;
			if (currentNode.type === 'input') {
				newHistory = [...value, { node: currentNode, answer: $inputValue }];
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

		// Reset input value
		console.log($inputValue);
		inputValue.set('');
		console.log($inputValue);
	};
</script>

<main>
	<!-- TODO: Implement breadcrumbs logic-->
	<!-- {#if breadcrumbs.length > 0}
		<div class="breadcrumbs">
			{#each breadcrumbs as breadcrumb, i}
				<div class="breadcrumb-wrapper">
					{#if breadcrumb.node.type === 'start'}
						<span class="start">Start</span>
					{:else if breadcrumb.node.type === 'end'}
						<span class="end">End</span>
					{:else if breadcrumb.node.type === 'decision'}
						<span>{i}. {breadcrumb.node.description}</span>
						<span class="answer">{breadcrumb.answer}</span>
					{:else if breadcrumb.node.type === 'input'}
						<span>{i}. {breadcrumb.node.description}</span>
						{#if breadcrumb.answer}
							<span class="variable">{breadcrumb.answer}</span>
						{:else}
							<span class="variable">...</span>
						{/if}
					{:else if breadcrumb.node.type === 'action'}
						<span>{i}. {breadcrumb.node.description}</span>
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
	{/if} -->
	<Breadcrumbs {breadcrumbs} {currentNode} />
	<CurrentStep {currentNode} {decisionHandler} currentDepartment={$currentDepartment} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
