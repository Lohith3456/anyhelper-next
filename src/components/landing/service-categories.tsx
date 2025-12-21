import {
  Car,
  Sparkles,
  Droplets,
  Plug,
  Hammer,
  Thermometer,
  Baby,
  BookOpen,
  Dog,
  Sprout,
  Truck,
  Scissors,
  Laptop,
  Wrench,
} from "lucide-react";

const services = [
  { icon: <Car />, name: "Drivers" },
  { icon: <Sparkles />, name: "Cleaners" },
  { icon: <Droplets />, name: "Plumbers" },
  { icon: <Plug />, name: "Electricians" },
  { icon: <Hammer />, name: "Carpenters" },
  { icon: <Thermometer />, name: "AC/Appliance Repair" },
  { icon: <Baby />, name: "Babysitters" },
  { icon: <BookOpen />, name: "Tutors" },
  { icon: <Dog />, name: "Pet Sitters" },
  { icon: <Sprout />, name: "Gardeners" },
  { icon: <Truck />, name: "Moving Helpers" },
  { icon: <Scissors />, name: "Beauty & Wellness" },
  { icon: <Laptop />, name: "Tech Support" },
  { icon: <Wrench />, name: "Handyman" },
];

export default function ServiceCategories() {
  return (
    <section id="services" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            A Helper for Every Need
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            From home repairs to personal care, find the right professional for any task.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {services.map((service) => (
            <div
              key={service.name}
              className="group flex flex-col items-center justify-center gap-2 rounded-lg border bg-background p-4 text-center transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer"
            >
              <div className="text-primary group-hover:text-primary-foreground">
                {service.icon}
              </div>
              <span className="text-sm font-medium">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
