"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="text-6xl font-bold px-6 py-3">
              404
            </Badge>
          </div>
          <CardTitle className="text-3xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            <p className="text-lg">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <p className="text-sm mt-2">
              The page might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <Separator />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
          
          <div className="text-center">
            <Button variant="ghost" asChild className="w-full">
              <Link href="/">
                <Search className="mr-2 h-4 w-4" />
                Search or browse our gallery
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
