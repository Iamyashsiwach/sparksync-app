"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Calendar } from "lucide-react";

// Form schema
const leaveRequestSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  type: z.enum(["sick", "vacation", "personal", "other"], {
    required_error: "Please select a leave type",
  }),
  reason: z.string().min(5, "Please provide a reason for your leave request"),
});

type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;

export default function LeaveRequestForm() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  // Initialize form
  const form = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      type: "personal",
      reason: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: LeaveRequestFormValues) => {
    if (!session?.user) {
      toast.error("You must be signed in to submit a leave request");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Leave request submitted successfully");
        form.reset({
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date().toISOString().split("T")[0],
          type: "personal",
          reason: "",
        });
      } else {
        toast.error(data.error || "Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("An error occurred while submitting your request");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <p className="text-center">Please sign in to request leave</p>;
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Request Leave</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leave Type</FormLabel>
                <Select
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value}
                  disabled={loading}
                >
                  <option value="sick">Sick Leave</option>
                  <option value="vacation">Vacation</option>
                  <option value="personal">Personal Leave</option>
                  <option value="other">Other</option>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide details about your leave request"
                    className="min-h-[100px]"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Leave Request"}
          </Button>
        </form>
      </Form>
    </div>
  );
} 