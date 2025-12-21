import { Suspense } from "react";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import { HelperCard } from "@/components/search/helper-card";
import { Skeleton } from "@/components/ui/skeleton";

const helpers = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

function SearchResults({ service }: { service: string | undefined }) {
  const serviceName = service ? service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Services";
  
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <FilterSidebar />
      </div>
      <div className="lg:col-span-3">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              {serviceName}
            </h1>
            <p className="text-muted-foreground">
              Showing {helpers.length} results
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {helpers.map((helper) => (
            <HelperCard key={helper.name} {...helper} />
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

export default function SearchPage({
  searchParams,
}: {
  searchParams?: {
    service?: string;
  };
}) {
  const service = searchParams?.service;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <Suspense fallback={<SearchLoading />}>
        <SearchResults service={service} />
      </Suspense>
    </div>
  );
}
