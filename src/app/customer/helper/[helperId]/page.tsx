"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, ShieldCheck, Zap, Briefcase, Calendar, MessageSquare, CheckCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock data for a single helper. In a real app, you would fetch this based on params.helperId
const helperData = {
  id: "john-doe",
  name: "John Doe",
  rating: 4.8,
  reviewsCount: 125,
  price: 50,
  unit: 'hr',
  isVerified: true,
  isTopPro: true,
  imageUrl: "https://picsum.photos/seed/1/200/200",
  imageHint: "profile portrait",
  location: "San Francisco, CA",
  bio: "With over 10 years of experience in the cleaning industry, I pride myself on delivering top-notch service. My attention to detail is second to none, and I specialize in eco-friendly deep cleaning solutions. I'm punctual, reliable, and always leave a place sparkling. Your satisfaction is my guarantee!",
  skills: ["General Cleaning", "Deep Cleaning", "Eco-Friendly Cleaning", "Window Cleaning", "Move-out Cleaning"],
  stats: {
    jobsCompleted: 240,
    lastYearWorks: 150,
    experienceYears: 10,
    responseRate: "98%",
  },
  reviews: [
    {
      author: "Sarah L.",
      rating: 5,
      comment: "John was amazing! Our house has never been cleaner. He was professional, on time, and very thorough. Highly recommend!",
      date: "2 weeks ago",
    },
    {
      author: "Michael B.",
      rating: 5,
      comment: "Top-tier service. John's deep cleaning service is worth every penny. Will definitely hire him again.",
      date: "1 month ago",
    },
    {
      author: "Chen W.",
      rating: 4,
      comment: "Good job on the move-out cleaning. A few spots were missed but overall a very solid effort.",
      date: "3 months ago",
    },
  ]
};

export default function HelperProfilePage({ params }: { params: { helperId: string } }) {
  // In a real app, you would use params.helperId to fetch the correct helper's data.
  const helper = helperData;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left Column: Profile and Booking */}
        <div className="flex flex-col gap-8 lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 text-center">
              <Avatar className="mx-auto h-32 w-32 border-4 border-primary">
                <AvatarImage src={helper.imageUrl} alt={helper.name} data-ai-hint={helper.imageHint} />
                <AvatarFallback>{helper.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="mt-4 font-headline text-3xl font-bold">{helper.name}</h1>
              <p className="text-muted-foreground">{helper.location}</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                  <Star className="h-5 w-5 fill-current" />
                  <span>{helper.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">({helper.reviewsCount} reviews)</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {helper.isVerified && <Badge variant="secondary" className="gap-1 border-green-500/50 bg-green-100/50 text-green-800"><ShieldCheck className="h-3 w-3" />Verified</Badge>}
                {helper.isTopPro && <Badge variant="secondary" className="gap-1 border-purple-500/50 bg-purple-100/50 text-purple-800"><Zap className="h-3 w-3" />Top Pro</Badge>}
              </div>
            </CardContent>
            <Separator />
            <CardContent className="p-6">
              <p className="text-center">
                <span className="text-3xl font-bold">${helper.price}</span>
                <span className="text-muted-foreground">/{helper.unit}</span>
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg" className="mt-4 w-full">Book Now</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
                    <AlertDialogDescription>
                      To book a helper, you need to upgrade to our Pro plan. Unlock exclusive features like instant booking, direct contact with helpers, and more.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Upgrade</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details and Reviews */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Stats Card */}
          <Card>
            <CardContent className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-4">
              <div className="text-center">
                <Briefcase className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-2xl font-bold">{helper.stats.jobsCompleted}</p>
                <p className="text-sm text-muted-foreground">Jobs Completed</p>
              </div>
              <div className="text-center">
                <Calendar className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-2xl font-bold">{helper.stats.lastYearWorks}</p>
                <p className="text-sm text-muted-foreground">Works in Last Year</p>
              </div>
              <div className="text-center">
                <CheckCircle className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-2xl font-bold">{helper.stats.experienceYears} yrs</p>
                <p className="text-sm text-muted-foreground">Experience</p>
              </div>
              <div className="text-center">
                <MessageSquare className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-2xl font-bold">{helper.stats.responseRate}</p>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </div>
            </CardContent>
          </Card>
        
          {/* About Me Card */}
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{helper.bio}</p>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {helper.skills.map(skill => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </CardContent>
          </Card>

          {/* Reviews Card */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {helper.reviews.map((review, index) => (
                <div key={index} className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{review.author}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                      <p className="mt-2 text-sm text-foreground">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
