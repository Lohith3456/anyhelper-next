import Link from "next/link";
import { CheckCircle, Clock, Star } from "lucide-react";

export default function HelperPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          Become a Helper — What you can do
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Earn on your schedule by offering local services to nearby customers. No sign up for now — learn more about how it works.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-md"><CheckCircle className="h-6 w-6 text-green-600"/></div>
            <h3 className="text-lg font-semibold">Get Paid</h3>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Set your rates and get paid for completed jobs.</p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-md"><Clock className="h-6 w-6 text-blue-600"/></div>
            <h3 className="text-lg font-semibold">Flexible Schedule</h3>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Choose jobs that fit your availability and location.</p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-md"><Star className="h-6 w-6 text-yellow-600"/></div>
            <h3 className="text-lg font-semibold">Build Reputation</h3>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Earn reviews and grow repeat customers over time.</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">Registration and authentication are temporarily disabled. We'll enable sign-up later.</p>
        <div className="mt-6">
          <Link href="/" className="inline-block rounded-md bg-slate-900 text-white px-4 py-2">Return home</Link>
        </div>
      </div>
    </div>
  );
}

    