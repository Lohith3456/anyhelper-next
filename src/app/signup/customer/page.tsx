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
import { ArrowLeft, Users, Shield, Star, Clock } from "lucide-react";

const customerSignupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type CustomerSignupFormData = z.infer<typeof customerSignupSchema>;

export default function CustomerSignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerSignupFormData>({
    resolver: zodResolver(customerSignupSchema),
  });

  const onSubmit = async (data: CustomerSignupFormData) => {
    setIsLoading(true);
    
    try {
      const registrationData = {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        role: 'customer' as const,
      };

      const result = await AuthService.register(registrationData);
      
      if (result.success) {
        toast({
          title: "Welcome to AnyHelper!",
          description: "Your customer account has been created successfully.",
        });
        
        router.push('/customer');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
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
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to role selection
              </Link>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Join as a Customer</h1>
                  <p className="text-gray-600">Get help with any task, anytime</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Why customers love AnyHelper:</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Verified Professionals</h3>
                    <p className="text-gray-600">All helpers are background-checked and insured</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Same-Day Service</h3>
                    <p className="text-gray-600">Book instantly and get help when you need it</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Satisfaction Guaranteed</h3>
                    <p className="text-gray-600">100% satisfaction guarantee or your money back</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Popular Services</h3>
              <div className="flex flex-wrap gap-2">
                {['House Cleaning', 'Handyman', 'Moving Help', 'Furniture Assembly', 'Plumbing', 'Electrical'].map((service) => (
                  <span key={service} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-gray-900">Create Your Account</CardTitle>
                <CardDescription className="text-gray-600">
                  Start booking trusted local helpers today
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700">First name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        {...register("firstName")}
                        disabled={isLoading}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700">Last name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        {...register("lastName")}
                        disabled={isLoading}
                        className="border-gray-300 focus:border-blue-500"
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
                      placeholder="john@example.com"
                      {...register("email")}
                      disabled={isLoading}
                      className="border-gray-300 focus:border-blue-500"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
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
                      className="border-gray-300 focus:border-blue-500"
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
                      className="border-gray-300 focus:border-blue-500"
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Customer Account"}
                  </Button>

                  <div className="text-center space-y-2 pt-4">
                    <p className="text-sm text-gray-600">
                      Want to offer services instead?{" "}
                      <Link href="/signup/helper" className="text-blue-600 hover:text-blue-700 font-medium">
                        Join as a Helper
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