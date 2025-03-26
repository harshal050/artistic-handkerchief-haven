
import { useState, useEffect } from "react";
import { ShoppingBag, MessageSquare, Star, Users, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useDatabase } from "@/context/DatabaseContext";
import { OverviewCharts } from "./OverviewCharts";

const DashboardOverview = () => {
  const { products, reviews, queries } = useDatabase();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalReviews: 0,
    averageRating: 0,
    pendingQueries: 0,
    totalVisits: 1246, // Mockup for now
    totalUsers: 87 // Mockup for now
  });

  // Update stats when data changes
  useEffect(() => {
    if (products && reviews && queries) {
      const reviewRatings = reviews.reduce((total, review) => total + review.rating, 0);
      setStats({
        totalProducts: products.length,
        totalReviews: reviews.length,
        averageRating: reviews.length > 0 ? reviewRatings / reviews.length : 0,
        pendingQueries: queries.filter(q => q.status === "pending").length,
        totalVisits: 1246, // Mockup for now
        totalUsers: 87 // Mockup for now
      });
    }
  }, [products, reviews, queries]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingBag className="mr-2 text-muted-foreground" size={16} />
              <span className="text-xl md:text-2xl font-bold">{stats.totalProducts}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="mr-2 text-muted-foreground" size={16} />
              <span className="text-xl md:text-2xl font-bold">{stats.totalReviews}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="mr-2 text-amber-500" size={16} />
              <span className="text-xl md:text-2xl font-bold">
                {stats.totalReviews > 0 ? stats.averageRating.toFixed(1) : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="mr-2 text-muted-foreground" size={16} />
              <span className="text-xl md:text-2xl font-bold">
                {stats.pendingQueries}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 text-muted-foreground" size={16} />
              <span className="text-xl md:text-2xl font-bold">{stats.totalVisits}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="mr-2 text-muted-foreground" size={16} />
              <span className="text-xl md:text-2xl font-bold">{stats.totalUsers}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <OverviewCharts />
    </div>
  );
};

export default DashboardOverview;
