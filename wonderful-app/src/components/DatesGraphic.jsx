
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DatesGraphic = ({ datesData }) => {
  // Function to count occurrences of each date

  const getDateCounts = () => {
    const dateCounts = {};

    datesData.forEach((dateObj) => {
      const temp = new Date(dateObj)
      const date = `${temp.getMonth()}-${temp.getDate()}-${temp.getFullYear()}`; // Convert date object to 'MM-DD-YYYY' string
      dateCounts[date] = dateCounts[date] ? dateCounts[date] + 1 : 1;
    });

    return dateCounts;
  };

  const dateCounts = getDateCounts();
  const maxCount = Math.max(...Object.values(dateCounts));
  const yTicks = Array.from({ length: maxCount*2+1 }, (_, index) => index);

  // Convert date counts object to an array of data points for the chart
  const chartData = Object.keys(dateCounts).map((date) => ({
    date,
    count: dateCounts[date],
  }));
  //TODO: Style the graphic
  return (
    
    <LineChart width={600} height={300} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis ticks={yTicks}/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Line type="monotone" dataKey="count" stroke="#8884d8" />
    </LineChart>
  );
};

export default DatesGraphic;
