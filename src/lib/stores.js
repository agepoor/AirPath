// @ts-nocheck
// In src/lib/stores.js
import { writable } from 'svelte/store';

const allDecisionTrees = writable();
const currentDecisionTree = writable({});
const currentStep = writable();
const stepHistory = writable([]);

export { allDecisionTrees, currentDecisionTree, currentStep, stepHistory };
