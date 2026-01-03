import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image 
        src="https://img.sanishtech.com/u/21d55c0eae09f26b3bae1c8ee6a61616.png"
        alt="AnyHelper Logo"
        width={40}
        height={40}
        className="h-10 w-10"
      />
      <span className="font-headline text-2xl font-bold">
        <span style={{ color: "#1E429F" }}>Any</span>
        <span style={{ color: "#F97316" }}>Helper</span>
      </span>
    </div>
  );
}
