import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";
import { Logo } from "@/components/logo";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting you with trusted local service professionals.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#services" className="text-muted-foreground hover:text-foreground">Cleaning</Link></li>
              <li><Link href="#services" className="text-muted-foreground hover:text-foreground">Plumbing</Link></li>
              <li><Link href="#services" className="text-muted-foreground hover:text-foreground">Electrician</Link></li>
              <li><Link href="#services" className="text-muted-foreground hover:text-foreground">More...</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between border-t pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AnyHelper. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Twitter /></Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Github /></Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Linkedin /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
