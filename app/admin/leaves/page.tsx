"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { RefreshCw, Calendar } from "lucide-react";
import { format } from "date-fns";

type LeaveRequest = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};

export default function AdminLeavesPage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchLeaveRequests();
  }, [statusFilter]);

  async function fetchLeaveRequests() {
    try {
      setLoading(true);
      const url = statusFilter !== "all" 
        ? `/api/admin/leave?status=${statusFilter}` 
        : `/api/admin/leave`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch leave requests");
      
      const data = await res.json();
      setLeaveRequests(data.leaveRequests || []);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateLeaveStatus(leaveId: string, newStatus: 'approved' | 'rejected') {
    try {
      const res = await fetch(`/api/admin/leave/${leaveId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update leave status");
      
      // Refresh the data
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  }

  function getStatusBadgeClass(status: string) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Leave Requests</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchLeaveRequests}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-end mb-6">
          <div className="w-48">
            <Select 
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : leaveRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((leave) => (
                  <TableRow key={leave._id}>
                    <TableCell className="font-medium">{leave.user.name}</TableCell>
                    <TableCell className="capitalize">{leave.type}</TableCell>
                    <TableCell>
                      {new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate() + 1} days
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                        <span>
                          {format(new Date(leave.startDate), "MMM d")} - {format(new Date(leave.endDate), "MMM d, yyyy")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{leave.reason}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(leave.status)}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {leave.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                            onClick={() => updateLeaveStatus(leave._id, "approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                            onClick={() => updateLeaveStatus(leave._id, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No leave requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
} 