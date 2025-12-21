"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCategories from "@/components/landing/service-categories";
import { IntelligentSearch } from "@/components/search/intelligent-search";

const recentlyViewedServices = [
  { name: "House Cleaning", category: "Cleaners" },
  { name: "Leaky Faucet Repair", category: "Plumbers" },
  { name: "TV Wall Mounting", category: "Handyman" },
  { name: "Dog Walking", category: "Pet Sitters" },
];

export default function CustomerPage() {
  const router = useRouter();
  const [serviceType, setServiceType] = useState("cleaners"); // Default service type

  const handleAiSearch = (results: any[], searchParams: any) => {
    // Store results and params to pass to the search page
    sessionStorage.setItem('ai-search-results', JSON.stringify(results));
    sessionStorage.setItem('ai-search-params', JSON.stringify(searchParams));
    router.push(`/customer/search`);
  };

  return (
    <>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
              What service are you looking for?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Describe your needs below, or select a category to find the right professional.
            </p>
          </div>
          <div className="mt-8 mx-auto max-w-4xl">
            <IntelligentSearch serviceType={serviceType} onSearchResults={handleAiSearch} />
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
            Recently Viewed
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewedServices.map((service) => (
              <Link href={`/customer/search?service=${service.category.toLowerCase().replace(/ /g, '-')}`} key={service.name}>
                <Card className="flex h-full cursor-pointer flex-col justify-between transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Viewed 2 hours ago</span>
                    </div>
                    <h3 className="mt-2 font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      in {service.category}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ServiceCategories />
    </>
  );
}
