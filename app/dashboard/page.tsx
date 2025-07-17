"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "super-admin" || session?.user?.role === "admin") {
        router.push("/admin");
      } else if (session?.user?.role === "employee") {
        router.push("/dashboard/attendance");
      }
    } else if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, session, router]);

  // Show loading state while checking session
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return null;
} 