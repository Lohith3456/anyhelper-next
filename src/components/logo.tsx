import { Hand } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Hand className="h-6 w-6 text-primary" />
      <span className="font-headline text-xl font-bold text-foreground">
        AnyHelper Connect
      </span>
    </div>
  );
}
