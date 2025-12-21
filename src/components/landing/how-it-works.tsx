import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search, UserPlus, CheckCircle } from "lucide-react";

const customerSteps = [
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "1. Search for a Service",
    description: "Browse categories or search for specific professionals. Filter by price, rating, and location.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "2. Book & Pay Securely",
    description: "Choose your helper, select a time that works for you, and pay securely through the app.",
  },
  {
    icon: <UserPlus className="h-10 w-10 text-primary" />,
    title: "3. Get the Job Done",
    description: "Your verified helper arrives and completes the task. Leave a review to help the community!",
  },
];

const agentSteps = [
  {
    icon: <UserPlus className="h-10 w-10 text-primary" />,
    title: "1. Create Your Profile",
    description: "Sign up, get verified, and set up your professional profile with your skills and experience.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "2. Set Your Terms",
    description: "Define your services, set your availability, and use our AI tool to price your work competitively.",
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "3. Get Booked & Earn",
    description: "Receive booking requests, manage your schedule with our smart assistant, and get paid securely.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get Started in Minutes
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Joining AnyHelper Connect is quick and easy. Here’s how.
          </p>
        </div>
        <Tabs defaultValue="customer" className="mt-12 w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="customer">For Customers</TabsTrigger>
            <TabsTrigger value="agent">For Service Agents</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {customerSteps.map((step) => (
                <Card key={step.title} className="text-center">
                  <CardContent className="flex flex-col items-center gap-4 p-6">
                    {step.icon}
                    <h3 className="font-headline text-lg font-bold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="agent">
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {agentSteps.map((step) => (
                <Card key={step.title} className="text-center">
                  <CardContent className="flex flex-col items-center gap-4 p-6">
                    {step.icon}
                    <h3 className="font-headline text-lg font-bold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
