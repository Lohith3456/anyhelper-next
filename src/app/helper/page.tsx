import { HelperRegistrationForm } from "@/components/forms/helper-registration-form";

export default function HelperPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          Join Our Network of Professionals
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fill out the form below to start your journey as a service agent with AnyHelper Connect.
        </p>
      </div>
      <HelperRegistrationForm />
    </div>
  );
}
