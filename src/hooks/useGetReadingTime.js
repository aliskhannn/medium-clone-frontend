export const useGetReadingTime = (text) => {
	const textLength = text?.length;
	const averageReadingSpeed = 1500;

	const readingTime = Math.floor(textLength / averageReadingSpeed);

	return readingTime === 0 ? 1 : readingTime;
}