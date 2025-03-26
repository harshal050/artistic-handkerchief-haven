
import { useState } from "react";
import { Star, Edit, Trash, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDatabase } from "@/context/DatabaseContext";
import { toast } from "sonner";
import { updateReview, deleteReview } from '@/services/review.service';

const ReviewsManagement = () => {
  const { products, reviews, refreshData } = useDatabase();
  const [isEditReviewOpen, setIsEditReviewOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const handleDeleteReview = async (id: string) => {
    try {
      await deleteReview(id);
      await refreshData();
      toast.success("Review deleted successfully");
    } catch (error) {
      console.error(`Error deleting review with id ${id}:`, error);
      toast.error("Failed to delete review");
    }
  };

  const handleEditReview = (review: any) => {
    setSelectedReview(review);
    setIsEditReviewOpen(true);
  };

  const handleSaveEditedReview = async () => {
    try {
      if (!selectedReview || !selectedReview._id) {
        toast.error("Review not found");
        return;
      }

      await updateReview(selectedReview._id, selectedReview);
      await refreshData();
      setIsEditReviewOpen(false);
      toast.success("Review updated successfully");
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error("Failed to update review");
    }
  };

  return (
    <div className="bg-card p-4 md:p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Reviews & Ratings</h2>
      
      {reviews?.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="hidden md:table-cell">Comment</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review._id?.toString()}>
                  <TableCell className="font-medium">
                    {products?.find(p => p._id?.toString() === review.productId?.toString())?.name || "Unknown Product"}
                  </TableCell>
                  <TableCell>{review.userName}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="line-clamp-2">{review.comment}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditReview(review)}>
                        <Edit size={14} />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteReview(review._id?.toString() || "")}>
                        <Trash size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No reviews yet.</p>
        </div>
      )}

      {/* Edit Review Sheet */}
      <Sheet 
        open={isEditReviewOpen} 
        onOpenChange={(open) => {
          if (!open) setIsEditReviewOpen(false);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Review</SheetTitle>
            <SheetDescription>
              Update the review details.
            </SheetDescription>
          </SheetHeader>

          {selectedReview && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Product</label>
                <Input 
                  value={products?.find(p => p._id?.toString() === selectedReview.productId?.toString())?.name || "Unknown Product"} 
                  disabled 
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">User Name</label>
                <Input 
                  value={selectedReview.userName} 
                  onChange={(e) => setSelectedReview({ ...selectedReview, userName: e.target.value })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setSelectedReview({ ...selectedReview, rating })}
                      className="p-2 hover:bg-muted rounded-md"
                    >
                      <Star 
                        size={20} 
                        className={rating <= selectedReview.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Comment</label>
                <Textarea 
                  value={selectedReview.comment} 
                  onChange={(e) => setSelectedReview({ ...selectedReview, comment: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          )}
          
          <SheetFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsEditReviewOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditedReview}>
              <Check size={16} className="mr-2" />
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ReviewsManagement;
