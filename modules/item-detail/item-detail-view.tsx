"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ProgressiveImage } from "@/components/progressive-image";
import { ArrowLeft, Heart, Bookmark, Tag, Calendar, User } from "lucide-react";
import { UserDetail } from "@/types/gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import UserCard from "@/components/user-card";
import { galleryApi } from "@/routers/gallery";
import { toast } from "sonner";

interface ItemDetailViewProps {
  userDetail: UserDetail;
}

export default function ItemDetailView({ userDetail }: ItemDetailViewProps) {
  const [isLiked, setIsLiked] = useState(userDetail.isLiked);
  const [likesCount, setLikesCount] = useState(userDetail.likes);
  const [isSaved, setIsSaved] = useState(userDetail.isSaved);
  const queryClient = useQueryClient();

  const { data: relatedUsers = [], isLoading: relatedLoading } = useQuery({
    queryKey: ['related-users', userDetail.category, userDetail.id],
    queryFn: () => galleryApi.getRelatedUsers(userDetail.category || 'art', userDetail.id),
    enabled: !!userDetail.category,
  });

  const likeMutation = useMutation({
    mutationFn: (newLikes: number) => galleryApi.updateUserLikes(userDetail.id, newLikes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-detail', userDetail.id] });
      toast.success(isLiked ? 'Liked!' : 'Removed from favorites');
    },
    onError: () => {
      setIsLiked(userDetail.isLiked);
      setLikesCount(userDetail.likes);
      toast.error('Failed to update like status');
    },
  });

  const saveMutation = useMutation({
    mutationFn: (newSavedState: boolean) => galleryApi.toggleSaveUser(userDetail.id, newSavedState),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-detail', userDetail.id] });
      toast.success(isSaved ? 'Saved to collection!' : 'Removed from collection');
    },
    onError: () => {
      setIsSaved(userDetail.isSaved);
      toast.error('Failed to update save status');
    },
  });

  const handleLikeToggle = () => {
    const newLikedState = !isLiked;
    const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;
    
    setIsLiked(newLikedState);
    setLikesCount(newLikesCount);

    likeMutation.mutate(newLikesCount);
  };

  const handleSaveToggle = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    saveMutation.mutate(newSavedState);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="aspect-square relative bg-muted">
              <ProgressiveImage
                src={userDetail.avatar}
                alt={`${userDetail.first_name} ${userDetail.last_name}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </Card>

          <div className="space-y-3">
            <Button
              onClick={handleLikeToggle}
              variant={isLiked ? "default" : "outline"}
              size="lg"
              className="w-full flex items-center gap-2 h-12"
              disabled={likeMutation.isPending}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Liked" : "Like"} ({likesCount})
            </Button>
            
            <Button
              onClick={handleSaveToggle}
              variant={isSaved ? "secondary" : "outline"}
              size="lg"
              className="w-full flex items-center gap-2 h-12"
              disabled={saveMutation.isPending}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              {userDetail.first_name} {userDetail.last_name}
            </h1>
            <p className="text-xl text-muted-foreground">
              {userDetail.email}
            </p>
          </div>
          {userDetail.tags && userDetail.tags.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Tag className="w-4 h-4" />
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {userDetail.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y">
            {userDetail.author && (
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Author</p>
                  <p className="font-medium">{userDetail.author}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="font-medium">
                  {formatDate(userDetail.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {userDetail.description && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">About</h3>
              <Card className="border-l-4 border-l-primary bg-card">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {userDetail.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {userDetail.category && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              More from {userDetail.category}
            </h2>
            <p className="text-muted-foreground">
              Discover more items in this category
            </p>
          </div>
          
          {relatedLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : relatedUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No other items found in this category.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
