// @ts-nocheck
// In src/lib/stores.js
import { writable, derived } from 'svelte/store';

const allDecisionTrees = writable();
const currentDecisionTree = writable({});
const currentStep = writable({});
const highlightedStep = writable({});
const stepHistory = writable([]);
const currentDepartment = derived(
	/* Checks if the current step has a department property and returns the department from the current decision tree. */
	[currentDecisionTree, currentStep],
	([$currentDecisionTree, $currentStep]) => {
		if ($currentStep && $currentStep.department) {
			return $currentDecisionTree.departments[$currentStep.department];
		}
		return null;
	}
);
const inputValue = writable('');
const currentVariables = writable({});

export {
	allDecisionTrees,
	currentDecisionTree,
	currentStep,
	highlightedStep,
	stepHistory,
	currentDepartment,
	inputValue,
	currentVariables
};

/*
    {
    "title": "Christmas Present Selection Guide",
    "description": "A decision tree to assist in choosing the ideal Christmas present.",
    "departments": {
        "gift_advisor": {
            "name": "Gift Advisor",
            "description": "A department that provides gift recommendations based on the recipient's interests."
        }
    },
    "variables": {
        "recipientAge": null,
        "recipientInterest": null,
        "budget": null,
        "giftType": null
    },
    "steps": [
        {
            "id": "root",
            "type": "start",
            "description": "Begin the quest for the perfect Christmas gift.",
            "nextStep": "recipientAge"
        },
        {
            "id": "recipientAge",
            "type": "decision",
            "description": "What is the age of the gift recipient?",
            "explanation": "<h3>Age Consideration</h3><p>Choose gifts that are appropriate for the recipient's age group.</p>",
            "options": [
                {
                    "value": "Child",
                    "nextStep": "childInterest"
                },
                {
                    "value": "Teen",
                    "nextStep": "teenInterest"
                },
                {
                    "value": "Adult",
                    "nextStep": "adultInterest"
                }
            ]
        },
        {
            "id": "childInterest",
            "type": "input",
            "description": "What interests does the child have?",
            "variable": "recipientInterest",
            "explanation": "<h4>Child's Interests</h4><ul><li>Consider toys, books, or games.</li><li>Think about educational or fun activities.</li></ul>",
            "department": "gift_advisor",
            "nextStep": "budget"
        },
        {
            "id": "teenInterest",
            "type": "input",
            "description": "What are the teenager's interests?",
            "variable": "recipientInterest",
            "explanation": "<h4>Teen's Interests</h4><ul><li>Look into current trends, tech gadgets, or fashion.</li><li>Music, sports, or hobby-related gifts are also great.</li></ul>",
            "department": "gift_advisor",
            "nextStep": "budget"
        },
        {
            "id": "adultInterest",
            "type": "input",
            "description": "What are the adult's interests?",
            "variable": "recipientInterest",
            "explanation": "<h4>Adult's Interests</h4><ul><li>Consider lifestyle, hobbies, or practical items.</li><li>Think about experiences, like a spa day or a cooking class.</li></ul>",
            "department": "gift_advisor",
            "nextStep": "budget"
        },
        {
            "id": "budget",
            "type": "decision",
            "description": "What's your budget for the gift?",
            "explanation": "<h3>Budget Planning</h3><p>Choose a budget that fits your financial capabilities. Remember, it's the thought that counts!</p>",
            "options": [
                {
                    "value": "Low",
                    "nextStep": "lowBudgetGift"
                },
                {
                    "value": "Medium",
                    "nextStep": "mediumBudgetGift"
                },
                {
                    "value": "High",
                    "nextStep": "highBudgetGift"
                }
            ]
        },
        {
            "id": "lowBudgetGift",
            "type": "end",
            "description": "Low Budget Gift Ideas",
            "explanation": "<p>Think DIY gifts, personalized items, or thoughtful gestures like a hand-written letter.</p>"
        },
        {
            "id": "mediumBudgetGift",
            "type": "end",
            "description": "Medium Budget Gift Ideas",
            "explanation": "<p>Consider popular gadgets, branded clothing, or a nice dinner at a restaurant.</p>"
        },
        {
            "id": "highBudgetGift",
            "type": "end",
            "description": "High Budget Gift Ideas",
            "explanation": "<p>Explore luxury items, high-end electronics, or an unforgettable experience such as a weekend getaway.</p>"
        }
    ]
}
    */
