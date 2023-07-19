
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DatesGraphic = ({ datesData }) => {
  // Function to count occurrences of each date
  const getDateCounts = () => {
    const dateCounts = {};

    datesData.forEach((dateObj) => {
      const date = dateObj.date.toISOString().slice(0, 10); // Convert date object to 'YYYY-MM-DD' string
      dateCounts[date] = dateCounts[date] ? dateCounts[date] + 1 : 1;
    });

    return dateCounts;
  };

  const dateCounts = getDateCounts();

  // Convert date counts object to an array of data points for the chart
  const chartData = Object.keys(dateCounts).map((date) => ({
    date,
    count: dateCounts[date],
  }));

  return (
    <LineChart width={600} height={300} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="count" stroke="#8884d8" />
    </LineChart>
  );
};

export default DatesGraphic;
