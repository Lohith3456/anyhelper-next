"use client";

import Link from "next/link";

export default function SignupRoleSelection() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold">Choose how you want to use AnyHelper</h1>
        <p className="mt-3 text-muted-foreground">Select a role to see what you can do. Sign up is disabled for now — these pages show available features.</p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/customer" className="block rounded-lg border p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold">I'm a Customer</h2>
            <p className="mt-2 text-sm text-muted-foreground">Find local professionals, compare prices, and book instantly.</p>
          </Link>

          <Link href="/helper" className="block rounded-lg border p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold">I'm a Helper</h2>
            <p className="mt-2 text-sm text-muted-foreground">Offer services, manage bookings, and grow your business.</p>
          </Link>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Authentication will be implemented later; for now these pages explain available features.</p>
        </div>
      </div>
    </div>
  );
}
