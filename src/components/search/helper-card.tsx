"use client";

import Image from "next/image";
import { Star, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

interface HelperCardProps {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  unit: string;
  isVerified: boolean;
  isTopPro: boolean;
  imageUrl: string;
  imageHint: string;
  services: string[];
  location: string;
}

export function HelperCard({
  id,
  name,
  rating,
  reviews,
  price,
  unit,
  isVerified,
  isTopPro,
  imageUrl,
  imageHint,
  services,
  location,
}: HelperCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={imageUrl} alt={name} data-ai-hint={imageHint} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{name}</h3>
              <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                <Star className="h-4 w-4 fill-current" />
                <span>{rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{location}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {isVerified && (
                <Badge variant="secondary" className="gap-1 border-green-500/50 bg-green-100/50 text-green-800">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              {isTopPro && (
                <Badge variant="secondary" className="gap-1 border-purple-500/50 bg-purple-100/50 text-purple-800">
                  <Zap className="h-3 w-3" />
                  Top Pro
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Specializes in:</p>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <Badge key={service} variant="outline">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p>
              <span className="text-2xl font-bold">${price}</span>
              <span className="text-sm text-muted-foreground">/{unit}</span>
            </p>
          </div>
          <Link href={`/customer/helper/${id}`}>
            <Button size="sm">View Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
