"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/gallery";
import Image from "next/image";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-0">
      <div className="aspect-square relative bg-gradient-to-br from-blue-100 to-purple-100">
        <Image
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>

      <CardContent className="px-4 py-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {user.email}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              ID: {user.id}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
