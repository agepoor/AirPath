<script>
	/* Dummy breadcrumb data */
	const breadcrumbs = [
		{
			description: 'Start',
			type: 'start'
		},
		{
			description: 'Is de garantieperiode nog geldig?',
			type: 'decision',
			answer: 'Ja'
		},
		{
			description: 'Is het product te repareren?',
			type: 'action',
			answer: 'Ja'
		},
		{
			description: 'Voer het werkorder nummer in:',
			type: 'input',
			answer: 'W123456'
		},
		{
			description: 'Het product is buiten de garantieperiode.',
			type: 'end'
		}
	];

	/* Dummy data decision */
	const currentStep = {
		id: 'warranty_period',
		type: 'decision',
		description: 'Is de garantieperiode nog geldig?',
		options: [
			{
				value: 'Ja',
				nextStep: 'repairable_check'
			},
			{
				value: 'Nee',
				nextStep: 'out_of_warranty'
			}
		],
		department: 'customer_service',
		explanation:
			'De garantieperiode is nog <u>geldig</u>, dus de klant kan het product gratis laten repareren.'
	};

	/* Dummy data action */
	// const currentStep = {
	// 	id: 'repairable_check',
	// 	type: 'action',
	// 	description: 'Is het product te repareren?',
	// 	department: 'customer_service',
	// 	explanation: 'Het product is te repareren, dus de klant kan het product gratis laten repareren.'
	// };

	/* Dummy data input */
	// const currentStep = {
	// 	id: 'enter_work_order_number',
	// 	type: 'input',
	// 	description: 'Voer het werkorder nummer in:',
	// 	variable: 'workOrderNumber',
	// 	nextStep: 'reckoning_price_check',
	// 	department: 'customer_service',
	// 	explanation: 'Het werkordernummer kun je vinden via ...'
	// };

	/* Dummy data end */
	// const currentStep = {
	// 	id: 'out_of_warranty',
	// 	type: 'end',
	// 	description: 'Het product is buiten de garantieperiode.',
	// 	department: 'customer_service',
	// 	explanation:
	// 		'Het product is buiten de garantieperiode, dus de klant kan het product niet gratis laten repareren.'
	// };
</script>

<main>
	<div class="breadcrumbs">
		<!-- TODO: Layout and functionality for Breadcrumbs -->
		{#each breadcrumbs as breadcrumb}
			<div class="breadcrumb-wrapper">
				{#if breadcrumb.type === 'start'}
					<span class="start">{breadcrumb.description}</span>
				{:else if breadcrumb.type === 'decision' || breadcrumb.type === 'action'}
					<span>{breadcrumb.description}</span>
					<span class="answer">{breadcrumb.answer}</span>
				{:else if breadcrumb.type === 'input'}
					<span>{breadcrumb.description}</span>
					<span class="variable">{breadcrumb.answer}</span>
				{:else if breadcrumb.type === 'end'}
					<span class="end">{breadcrumb.description}</span>
				{/if}
			</div>
		{/each}
	</div>
	<div class="current-step">
		<!-- TODO: Step layout (this depends on the type) and functionality -->
		{#if currentStep.type === 'decision'}
			<h2>{currentStep.description}</h2>
			<div class="explanation">
				{@html currentStep.explanation}
			</div>
			<div class="options">
				{#each currentStep.options as option}
					<button on:click={() => console.log(option.nextStep)}>{option.value}</button>
				{/each}
			</div>
		{:else if currentStep.type === 'action'}
			<h2>{currentStep.description}</h2>
			<div class="explanation">
				{@html currentStep.explanation}
			</div>
			<div class="options">
				<button on:click={() => console.log('Action performed')}>Uitvoeren</button>
			</div>
		{:else if currentStep.type === 'input'}
			<h2>{currentStep.description}</h2>
			<div class="explanation">
				{@html currentStep.explanation}
			</div>
			<div class="options">
				<input type="text" name={currentStep.variable} />
				<button on:click={() => console.log('Input received')}>Verder</button>
			</div>
		{:else if currentStep.type === 'end'}
			<h2>{currentStep.description}</h2>
			<div class="explanation">
				{@html currentStep.explanation}
			</div>
			<hr />
		{/if}
	</div>
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
		width: 600px; /* Match the width of the current-step element */
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

	.current-step {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		width: 600px;
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
