import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-landing");

  return (
    <section className="relative bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Find & Book Local Pros On-Demand.
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 text-lg text-muted-foreground md:text-xl">
              AnyHelper Connect links you with trusted drivers, cleaners, plumbers, and more. Instantly.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center md:justify-start">
              <Link href="/customer">
                <Button size="lg">Find a Helper</Button>
              </Link>
              <Link href="/helper">
                <Button size="lg" variant="outline">
                  Become a Helper
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-64 md:h-auto md:w-full">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={400}
                data-ai-hint={heroImage.imageHint}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
