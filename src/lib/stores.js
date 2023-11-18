// @ts-nocheck
// In src/lib/stores.js
import { writable, get } from 'svelte/store';

const decisionTreeState = writable({
	decisionTree: null,
	currentStep: null,
	stepHistory: []
});

/* function to update state with title and set current step to root id and empty step history */
function updateDecisionTree(decisionTree) {
	decisionTreeState.update((state) => {
		state.decisionTree = decisionTree;
		state.currentStep = 'root';
		state.stepHistory = [];
		return state;
	});
	console.log(get(decisionTreeState));
}

export { decisionTreeState, updateDecisionTree };

/* Example Json */
/*
{
  "title": "Garantieprocedure",
  "description": "Deze beslissingsboom helpt je om te bepalen of een product onder garantie valt.",
  "departments": {
    "customer_service": "Customer Service",
    "warehouse": "Warehouse",
    "workshop": "Workshop"
  },
  "variables": {
    "workOrderNumber": null,
    "repairable": null,
    "warrantyPeriod": null,
    "reckoningPrice": null
  },
  "steps": [
    {
      "id": "root",
      "type": "start",
      "question": "Is het product nog binnen de garantieperiode?",
      "options": [
        {
          "value": "Ja",
          "nextStep": "warrantyPeriod"
        },
        {
          "value": "Nee",
          "nextStep": "end"
        }
      ]
    },
    {
      "id": "warrantyPeriod",
      "type": "decision",
      "question": "Is het product nog binnen de garantieperiode?",
      "options": [
        {
          "value": "Ja",
          "nextStep": "warrantyPeriod"
        },
        {
          "value": "Nee",
          "nextStep": "end"
        }
      ]
    },
    {
      "id": "workOrderNumber",
      "type": "input",
      "question": "Wat is het werkordernummer?",
      "variable": "workOrderNumber",
      "explanation": "Het werkordernummer is te vinden op de werkorder.",
      "department": "workshop",
      "nextStep": "repairable"
    },
    {
      "id": "repairable",
      "type": "decision",
      "question": "Is het product nog binnen de garantieperiode?",
      "options": [
        {
          "value": "Ja",
          "nextStep": "warrantyPeriod"
        },
        {
          "value": "Nee",
          "nextStep": "end"
        }
      ]
    },
    {
      "id": "reckoningPrice",
      "type": "input",
      "question": "Wat is de afrekenprijs?",
      "variable": "reckoningPrice",
      "explanation": "De afrekenprijs is te vinden op de werkorder.",
        "department": "workshop",
        "nextStep": "end"
    },
    {
      "id": "end",
      "type": "end",
      "question": "Het product valt niet onder garantie."
    }
    ]
}
*/
