'use client';

import Link from "next/link";

export default function CustomerSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Sign up has been removed</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create accounts have been disabled. Please contact the maintainers if you need access.</p>
        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:underline">Return home</Link>
        </div>
      </div>
    </div>
  );
}


}