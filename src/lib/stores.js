// src/lib/stores.js
import { writable } from 'svelte/store';

export const decisionTreeState = writable({
	selectedTree: null,
	currentStepId: null,
	breadcrumbs: []
});
