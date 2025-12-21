
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Bot, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { intelligentServiceMatching } from "@/ai/flows/intelligent-service-matching";
import { useToast } from "@/hooks/use-toast";

interface IntelligentSearchProps {
  serviceType: string;
  onSearchResults: (results: any[]) => void;
}

export function IntelligentSearch({ serviceType, onSearchResults }: IntelligentSearchProps) {
  const [date, setDate] = useState<Date>();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!description || !date) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide a description and select a date.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const results = await intelligentServiceMatching({
        requestDescription: description,
        customerLocation: "San Francisco, CA", // Mock location
        serviceType: serviceType,
        availableTime: date.toISOString(),
      });
      onSearchResults(results);
      toast({
        title: "AI Search Complete",
        description: "We've found the best helpers for your request.",
      });
    } catch (error) {
      console.error("AI search failed:", error);
      toast({
        variant: "destructive",
        title: "AI Search Failed",
        description: "Could not find helpers at this time. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-background">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Intelligent Search</CardTitle>
        </div>
        <CardDescription>
          Describe what you need, and our AI will find the perfect helper for the job.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Input
              placeholder={`e.g., "I need to clean my 2-bedroom apartment before a party"`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
                disabled={isLoading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date() || isLoading}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              "Searching..."
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Find My Helper
                </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
