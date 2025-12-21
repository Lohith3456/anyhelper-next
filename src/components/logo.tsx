import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image 
        src="https://arbitrary-tomato-hurla4tuwt-fopra91wf0.edgeone.dev/"
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
