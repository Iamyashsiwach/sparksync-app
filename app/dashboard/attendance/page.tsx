import { Metadata } from "next";
import AttendanceActions from "@/components/attendance/AttendanceActions";
import AttendanceHistory from "@/components/attendance/AttendanceHistory";
import LeaveRequestForm from "@/components/attendance/LeaveRequestForm";
import LeaveRequestList from "@/components/attendance/LeaveRequestList";

export const metadata: Metadata = {
  title: "Attendance Management",
  description: "Track and manage employee attendance and leave requests",
};

export default function AttendanceDashboard() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Attendance Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Check in/out and leave form */}
        <div className="lg:col-span-1 space-y-6">
          <AttendanceActions />
          <LeaveRequestForm />
        </div>
        
        {/* Right column - History and requests */}
        <div className="lg:col-span-2 space-y-6">
          <AttendanceHistory />
          <LeaveRequestList />
        </div>
      </div>
    </div>
  );
} 