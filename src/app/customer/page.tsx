import ServiceCategories from "@/components/landing/service-categories";

export default function CustomerPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          What service are you looking for?
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select a category to find the right professional for your needs.
        </p>
      </div>
      <ServiceCategories />
    </div>
  );
}
