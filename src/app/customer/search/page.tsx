"use client";

import { Suspense, useState, useMemo, useCallback } from "react";
import { FilterSidebar, Filters } from "@/components/search/filter-sidebar";
import { HelperCard } from "@/components/search/helper-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

const allHelpers = [
  {
    id: "john-doe",
    name: "John Doe",
    rating: 4.8,
    reviews: 125,
    price: 50,
    unit: 'hr',
    isVerified: true,
    isTopPro: true,
    imageUrl: "https://picsum.photos/seed/1/200/200",
    imageHint: "profile portrait",
    services: ["General Cleaning", "Deep Cleaning"],
    location: "San Francisco, CA",
    availableDates: ["2024-08-15", "2024-08-20"],
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    rating: 4.9,
    reviews: 89,
    price: 60,
    unit: 'hr',
    isVerified: true,
    isTopPro: false,
    imageUrl: "https://picsum.photos/seed/2/200/200",
    imageHint: "profile portrait",
    services: ["Office Cleaning"],
    location: "Oakland, CA",
    availableDates: ["2024-08-16"],
  },
  {
    id: "mike-johnson",
    name: "Mike Johnson",
    rating: 4.5,
    reviews: 45,
    price: 45,
    unit: 'hr',
    isVerified: true,
    isTopPro: false,
    imageUrl: "https://picsum.photos/seed/3/200/200",
    imageHint: "profile portrait",
    services: ["Window Cleaning", "Carpet Cleaning"],
    location: "San Francisco, CA",
    availableDates: ["2024-08-15", "2024-08-22"],
  },
  {
    id: "emily-davis",
    name: "Emily Davis",
    rating: 5.0,
    reviews: 210,
    price: 75,
    unit: 'hr',
    isVerified: true,
    isTopPro: true,
    imageUrl: "https://picsum.photos/seed/4/200/200",
    imageHint: "profile portrait",
    services: ["Move-out Cleaning", "Eco-Friendly Cleaning"],
    location: "Berkeley, CA",
    availableDates: ["2024-08-25"],
  },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service");

  const [filters, setFilters] = useState<Filters>({
    sortBy: "recommended",
    priceRange: [10],
    availability: undefined,
    topPro: false,
    verified: false,
  });

  const handleFilterChange = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({...prev, ...newFilters}));
  }, []);

  const filteredHelpers = useMemo(() => {
    let helpers = [...allHelpers];

    // Filter by price
    helpers = helpers.filter(h => h.price >= filters.priceRange[0]);

    // Filter by availability
    if (filters.availability) {
      // The selected date needs to be formatted to 'YYYY-MM-DD' to match the data.
      const selectedDate = filters.availability.toLocaleDateString('en-CA');
      helpers = helpers.filter(h => h.availableDates.includes(selectedDate));
    }

    // Filter by tier
    if (filters.topPro) {
      helpers = helpers.filter(h => h.isTopPro);
    }
    if (filters.verified) {
      helpers = helpers.filter(h => h.isVerified);
    }

    // Sort
    switch (filters.sortBy) {
      case 'rating':
        helpers.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        helpers.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        helpers.sort((a, b) => b.price - a.price);
        break;
      default: // recommended
        helpers.sort((a, b) => b.reviews - a.reviews);
    }
    
    return helpers;
  }, [filters]);

  const serviceName = service ? service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Services";
  
  // For now, onApply is a no-op but in a real app would trigger a fetch
  const handleApply = () => { console.log("Applying filters:", filters) };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <FilterSidebar 
          filters={filters} 
          onFilterChange={handleFilterChange}
          onApply={handleApply}
        />
      </div>
      <div className="lg:col-span-3">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              {serviceName}
            </h1>
            <p className="text-muted-foreground">
              Showing {filteredHelpers.length} results
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredHelpers.map((helper) => (
            <HelperCard key={helper.id} {...helper} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchLoading() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <Skeleton className="h-[600px] w-full" />
      </div>
      <div className="lg:col-span-3">
        <div className="mb-6">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="mt-2 h-5 w-32" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <Suspense fallback={<SearchLoading />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
