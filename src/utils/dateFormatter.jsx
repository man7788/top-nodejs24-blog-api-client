const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (ISOdate) => {
  const date = new Date(ISOdate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day} ${shortMonths[month]} ${year}`;
};

export default formatDate;
