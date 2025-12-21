"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldPath } from "react-hook-form";
import { z } from "zod";
import React from 'react';
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileUploadButton } from "@/components/forms/file-upload-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaceScan } from "./face-scan";
import { cn } from "@/lib/utils";

const serviceCategories = [
  "Drivers", "Cleaners", "Plumbers", "Electricians", "Carpenters", 
  "AC/Appliance Repair", "Babysitters", "Tutors", "Pet Sitters", 
  "Gardeners", "Moving Helpers", "Beauty & Wellness", "Tech Support", "Handyman"
];

const formSchema = z.object({
  profilePhoto: z.any().optional(),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Please enter a valid address.",
  }),
  governmentId: z.any().optional(),
  proofOfAddress: z.any().optional(),
  faceScanCompleted: z.boolean().refine(val => val === true, "Face scan is required."),
  serviceCategory: z.string({
    required_error: "Please select a service category.",
  }),
  experience: z.coerce.number().min(0, {
    message: "Experience cannot be negative.",
  }),
  bio: z.string().max(300, {
    message: "Bio must not be longer than 300 characters."
  }).optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and policies to proceed.",
  }),
}).superRefine((data, ctx) => {
  if (data.profilePhoto === undefined || data.profilePhoto?.length !== 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["profilePhoto"],
      message: "Profile photo is required.",
    });
  }
  if (data.governmentId === undefined || data.governmentId?.length !== 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["governmentId"],
      message: "Government ID is required.",
    });
  }
  if (data.proofOfAddress === undefined || data.proofOfAddress?.length !== 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["proofOfAddress"],
      message: "Proof of address is required.",
    });
  }
});


type FormSchemaType = z.infer<typeof formSchema>;

const steps = [
  { id: 'Step 1', name: 'Personal Information', fields: ['fullName', 'email', 'phone', 'address', 'profilePhoto'] },
  { id: 'Step 2', name: 'Service Details', fields: ['serviceCategory', 'experience', 'bio'] },
  { id: 'Step 3', name: 'Verification', fields: ['governmentId', 'proofOfAddress', 'faceScanCompleted'] },
  { id: 'Step 4', name: 'Agreement', fields: ['terms'] },
]

export function HelperRegistrationForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      experience: 0,
      bio: "",
      terms: false,
      faceScanCompleted: false,
    },
  });

  const profilePhotoFiles = form.watch("profilePhoto");
  React.useEffect(() => {
    if (profilePhotoFiles && profilePhotoFiles.length > 0) {
      const file = profilePhotoFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  }, [profilePhotoFiles]);

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldPath<FormSchemaType>[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1)
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Registration Submitted!",
      description: "Your application has been received. We will get back to you shortly.",
    });
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Become a Helper</CardTitle>
        <CardDescription>Join our network of trusted professionals.</CardDescription>
        <nav aria-label="Progress" className="pt-4">
          <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step, index) => {
              const state = currentStep > index ? 'complete' : currentStep === index ? 'current' : 'upcoming';

              return (
                <li key={step.name} className="md:flex-1">
                  <div
                    className="group flex flex-col border-l-4 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                    aria-current={state === 'current' ? 'step' : undefined}
                    style={{
                      borderColor: state === 'current' ? 'hsl(var(--primary))' : state === 'complete' ? 'hsl(var(--primary))' : 'hsl(var(--border))'
                    }}
                  >
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      state === 'current' ? 'text-primary' : state === 'complete' ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    )}>
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                </li>
              )
            })}
          </ol>
        </nav>
      </CardHeader>
      <CardContent className="p-8 pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Step 1: Personal Information */}
            <div className={cn(currentStep !== 0 && "hidden")}>
              <div className="space-y-8">
                <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={photoPreview || undefined} alt="Profile photo preview" />
                      <AvatarFallback>
                        <svg className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </AvatarFallback>
                    </Avatar>
                    <FormField
                      control={form.control}
                      name="profilePhoto"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <FileUploadButton 
                              form={form} 
                              name="profilePhoto"
                              buttonText="Upload Profile Photo"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, Anytown, USA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Service Details */}
            <div className={cn(currentStep !== 1 && "hidden")}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="serviceCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service you provide" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {serviceCategories.map(category => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Bio (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little bit about yourself and your skills"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
            </div>

            {/* Step 3: Verification */}
            <div className={cn(currentStep !== 2 && "hidden")}>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="governmentId"
                    render={() => (
                      <FormItem>
                        <FormLabel>Government-Issued ID</FormLabel>
                        <FormControl>
                          <FileUploadButton 
                            form={form} 
                            name="governmentId"
                            buttonText="Upload ID"
                          />
                        </FormControl>
                        <FormDescription>
                          Upload a clear photo of your driver's license, passport, or national ID card.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proofOfAddress"
                    render={() => (
                      <FormItem>
                        <FormLabel>Proof of Address</FormLabel>
                        <FormControl>
                          <FileUploadButton 
                            form={form} 
                            name="proofOfAddress"
                            buttonText="Upload Proof"
                          />
                        </FormControl>
                        <FormDescription>
                          Upload a recent utility bill or bank statement showing your name and address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="faceScanCompleted"
                  render={() => (
                    <FormItem>
                      <Card>
                        <CardHeader>
                          <CardTitle>Facial Verification</CardTitle>
                          <FormDescription>
                            Complete a quick face scan to verify your identity.
                          </FormDescription>
                        </CardHeader>
                        <CardContent>
                          <FaceScan onScanComplete={() => form.setValue('faceScanCompleted', true, { shouldValidate: true })} />
                        </CardContent>
                      </Card>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Step 4: Agreement */}
            <div className={cn(currentStep !== 3 && "hidden")}>
                <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Agree to Terms and Policies
                      </FormLabel>
                      <FormDescription>
                        By checking this box, you acknowledge and agree to our terms of service. You understand that any misconduct, criminal activity, or violation of our policies will result in immediate termination of your account and may be reported to law enforcement. You will be held fully responsible and subject to legal action for any damages or harm caused.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
          </form>
        </Form>

         {/* Navigation buttons */}
        <div className="mt-8 pt-5">
            <div className="flex justify-between">
              <Button type="button" variant="secondary" onClick={prev} disabled={currentStep === 0}>
                Go Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={next}>
                  Next Step
                </Button>
              ) : (
                <Button type="button" onClick={form.handleSubmit(onSubmit)} >
                  Submit Application
                </Button>
              )}
            </div>
          </div>

      </CardContent>
    </Card>
  );
}
