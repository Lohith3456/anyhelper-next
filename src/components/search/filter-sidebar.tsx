"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface Filters {
  sortBy: string;
  priceRange: number[];
  availability: Date | undefined;
  topPro: boolean;
  verified: boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
  onApply: () => void;
}

export function FilterSidebar({ filters, onFilterChange, onApply }: FilterSidebarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="sort-by">Sort by</Label>
          <Select 
            value={filters.sortBy} 
            onValueChange={(value) => onFilterChange({ sortBy: value })}
          >
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Price Range</Label>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>$200+</span>
          </div>
          <Slider 
            value={filters.priceRange} 
            onValueChange={(value) => onFilterChange({ priceRange: value })}
            max={200} 
            step={10}
            min={10}
          />
        </div>

        <div className="space-y-4">
          <Label>Availability</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.availability && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.availability ? format(filters.availability, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.availability}
                onSelect={(date) => onFilterChange({ availability: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <Label>Helper Tiers</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="top-pro" 
                checked={filters.topPro}
                onCheckedChange={(checked) => onFilterChange({ topPro: !!checked })}
              />
              <Label htmlFor="top-pro" className="font-normal">
                Top Pro
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verified"
                checked={filters.verified}
                onCheckedChange={(checked) => onFilterChange({ verified: !!checked })}
              />
              <Label htmlFor="verified" className="font-normal">
                Verified
              </Label>
            </div>
          </div>
        </div>
        
        <Button className="w-full" onClick={onApply}>Apply Filters</Button>
      </CardContent>
    </Card>
  );
}
