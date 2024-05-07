import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export const isAuthor = (authorId, userId) => {
	if (userId === authorId) {
		return true;
	}
	return false;
};

export const formatDate = (date) => {
	const now = new Date();
	const formattedDate = format(new Date(date), "d MMMM", { locale: ru });

	if (Math.abs(now.getTime() - new Date(date).getTime()) < 24 * 60 * 60 * 1000) {
		return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru });
	} else if (new Date(date).getFullYear() === now.getFullYear()) {
		return formattedDate;
	} else {
		return `${formattedDate} ${new Date(date).getFullYear()} г`;
	}
};

export const formatNumber = (num, precision = 2) => {
	const map = [
		{ suffix: 'T', threshold: 1e12 },
		{ suffix: 'B', threshold: 1e9 },
		{ suffix: 'M', threshold: 1e6 },
		{ suffix: 'K', threshold: 1e3 },
		{ suffix: '', threshold: 1 },
	];

	const found = map.find((x) => Math.abs(num) >= x.threshold);
	if (found) {
		const formatted = (num / found.threshold).toFixed(num < 1000 ? 0 : precision) + found.suffix;
		return formatted;
	}

	return num;
}

export const getReadingTime = (blocks) => {
	if (blocks) {
		const allText = blocks.map(block => {
			if (block.type === "paragraph" || block.type === "header") {
				return block.data.text
			} else if (block.type === 'list') {
				return block.data.items
			}
		}).toString()
		const textLength = allText?.length;
		const averageReadingSpeed = 1500;

		const readingTime = Math.floor(textLength / averageReadingSpeed);

		return readingTime === 0 ? 1 : readingTime;
	}
}

export const createPreview = (blocks, maxLength) => {
	let previewText = "";
	for (const block of blocks) {
		if (block.type === "paragraph") {
			previewText += block.data.text + " ";
		}
		// blocks[0]?.data?.items.join(" ")
	}
	return previewText.length > maxLength
		? previewText.slice(0, maxLength) + "..."
		: previewText;
}

export const stripHtml = (html) => {
	const regex = /&[^\s;]+;|<[^>]*>/gi;

	return html.replace(regex, " ");
}