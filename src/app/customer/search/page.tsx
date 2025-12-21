"use client";

import { Suspense, useState, useMemo, useCallback, useEffect } from "react";
import { FilterSidebar, Filters } from "@/components/search/filter-sidebar";
import { HelperCard } from "@/components/search/helper-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams, useRouter } from "next/navigation";

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
    category: "cleaners",
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
    category: "cleaners",
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
    category: "cleaners",
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
    category: "cleaners",
    location: "Berkeley, CA",
    availableDates: ["2024-08-25"],
  },
  {
    id: "alex-chen",
    name: "Alex Chen",
    rating: 4.7,
    reviews: 78,
    price: 55,
    unit: 'hr',
    isVerified: true,
    isTopPro: false,
    imageUrl: "https://picsum.photos/seed/5/200/200",
    imageHint: "profile portrait",
    services: ["Residential Driving", "Airport Transfers"],
    category: "drivers",
    location: "San Francisco, CA",
    availableDates: ["2024-08-18", "2024-08-21"],
  },
];

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [aiHelpers, setAiHelpers] = useState<any[] | null>(null);
  const [aiSearchParams, setAiSearchParams] = useState<any | null>(null);

  // Initialize service from URL or AI search params
  const getInitialService = () => {
    if (aiSearchParams) {
      return aiSearchParams.serviceType.toLowerCase().replace(/ /g, '-');
    }
    return searchParams.get("service") || "cleaners";
  }

  const [service, setService] = useState(getInitialService);

  const [filters, setFilters] = useState<Filters>({
    sortBy: "recommended",
    priceRange: [10],
    availability: undefined,
    topPro: false,
    verified: false,
  });

  useEffect(() => {
    const results = sessionStorage.getItem('ai-search-results');
    const params = sessionStorage.getItem('ai-search-params');
    if (results && params) {
      const parsedResults = JSON.parse(results);
      const parsedParams = JSON.parse(params);
      setAiHelpers(parsedResults);
      setAiSearchParams(parsedParams);
      const serviceFromAI = parsedParams.serviceType.toLowerCase().replace(/ /g, '-');
      setService(serviceFromAI);
      // Set availability filter from AI search
      setFilters(prev => ({ ...prev, availability: new Date(parsedParams.availableTime) }));

      sessionStorage.removeItem('ai-search-results');
      sessionStorage.removeItem('ai-search-params');
    }
  }, []);

  const handleFilterChange = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({...prev, ...newFilters}));
    setAiHelpers(null); // Clear AI results when filters change manually
  }, []);

  const handleServiceChange = (newService: string) => {
    setService(newService);
    setAiHelpers(null); // Clear AI results when service changes
    setAiSearchParams(null);
    router.push(`/customer/search?service=${newService}`);
  };

  const filteredHelpers = useMemo(() => {
    if (aiHelpers) {
      return allHelpers.filter(h => aiHelpers.some(ah => ah.agentId === h.id));
    }

    let helpers = allHelpers.filter(h => h.category === service);

    // Filter by price
    helpers = helpers.filter(h => h.price >= filters.priceRange[0]);

    // Filter by availability
    if (filters.availability) {
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
  }, [filters, service, aiHelpers]);

  const serviceName = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const handleApply = () => { 
    setAiHelpers(null);
    setAiSearchParams(null);
    console.log("Applying filters:", filters);
    // Update URL to reflect filters if needed
    const params = new URLSearchParams();
    params.set('service', service);
    // You could add other filters to params here if you want them to be shareable
    router.push(`/customer/search?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <FilterSidebar 
          filters={filters} 
          onFilterChange={handleFilterChange}
          onApply={handleApply}
          currentService={service}
          onServiceChange={handleServiceChange}
        />
      </div>
      <div className="lg:col-span-3">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              {aiHelpers ? 'AI Recommended Helpers' : serviceName}
            </h1>
            {aiSearchParams?.requestDescription && (
              <p className="text-muted-foreground mt-1 italic">
                For: &quot;{aiSearchParams.requestDescription}&quot;
              </p>
            )}
            <p className="text-muted-foreground mt-2">
              Showing {filteredHelpers.length} results
            </p>
          </div>
        </div>
        {filteredHelpers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredHelpers.map((helper) => (
                <HelperCard key={helper.id} {...helper} />
            ))}
            </div>
        ) : (
            <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No helpers found matching your criteria.</p>
            </div>
        )}
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
