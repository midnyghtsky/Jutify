import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Star, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { z } from "zod";
import { Link } from "react-router-dom";

const reviewSchema = z.object({
  comment: z.string().trim().min(1, "Review cannot be empty").max(500, "Review must be under 500 characters"),
  rating: z.number().int().min(1).max(5),
});

interface Review {
  id: string;
  user_id: string;
  user_email: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface BagReviewsProps {
  bagId: string; // UUID of the jute_bags row
}

const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-5 h-5 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"} ${interactive ? "cursor-pointer hover:text-primary transition-colors" : ""}`}
        onClick={() => interactive && onRate?.(star)}
      />
    ))}
  </div>
);

const BagReviews = ({ bagId }: BagReviewsProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("bag_reviews")
      .select("*")
      .eq("bag_id", bagId)
      .order("created_at", { ascending: false });
    if (data) setReviews(data as Review[]);
  };

  useEffect(() => {
    fetchReviews();
  }, [bagId]);

  const handleSubmit = async () => {
    if (!user) return;

    const result = reviewSchema.safeParse({ comment, rating });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("bag_reviews").insert({
      bag_id: bagId,
      user_id: user.id,
      user_email: user.email ?? "Anonymous",
      rating: result.data.rating,
      comment: result.data.comment,
    });

    if (error) {
      toast.error("Failed to submit review");
    } else {
      toast.success("Review submitted!");
      setComment("");
      setRating(5);
      fetchReviews();
    }
    setSubmitting(false);
  };

  const handleDelete = async (reviewId: string) => {
    const { error } = await supabase.from("bag_reviews").delete().eq("id", reviewId);
    if (error) {
      toast.error("Failed to delete review");
    } else {
      toast.success("Review deleted");
      fetchReviews();
    }
  };

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        Reviews ({reviews.length})
      </h2>

      {/* Average Rating */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-3 mb-4">
          <StarRating rating={Math.round(avgRating)} />
          <span className="text-sm text-muted-foreground">{avgRating.toFixed(1)} out of 5</span>
        </div>
      )}

      {/* Write Review */}
      <Card className="mb-4">
        <CardContent className="p-4 space-y-3">
          {user ? (
            <>
              <p className="text-sm font-medium text-foreground">Write a review</p>
              <StarRating rating={rating} onRate={setRating} interactive />
              <Textarea
                placeholder="Share your experience with this bag..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
                className="resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{comment.length}/500</span>
                <Button size="sm" onClick={handleSubmit} disabled={submitting || !comment.trim()}>
                  {submitting ? "Posting..." : "Post Review"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm text-muted-foreground mb-2">Sign in to leave a review</p>
              <Link to="/auth">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review List */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{review.user_email}</p>
                </div>
                {user?.id === review.user_id && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(review.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
              <p className="mt-2 text-sm text-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
        {reviews.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No reviews yet. Be the first!</p>
        )}
      </div>
    </section>
  );
};

export default BagReviews;
