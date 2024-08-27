import {
    LineChart, Line,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

const data = [
  { month: 'Oct', bookings: 300 },
  { month: 'Nov', bookings: 450 },
  { month: 'Dec', bookings: 500 },
  { month: 'Jan', bookings: 320 },
  { month: 'Feb', bookings: 400 },
  { month: 'Mar', bookings: 380 },
  { month: 'Apr', bookings: 450 },
  { month: 'May', bookings: 550 },
  { month: 'Jun', bookings: 490 },
  { month: 'Jul', bookings: 600 },
];
const pieData = [
    { name: 'Today', value: 2000 },
    { name: 'This Week', value: 7000 },
    { name: 'This Month', value: 25000 },
  ];
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
export function BookingBarChart() {
  return (
    <div className=' w-[510px] bg-white mt-6 ml-4 rounded-lg'>
        <h1 className=' text-xl p-2 font-semibold'>Bookings</h1>
    <ResponsiveContainer width="90%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="bookings" fill="#3162de" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}


const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export function EarningsPieChart() {
  return (
    <div className='w-[400px] bg-white mt-6 rounded-lg'>
        <h1 className=' text-xl p-2 font-semibold'>Earnings</h1>
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom"
           align='center'
            height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export function ReviewsBarChart() {
    return (
      <div className='w-[510px] bg-white mt-6 ml-4 rounded-lg'>
          <h1 className=' text-xl p-2 font-semibold'>Reviews</h1>
        <ResponsiveContainer width="90%" height={400}>
        <LineChart
          data={reviewsData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="reviews" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    );
  }


