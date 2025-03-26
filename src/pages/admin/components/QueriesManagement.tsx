
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDatabase } from "@/context/DatabaseContext";
import { toast } from "sonner";
import { updateQueryStatus } from '@/services/query.service';

const QueriesManagement = () => {
  const { queries, refreshData } = useDatabase();

  const handleUpdateQueryStatus = async (id: string, newStatus: 'pending' | 'done') => {
    try {
      await updateQueryStatus(id, newStatus);
      await refreshData();
      toast.success(`Query marked as ${newStatus}`);
    } catch (error) {
      console.error(`Error updating query status with id ${id}:`, error);
      toast.error("Failed to update query status");
    }
  };

  const pendingQueries = queries?.filter(q => q.status === 'pending') || [];
  const resolvedQueries = queries?.filter(q => q.status === 'done') || [];

  return (
    <div className="space-y-6">
      <div className="bg-card p-4 md:p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6">Pending Queries ({pendingQueries.length})</h2>
        
        {pendingQueries.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pendingQueries.map(query => (
              <Card key={query._id?.toString()} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{query.name}</CardTitle>
                      <CardDescription className="text-xs">{query.email}</CardDescription>
                    </div>
                    <div className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      Pending
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm mb-2">{query.phone}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {query.message}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="text-xs text-muted-foreground">
                    {new Date(query.createdAt).toLocaleDateString()}
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateQueryStatus(query._id?.toString() || "", "done")}
                  >
                    <Check size={14} className="mr-1" />
                    Mark as Done
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No pending queries.</p>
          </div>
        )}
      </div>
      
      <div className="bg-card p-4 md:p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6">Resolved Queries ({resolvedQueries.length})</h2>
        
        {resolvedQueries.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resolvedQueries.map(query => (
              <Card key={query._id?.toString()} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{query.name}</CardTitle>
                      <CardDescription className="text-xs">{query.email}</CardDescription>
                    </div>
                    <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Resolved
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm mb-2">{query.phone}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {query.message}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="text-xs text-muted-foreground">
                    {new Date(query.createdAt).toLocaleDateString()}
                  </div>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateQueryStatus(query._id?.toString() || "", "pending")}
                  >
                    <X size={14} className="mr-1" />
                    Mark as Pending
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No resolved queries.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueriesManagement;
