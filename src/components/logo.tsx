import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
      >
        <path
          d="M10.8333 11.6667C12.8721 11.6667 14.5 10.0388 14.5 8C14.5 5.96121 12.8721 4.33333 10.8333 4.33333C8.79452 4.33333 7.16667 5.96121 7.16667 8C7.16667 10.0388 8.79452 11.6667 10.8333 11.6667Z"
          fill="#1E429F"
        />
        <path
          d="M21.1667 11.6667C23.2055 11.6667 24.8333 10.0388 24.8333 8C24.8333 5.96121 23.2055 4.33333 21.1667 4.33333C19.1279 4.33333 17.5 5.96121 17.5 8C17.5 10.0388 19.1279 11.6667 21.1667 11.6667Z"
          fill="#F97316"
        />
        <path
          d="M19.9915 28C20.5915 28 21.0832 27.3833 21.0832 26.6667V17.9167C21.0832 17.2 20.5915 16.5833 19.9915 16.5833L16.4167 19.5V28H19.9915Z"
          fill="#F97316"
        />
        <path
          d="M12.0085 28C11.4085 28 10.9167 27.3833 10.9167 26.6667V17.9167C10.9167 17.2 11.4085 16.5833 12.0085 16.5833L15.5833 19.5V28H12.0085Z"
          fill="#1E429F"
        />
        <path
          d="M17.8333 16.1667L19.6667 14.6667L12.3333 14.6667L14.1667 16.1667L16 17.5L17.8333 16.1667Z"
          fill="url(#paint0_linear_1_2)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1_2"
            x1="16"
            y1="14.6667"
            x2="16"
            y2="17.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1E429F" />
            <stop offset="1" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </svg>

      <span className="font-headline text-xl font-bold">
        <span style={{ color: "#1E429F" }}>Any</span>
        <span style={{ color: "#F97316" }}>Helper</span>
      </span>
    </div>
  );
}
