export const config = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
};

const useObserver = (element, setValue) => {
	const callback = (mutationList) => {
		for (const mutation of mutationList) {
			if (mutation.type === "characterData") {
				setValue(element?.current?.innerHTML);
			} else if (mutation.type === "attributes") {
				console.log(`The ${mutation.attributeName} attribute was modified.`);
			}
		}
	};

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback);

	return observer;
}

export default useObserver;