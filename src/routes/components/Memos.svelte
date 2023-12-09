<script>
	/* sample data */
	/* Enhanced and interesting sample data */
	// let sampleVariables = {
	// 	funFact: {
	// 		name: 'Fun Fact',
	// 		value:
	// 			'Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat!'
	// 	},
	// 	dailyQuote: {
	// 		name: 'Daily Quote',
	// 		value:
	// 			'“The only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle.” - Steve Jobs'
	// 	},
	// 	travelTip: {
	// 		name: 'Travel Tip',
	// 		value:
	// 			'Did you know? When packing for a trip, rolling your clothes instead of folding them can save space and prevent wrinkles.'
	// 	},
	// 	bookRecommendation: {
	// 		name: 'Book Recommendation',
	// 		value:
	// 			'“The Alchemist” by Paulo Coelho - A tale of self-discovery that has inspired millions around the world.'
	// 	},
	// 	randomJoke: {
	// 		name: 'Random Joke',
	// 		value: 'Why don’t scientists trust atoms? Because they make up everything!'
	// 	},
	// 	todayInHistory: {
	// 		name: 'Today in History',
	// 		value:
	// 			'On this day in 1969, Apollo 11 landed on the Moon, marking a monumental achievement in space exploration.'
	// 	}
	// };

	import { currentVariables } from '$lib/stores';

	let variables;
	currentVariables.subscribe((value) => (variables = value));

	// log when variables change
	$: console.log(variables);
</script>

{#if !Object.values(variables).every((variable) => variable.value === null)}
	<div class="memos">
		{#each Object.keys(variables) as variable}
			{#if variables[variable].value !== null}
				<div class="memo card">
					<span class="name">{variables[variable].name}</span>:
					{variables[variable].value}
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.memos {
		display: flex;
		flex-wrap: wrap;
		width: 700px;
		gap: 10px; /* Reduced gap between memos */
		padding: 10px;
		justify-content: center;
	}
	.memo {
		border-left: 4px solid rgba(193, 193, 0, 0.5);
		font-size: 0.7rem;
		background-color: var(--light-info-background);
		padding: 10px;
	}
	.memo .name {
		font-weight: 600;
	}
</style>
