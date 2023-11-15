const decisionTrees = import.meta.glob('$lib/server/*.json');

export async function load() {
	const modules = await Promise.all(
		Object.entries(decisionTrees).map(async ([path, importer]) => {
			const content = await importer();
			return {
				title: content.default.title, // Extract the title
				description: content.default.description, // Extract the description
				steps: content.default.steps, // Extract the steps
				path // Keep the path for reference
			};
		})
	);

	console.log('Loaded decision trees:', modules); // Log the loaded data

	return {
		props: {
			decisionTrees: modules
		}
	};
}
