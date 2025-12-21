import {
  Bot,
  DollarSign,
  CalendarClock,
  Search,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Intelligent Service Matching",
    description:
      "Our AI matches you with the perfect service agent based on skills, location, and reviews, ensuring quality and speed.",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: "Dynamic Pricing Tool",
    description:
      "AI-powered pricing suggestions help agents optimize their earnings based on market demand and service complexity.",
  },
  {
    icon: <CalendarClock className="h-8 w-8 text-primary" />,
    title: "Smart Scheduling Assistant",
    description:
      "Automated booking management and reminders for both customers and agents to reduce no-shows and optimize time.",
  },
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "Advanced Search & Filtering",
    description:
      "Easily find what you need with detailed filters for ratings, price, availability, and specific skills.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "Real-time Communication",
    description:
      "Seamlessly connect with your service provider through in-app chat and call features for clear communication.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Secure & Verified",
    description:
      "All service agents are verified for your safety, with secure payments processed for every transaction.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Choose AnyHelper Connect?
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            A smarter, safer, and simpler way to get things done.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col items-center text-center p-6 transition-transform hover:scale-105 hover:shadow-xl">
              <CardHeader className="p-0">
                {feature.icon}
                <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
