"use client";

import { Suspense, useState, useMemo, useCallback, useEffect } from "react";
import { FilterSidebar, Filters } from "@/components/search/filter-sidebar";
import { HelperCard } from "@/components/search/helper-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { IntelligentSearch } from "@/components/search/intelligent-search";

const allHelpers = [
  // Cleaners
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
  // Drivers
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
  {
    id: 'brian-king',
    name: 'Brian King',
    rating: 4.9,
    reviews: 150,
    price: 65,
    unit: 'hr',
    isVerified: true,
    isTopPro: true,
    imageUrl: 'https://picsum.photos/seed/6/200/200',
    imageHint: "profile portrait",
    services: ['City Tours', 'Long Distance'],
    category: 'drivers',
    location: 'Daly City, CA',
    availableDates: ['2024-08-19', '2024-08-23'],
  },
  // Plumbers
  {
    id: 'carlos-reid',
    name: 'Carlos Reid',
    rating: 4.6,
    reviews: 95,
    price: 80,
    unit: 'hr',
    isVerified: true,
    isTopPro: false,
    imageUrl: 'https://picsum.photos/seed/7/200/200',
    imageHint: "profile portrait",
    services: ['Leak Repair', 'Drain Cleaning'],
    category: 'plumbers',
    location: 'San Mateo, CA',
    availableDates: ['2024-08-17', '2024-08-24'],
  },
  {
    id: 'samantha-jones',
    name: 'Samantha Jones',
    rating: 4.9,
    reviews: 180,
    price: 95,
    unit: 'hr',
    isVerified: true,
    isTopPro: true,
    imageUrl: 'https://picsum.photos/seed/8/200/200',
    imageHint: "profile portrait",
    services: ['Fixture Installation', 'Pipe Replacement'],
    category: 'plumbers',
    location: 'Palo Alto, CA',
    availableDates: ['2024-08-20', '2024-08-28'],
  },
  // Electricians
  {
    id: 'david-lee',
    name: 'David Lee',
    rating: 4.8,
    reviews: 112,
    price: 90,
    unit: 'hr',
    isVerified: true,
    isTopPro: true,
    imageUrl: 'https://picsum.photos/seed/9/200/200',
    imageHint: "profile portrait",
    services: ['Wiring', 'Light Fixture Installation'],
    category: 'electricians',
    location: 'San Jose, CA',
    availableDates: ['2024-08-19', '2024-08-26'],
  },
  // Carpenters
  {
    id: 'frank-white',
    name: 'Frank White',
    rating: 4.7,
    reviews: 68,
    price: 70,
    unit: 'hr',
    isVerified: true,
    isTopPro: false,
    imageUrl: 'https://picsum.photos/seed/10/200/200',
    imageHint: "profile portrait",
    services: ['Custom Furniture', 'Deck Repair'],
    category: 'carpenters',
    location: 'Walnut Creek, CA',
    availableDates: ['2024-08-21', '2024-08-27'],
  },
  // AC/Appliance Repair
  {
    id: 'grace-hall',
    name: 'Grace Hall',
    rating: 4.9,
    reviews: 130,
    price: 85,
    unit: 'service',
    isVerified: true,
    isTopPro: true,
    imageUrl: 'https://picsum.photos/seed/11/200/200',
    imageHint: "profile portrait",
    services: ['AC Repair', 'Refrigerator Repair'],
    category: 'ac-appliance-repair',
    location: 'Fremont, CA',
    availableDates: ['2024-08-18', '2024-08-29'],
  },
  // Babysitters
  {
    id: 'helen-young',
    name: 'Helen Young',
    rating: 5.0,
    reviews: 250,
    price: 25,
    unit: 'hr',
    isVerified: true,
    isTopPro: true,
    imageUrl: 'https://picsum.photos/seed/12/200/200',
    imageHint: "profile portrait",
    services: ['Infant Care', 'After-school'],
    category: 'babysitters',
    location: 'San Francisco, CA',
    availableDates: ['2024-08-15', '2024-08-22', '2024-08-29'],
  },
  // Tutors
  {
    id: 'ian-clark',
    name: 'Ian Clark',
    rating: 4.8,
    reviews: 90,
    price: 40,
    unit: 'hr',
    isVerified: true,
    isTopPro: false,
    imageUrl: 'https://picsum.photos/seed/13/200/200',
    imageHint: "profile portrait",
    services: ['Math Tutoring', 'SAT Prep'],
    category: 'tutors',
    location: 'Berkeley, CA',
    availableDates: ['2024-08-16', '2024-08-23'],
  },
  // Pet Sitters
  {
    id: 'judy-adams',
    name: 'Judy Adams',
    rating: 4.9,
    reviews: 180,
    price: 30,
    unit: 'day',
    isVerified: true,
    isTopPro: true,
    imageUrl: 'https://picsum.photos/seed/14/200/200',
    imageHint: "profile portrait",
    services: ['Dog Walking', 'Overnight Sitting'],
    category: 'pet-sitters',
    location: 'Oakland, CA',
    availableDates: ['2024-08-20', '2024-08-25'],
  },
  // Gardeners
  {
    id: 'kevin-baker',
    name: 'Kevin Baker',
    rating: 4.7,
    reviews: 85,
    price: 55,
    unit: 'hr',
    isVerified: true,
    isTopPro: false,
    imageUrl: 'https://picsum.photos/seed/15/200/200',
    imageHint: "profile portrait",
    services: ['Lawn Mowing', 'Weeding'],
    category: 'gardeners',
    location: 'Marin, CA',
    availableDates: ['2024-08-17', '2024-08-24'],
  },
  // Moving Helpers
  {
    id: 'leo-green',
    name: 'Leo Green',
    rating: 4.6,
    reviews: 110,
    price: 75,
    unit: 'hr',
    isVerified: true,
    isTopPro: false,
    imageUrl: 'https://picsum.photos/seed/16/200/200',
    imageHint: "profile portrait",
    services: ['Loading/Unloading', 'Packing'],
    category: 'moving-helpers',
    location: 'San Francisco, CA',
    availableDates: ['2024-08-18', '2024-08-25'],
  },
  // Beauty & Wellness
  {
    id: 'mona-lewis',
    name: 'Mona Lewis',
    rating: 4.9,
    reviews: 220,
    price: 100,
    unit: 'session',
    isVerified: true,
    isTopPro: true,
    imageUrl: 'https://picsum.photos/seed/17/200/200',
    imageHint: "profile portrait",
    services: ['Makeup Artist', 'Massage Therapy'],
    category: 'beauty-wellness',
    location: 'San Francisco, CA',
    availableDates: ['2024-08-21', '2024-08-28'],
  },
  // Tech Support
  {
    id: 'nate-river',
    name: 'Nate River',
    rating: 4.8,
    reviews: 140,
    price: 60,
    unit: 'hr',
    isVerified: true,
    isTopPro: true,
    imageUrl: 'https://picsum.photos/seed/18/200/200',
    imageHint: "profile portrait",
    services: ['PC Repair', 'Network Setup'],
    category: 'tech-support',
    location: 'Mountain View, CA',
    availableDates: ['2024-08-22', '2024-08-29'],
  },
  // Handyman
  {
    id: 'oscar-perez',
    name: 'Oscar Perez',
    rating: 4.7,
    reviews: 160,
    price: 65,
    unit: 'hr',
    isVerified: true,
    isTopPro: false,
    imageUrl: 'https://picsum.photos/seed/19/200/200',
    imageHint: "profile portrait",
    services: ['TV Mounting', 'Furniture Assembly'],
    category: 'handyman',
    location: 'San Bruno, CA',
    availableDates: ['2024-08-15', '2024-08-30'],
  },
];

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [aiHelpers, setAiHelpers] = useState<any[] | null>(null);
  const [aiSearchParams, setAiSearchParams] = useState<any | null>(null);

  // Initialize service from URL or AI search params
  const getInitialService = () => {
    const params = searchParams.get("service");
    const aiParams = sessionStorage.getItem('ai-search-params');
    if (aiParams) {
      const parsed = JSON.parse(aiParams);
      return parsed.serviceType.toLowerCase().replace(/ /g, '-');
    }
    return params || "cleaners";
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

      // Clean up session storage
      sessionStorage.removeItem('ai-search-results');
      sessionStorage.removeItem('ai-search-params');
    } else {
       const serviceFromUrl = searchParams.get("service");
       if(serviceFromUrl) {
        setService(serviceFromUrl);
       }
    }
  }, [searchParams]);

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
    const params = new URLSearchParams();
    params.set('service', service);
    router.push(`/customer/search?${params.toString()}`);
  };

  const handleAiSearch = (results: any[], searchParams: any) => {
    // Store results and params to pass to the search page
    setAiHelpers(results);
    setAiSearchParams(searchParams);
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
        <div className="mb-8">
           <IntelligentSearch serviceType={service} onSearchResults={handleAiSearch} />
        </div>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
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

    