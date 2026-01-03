'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { ArrowLeft, Wrench, DollarSign, Calendar, TrendingUp } from "lucide-react";

const helperSignupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(3, "Please enter your location"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type HelperSignupFormData = z.infer<typeof helperSignupSchema>;

export default function HelperSignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HelperSignupFormData>({
    resolver: zodResolver(helperSignupSchema),
  });

  const onSubmit = async (data: HelperSignupFormData) => {
    setIsLoading(true);
    
    try {
      const registrationData = {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        role: 'helper' as const,
        phone: data.phone,
        location: data.location,
      };

      const result = await AuthService.register(registrationData);
      
      if (result.success) {
        toast({
          title: "Welcome to AnyHelper!",
          description: "Your helper account has been created successfully. Start offering your services!",
        });
        
        router.push('/helper');
      } else {
        toast({
          title: "Registration Failed",
          description: result.error || result.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <Link href="/login">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Already have an account? <span className="ml-1 font-semibold">Sign in</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="space-y-8">
            <div>
              <Link 
                href="/signup" 
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to role selection
              </Link>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Wrench className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Join as a Helper</h1>
                  <p className="text-gray-600">Turn your skills into income</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Why helpers choose AnyHelper:</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Earn $25-75/hour</h3>
                    <p className="text-gray-600">Set your own rates and keep 85% of what you earn</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Flexible Schedule</h3>
                    <p className="text-gray-600">Work when you want, choose your own hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Grow Your Business</h3>
                    <p className="text-gray-600">Build your reputation and get repeat customers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4">Average Helper Earnings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$1,200</div>
                  <div className="text-sm text-gray-600">Per week (part-time)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$3,500</div>
                  <div className="text-sm text-gray-600">Per week (full-time)</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">🎉 Launch Bonus</h3>
              <p className="text-gray-700">Complete your first 5 jobs and earn a $100 bonus!</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-gray-900">Start Earning Today</CardTitle>
                <CardDescription className="text-gray-600">
                  Join thousands of helpers making money on their schedule
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700">First name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Jane" 
                        {...register("firstName")}
                        disabled={isLoading}
                        className="border-gray-300 focus:border-orange-500"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700">Last name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Smith" 
                        {...register("lastName")}
                        disabled={isLoading}
                        className="border-gray-300 focus:border-orange-500"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      {...register("email")}
                      disabled={isLoading}
                      className="border-gray-300 focus:border-orange-500"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      {...register("phone")}
                      disabled={isLoading}
                      className="border-gray-300 focus:border-orange-500"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-700">Service Location</Label>
                    <Input
                      id="location"
                      placeholder="San Francisco, CA"
                      {...register("location")}
                      disabled={isLoading}
                      className="border-gray-300 focus:border-orange-500"
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500">{errors.location.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a strong password"
                      {...register("password")}
                      disabled={isLoading}
                      className="border-gray-300 focus:border-orange-500"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Confirm your password"
                      {...register("confirmPassword")}
                      disabled={isLoading}
                      className="border-gray-300 focus:border-orange-500"
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 mt-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Start Earning as Helper"}
                  </Button>

                  <div className="text-center space-y-2 pt-4">
                    <p className="text-sm text-gray-600">
                      Need services instead?{" "}
                      <Link href="/signup/customer" className="text-orange-600 hover:text-orange-700 font-medium">
                        Join as a Customer
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}