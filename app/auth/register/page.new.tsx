"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { UserPlus, Mail, Lock, User, Building, Briefcase } from "lucide-react";

// Form schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string()
    .email("Please enter a valid email address")
    .refine(email => email.endsWith('@reveeinfotech.com'), {
      message: "Only reveeinfotech.com email addresses are allowed"
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  department: z.string().min(2, "Department is required"),
  position: z.string().min(2, "Position is required"),
  secretKey: z.string().optional(),
  makeSuperAdmin: z.boolean(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuperAdminOption, setShowSuperAdminOption] = useState(false);

  // Initialize form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      department: "",
      position: "",
      secretKey: "",
      makeSuperAdmin: false
    },
  });

  // Handle special key combination to reveal super admin option (Ctrl+Alt+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 's') {
        e.preventDefault();
        setShowSuperAdminOption(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle form submission
  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);

    // Prepare submission data
    const submissionData = {
      ...values,
      role: values.makeSuperAdmin ? 'super-admin' : 'employee',
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful! You can now sign in.");
        router.push("/auth/signin");
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="bg-teal-500/10 p-3 rounded-full">
              <UserPlus className="h-8 w-8 text-teal-500" />
            </div>
          </div>
          <h1 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-teal-500 hover:text-teal-500/80"
            >
              sign in to your account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="John Doe" 
                          className="pl-10"
                          disabled={loading} 
                          {...field} 
                        />
                      </div>
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
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          type="email" 
                          placeholder="name@reveeinfotech.com" 
                          className="pl-10"
                          disabled={loading} 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground mt-1">Only reveeinfotech.com email addresses are allowed</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-10" 
                          disabled={loading}
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="Engineering" 
                            className="pl-10" 
                            disabled={loading}
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="Software Engineer" 
                            className="pl-10" 
                            disabled={loading}
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Hidden super admin options - revealed with Ctrl+Alt+S */}
              {showSuperAdminOption && (
                <div className="border p-4 rounded-md bg-amber-50">
                  <h3 className="text-amber-800 font-medium mb-2">Super Admin Creation</h3>
                  
                  <FormField
                    control={form.control}
                    name="secretKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Key</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter secret key"
                            className="bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="makeSuperAdmin"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 mt-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Register as Super Admin
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
} 