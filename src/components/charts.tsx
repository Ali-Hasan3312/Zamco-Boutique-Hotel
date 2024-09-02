import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { CustomXAxis, CustomYAxis } from './CustomYAxis';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// const data = [
//   { month: 'Oct', bookings: 300 },
//   { month: 'Nov', bookings: 450 },
//   { month: 'Dec', bookings: 500 },
//   { month: 'Jan', bookings: 320 },
//   { month: 'Feb', bookings: 400 },
//   { month: 'Mar', bookings: 380 },
//   { month: 'Apr', bookings: 450 },
//   { month: 'May', bookings: 550 },
//   { month: 'Jun', bookings: 490 },
//   { month: 'Jul', bookings: 600 },
// ];



interface BookingData {
  month: string;
  bookings: number;
}


export function BookingBarChart() {
  const [barChartData, setBarChartData] = useState<BookingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/stats`);
        const fetchedData = response.data.stats.tenMonthsBookings;

        const formattedData = monthNames.map((month, index) => {
          const bookingData = fetchedData.find((booking: any) => booking._id.month === index);
          return {
            month,
            bookings: bookingData ? bookingData.totalBookings : 0,
          };
        });

        setBarChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch booking data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='w-[510px] bg-white mt-6 ml-4 rounded-lg'>
      <h1 className='text-xl p-2 font-semibold'>Bookings</h1>
      <ResponsiveContainer width="90%" height={300}>
        <BarChart
          data={barChartData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <CustomXAxis dataKey="month" />
          <CustomYAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="bookings" fill="#3162de" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}



export default BookingBarChart;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export function EarningsPieChart() {
  const [pieData, setPieData] = useState<{ name: string; value: number | undefined }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/stats`);
        // Update pieData based on the fetched dashboard data
        setPieData([
          { name: 'Today', value: response.data.stats.todayRevenue },
          { name: 'This Week', value: response.data.stats.thisWeekRevenue },
          { name: 'This Month', value: response.data.stats.thisMonthRevenue },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-[400px] bg-white mt-6 rounded-lg'>
      <h1 className='text-xl p-2 font-semibold'>Earnings</h1>
      <ResponsiveContainer width="90%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" align='center' height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}



const reviewsData = [
  { month: 'Oct', reviews: 45 },
  { month: 'Nov', reviews: 60 },
  { month: 'Dec', reviews: 75 },
  { month: 'Jan', reviews: 50 },
  { month: 'Feb', reviews: 65 },
  { month: 'Mar', reviews: 80 },
  { month: 'Apr', reviews: 70 },
  { month: 'May', reviews: 90 },
  { month: 'Jun', reviews: 85 },
  { month: 'Jul', reviews: 95 },
];

export function ReviewsBarChart() {
  return (
    <div className='w-[510px] bg-white mt-6 ml-4 rounded-lg'>
      <h1 className='text-xl p-2 font-semibold'>Reviews</h1>
      <ResponsiveContainer width="90%" height={400}>
        <LineChart
          data={reviewsData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <CustomXAxis dataKey="month" />
          <CustomYAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="reviews" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
