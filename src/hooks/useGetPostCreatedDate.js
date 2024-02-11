export const useGetFormattedDate = (date) => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const currentYear = new Date().getFullYear();

	const parsedDate = new Date(date);
	const formattedDate = `${months[parsedDate.getMonth()]} ${parsedDate.getDate() < 10
		? "0" + parsedDate.getDate()
		: parsedDate.getDate()
		}${parsedDate.getFullYear() === currentYear ? "" : ', ' + parsedDate.getFullYear()
		}`;

	return formattedDate;
}