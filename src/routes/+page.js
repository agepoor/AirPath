/**
 * Loads decision trees from server-side JSON files.
 * @returns {Promise<{ props: { decisionTrees: Array<{ title: string, description: string, steps: Array<any>, path: string }> } }>}
 */
export async function load() {
	// import specific files
	const decisionTreeFiles = import.meta.glob('../lib/warranty.json');

	// const decisionTreeFiles = import.meta.glob('../lib/*.json');

	const decisionTrees = await Promise.all(
		Object.entries(decisionTreeFiles).map(async ([path, resolve]) => {
			// @ts-ignore
			const { default: content } = await resolve();
			return {
				title: content.title,
				description: content.description,
				departments: content.departments,
				variables: content.variables,
				steps: content.steps,
				path
			};
		})
	);

	return {
		props: { decisionTrees }
	};
}
