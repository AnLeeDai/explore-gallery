"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/gallery";
import { useRouter } from "next/navigation";
import { ProgressiveImage } from "@/components/progressive-image";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/item/${user.id}`);
  };

  return (
    <Card 
      className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-card"
      onClick={handleClick}
    >
      <div className="aspect-square relative bg-muted overflow-hidden">
        <ProgressiveImage
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-base leading-tight line-clamp-1">
            {user.first_name} {user.last_name}
          </h3>
          {user.author && (
            <p className="text-xs font-medium text-muted-foreground">
              by {user.author}
            </p>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {user.description || user.email}
        </p>
        
        <div className="flex items-center justify-between pt-1">
          {user.category && (
            <Badge variant="secondary" className="text-xs font-medium">
              {user.category}
            </Badge>
          )}
          {user.likes !== undefined && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {user.likes}
            </div>
          )}
        </div>
        
        {user.tags && user.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {user.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs py-0 h-5">
                {tag}
              </Badge>
            ))}
            {user.tags.length > 2 && (
              <Badge variant="outline" className="text-xs py-0 h-5">
                +{user.tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
