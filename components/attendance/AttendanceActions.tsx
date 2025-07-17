"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Clock, CheckCircle } from "lucide-react";

export default function AttendanceActions() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [todayRecord, setTodayRecord] = useState<any>(null);

  // Check if user already has a record for today
  const checkTodayAttendance = async () => {
    try {
      const today = new Date();
      const startDate = today.toISOString().split("T")[0];
      
      const res = await fetch(`/api/attendance?startDate=${startDate}&endDate=${startDate}`);
      const data = await res.json();
      
      if (data.records && data.records.length > 0) {
        setTodayRecord(data.records[0]);
      }
    } catch (error) {
      console.error("Error fetching today's attendance:", error);
    }
  };

  // Load today's record when component mounts
  useState(() => {
    if (session?.user) {
      checkTodayAttendance();
    }
  });

  // Handle check-in or check-out
  const handleAttendanceAction = async (action: "check-in" | "check-out") => {
    if (!session?.user) {
      toast.error("You must be signed in to perform this action");
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action, notes }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(data.message);
        setNotes("");
        await checkTodayAttendance();
      } else {
        toast.error(data.error || "Failed to process attendance");
      }
    } catch (error) {
      console.error("Error processing attendance action:", error);
      toast.error("An error occurred while processing your request");
    } finally {
      setLoading(false);
    }
  };

  // Check if user can check in or check out
  const canCheckIn = !todayRecord || !todayRecord.checkIn;
  const canCheckOut = todayRecord?.checkIn && !todayRecord?.checkOut;

  if (!session) {
    return <p className="text-center">Please sign in to access attendance features</p>;
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold">Today's Attendance</h2>
      
      <div className="grid gap-4">
        {todayRecord ? (
          <div className="space-y-2">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-500">Status</span>
              <span className="font-medium capitalize">{todayRecord.status}</span>
            </div>
            
            {todayRecord.checkIn && (
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-500">Check-in Time</span>
                <span className="font-medium">
                  {new Date(todayRecord.checkIn).toLocaleTimeString()}
                </span>
              </div>
            )}
            
            {todayRecord.checkOut && (
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-500">Check-out Time</span>
                <span className="font-medium">
                  {new Date(todayRecord.checkOut).toLocaleTimeString()}
                </span>
              </div>
            )}
            
            {todayRecord.workingHours && (
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-500">Working Hours</span>
                <span className="font-medium">{todayRecord.workingHours} hours</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No attendance record for today</p>
        )}
        
        <div className="space-y-3">
          <Textarea
            placeholder="Add notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={loading}
            className="min-h-[80px]"
          />
          
          <div className="flex flex-col sm:flex-row gap-2">
            {canCheckIn && (
              <Button
                onClick={() => handleAttendanceAction("check-in")}
                disabled={loading || !canCheckIn}
                className="flex-1"
              >
                <Clock className="mr-2 h-4 w-4" />
                Check In
              </Button>
            )}
            
            {canCheckOut && (
              <Button
                onClick={() => handleAttendanceAction("check-out")}
                disabled={loading || !canCheckOut}
                className="flex-1"
                variant="outline"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Check Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 