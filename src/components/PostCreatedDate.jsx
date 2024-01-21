const PostCreatedDate = ({ date }) => {
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
  const renderedDate = `${months[parsedDate.getMonth()]} ${
    parsedDate.getDate() < 10
      ? "0" + parsedDate.getDate()
      : parsedDate.getDate()
  }${
    parsedDate.getFullYear() === currentYear ? "" : ', ' + parsedDate.getFullYear()
  }`;

  return <span className="text-gray-500">{renderedDate}</span>;
};

export default PostCreatedDate;
