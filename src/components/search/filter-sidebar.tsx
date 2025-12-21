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
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export function FilterSidebar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="sort-by">Sort by</Label>
          <Select defaultValue="recommended">
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
            <span>$10</span>
            <span>$200+</span>
          </div>
          <Slider defaultValue={[50]} max={200} step={10} />
        </div>

        <div className="space-y-4">
          <Label>Availability</Label>
          <Input type="date" />
        </div>

        <div className="space-y-4">
          <Label>Helper Tiers</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="top-pro" />
              <Label htmlFor="top-pro" className="font-normal">
                Top Pro
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="verified" />
              <Label htmlFor="verified" className="font-normal">
                Verified
              </Label>
            </div>
          </div>
        </div>
        
        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
}
