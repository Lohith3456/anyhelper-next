import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image 
        src="https://img.sanishtech.com/u/78ff160f2aec7f08aff84eb03e2484fc.png"
        alt="AnyHelper Logo"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="font-headline text-xl font-bold">
        <span style={{ color: "#1E429F" }}>Any</span>
        <span style={{ color: "#F97316" }}>Helper</span>
      </span>
    </div>
  );
}
