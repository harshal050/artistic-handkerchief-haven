
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useDatabase } from "@/context/DatabaseContext";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// COLORS for the charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const OverviewCharts = () => {
  const { products, reviews } = useDatabase();

  // Generate rating data for chart
  const ratingData = [
    { name: '5 Stars', value: reviews?.filter(r => r.rating === 5).length || 0 },
    { name: '4 Stars', value: reviews?.filter(r => r.rating === 4).length || 0 },
    { name: '3 Stars', value: reviews?.filter(r => r.rating === 3).length || 0 },
    { name: '2 Stars', value: reviews?.filter(r => r.rating === 2).length || 0 },
    { name: '1 Star', value: reviews?.filter(r => r.rating === 1).length || 0 },
  ];

  // Mock visit data (would be real in production)
  const visitData = [
    { name: 'Mon', visits: 120 },
    { name: 'Tue', visits: 145 },
    { name: 'Wed', visits: 132 },
    { name: 'Thu', visits: 167 },
    { name: 'Fri', visits: 189 },
    { name: 'Sat', visits: 212 },
    { name: 'Sun', visits: 198 },
  ];

  // Generate product view data
  const categoryGroups = products?.reduce((acc: any, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += 1;
    return acc;
  }, {});

  const productViewData = Object.entries(categoryGroups || {}).map(([name, count]) => ({
    name,
    views: count,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
          <CardDescription>Distribution of user ratings</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ratingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {ratingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Weekly Visits</CardTitle>
          <CardDescription>Website traffic for the past week</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={visitData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Product Category Views</CardTitle>
          <CardDescription>Number of views per product category</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={productViewData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="views" fill="#8884d8" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
