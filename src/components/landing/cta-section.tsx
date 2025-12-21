import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function CtaSection() {
  const ctaImage = PlaceHolderImages.find((img) => img.id === "cta-background");

  return (
    <section className="relative w-full py-20 md:py-32">
      {ctaImage && (
        <Image
          src={ctaImage.imageUrl}
          alt={ctaImage.description}
          fill
          data-ai-hint={ctaImage.imageHint}
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-primary/30"></div>
      <div className="container relative mx-auto px-4 text-center md:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            Ready to Simplify Your Life?
          </h2>
          <p className="mt-4 text-foreground/80 md:text-xl">
            Download the app to get started, or join our network of trusted professionals today.
          </p>
          <div className="mt-8 flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button size="lg">Download the App</Button>
            <Button size="lg" variant="outline" className="bg-background/80">
              Join as a Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
