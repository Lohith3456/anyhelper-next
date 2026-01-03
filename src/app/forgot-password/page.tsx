'use client';

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Password reset has been removed</h1>
        <p className="mt-2 text-sm text-muted-foreground">Password reset functionality is disabled. Please contact support for account help.</p>
        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:underline">Return home</Link>
        </div>
      </div>
    </div>
  );
}

