export const generateRandomTestType = () => {
	const testTypes = ["A", "B"];
	return testTypes[Math.floor(Math.random() * testTypes.length)];
};
