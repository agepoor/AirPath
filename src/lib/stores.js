// src/lib/stores.js
import { writable } from 'svelte/store';

const decisionTreeState = writable({
	selectedTree: null,
	currentStepId: null,
	/* Breadcrumbs should be a list of decisions with given answers in decision tree. It adds an item when a choice is made, and it removes an item when the stepback button is clicked. It is in the state for two purposes: 1. To visualize the decision history in the dumb with breadcrumb elements. 2. To allow the users to go back. The breadcrumbs should be reset when the users opens a new decision tree or when the users presses the backward fast button */
	breadcrumbs: []
});

function addBreadcrumb(stepId, option) {
	decisionTreeState.update((state) => {
		return { ...state, breadcrumbs: [...state.breadcrumbs, { stepId, option }] };
	});
}

function removeLastBreadcrumb() {
	decisionTreeState.update((state) => {
		return { ...state, breadcrumbs: state.breadcrumbs.slice(0, -1) };
	});
}

function resetBreadcrumbs() {
	decisionTreeState.update((state) => {
		return { ...state, breadcrumbs: [] };
	});
}

export { decisionTreeState, addBreadcrumb, removeLastBreadcrumb, resetBreadcrumbs };
