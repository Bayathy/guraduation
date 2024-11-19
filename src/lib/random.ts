export const generateRandomTestType = () => {
	const testTypes = ["A", "B", "C"];
	return testTypes[Math.floor(Math.random() * testTypes.length)];
};
