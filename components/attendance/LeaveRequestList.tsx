"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  Calendar,
  Filter,
} from "lucide-react";

type LeaveRequest = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    department: string;
    position: string;
  };
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  status: string;
  approvedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  approvalDate?: string;
  createdAt: string;
};

type PaginationInfo = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

export default function LeaveRequestList() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });
  const [filter, setFilter] = useState<string>("all"); // all, pending, approved, rejected

  // Fetch leave requests
  const fetchLeaveRequests = async (page = 1) => {
    if (!session?.user) return;

    setLoading(true);

    try {
      let url = `/api/leave?page=${page}`;

      if (filter !== "all") {
        url += `&status=${filter}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch leave requests");
      }

      const data = await res.json();

      setRequests(data.requests || []);
      setPagination(data.pagination || {
        total: 0,
        page: 1,
        limit: 10,
        pages: 0,
      });
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      toast.error("Failed to load leave requests");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (session?.user) {
      fetchLeaveRequests();
    }
  }, [session, filter]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    fetchLeaveRequests(newPage);
  };

  // Handle leave request approval/rejection
  const handleLeaveRequestAction = async (
    id: string,
    action: "approved" | "rejected"
  ) => {
    if (!session?.user) {
      toast.error("You must be signed in to perform this action");
      return;
    }

    // Check if user has permission
    if (session.user.role !== "admin" && session.user.role !== "manager") {
      toast.error("You don't have permission to perform this action");
      return;
    }

    setActionLoading(id);

    try {
      const res = await fetch(`/api/leave/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: action }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Leave request ${action} successfully`);
        // Update the leave request in the list
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id
              ? {
                  ...req,
                  status: action,
                  approvedBy: {
                    _id: session.user.id,
                    name: session.user.name || "",
                    email: session.user.email || "",
                  },
                  approvalDate: new Date().toISOString(),
                }
              : req
          )
        );
      } else {
        toast.error(data.error || `Failed to ${action} leave request`);
      }
    } catch (error) {
      console.error(`Error ${action} leave request:`, error);
      toast.error("An error occurred while processing your request");
    } finally {
      setActionLoading(null);
    }
  };

  // Handle leave request deletion
  const handleDeleteLeaveRequest = async (id: string) => {
    if (!session?.user) {
      toast.error("You must be signed in to perform this action");
      return;
    }

    // Confirm deletion
    if (!confirm("Are you sure you want to delete this leave request?")) {
      return;
    }

    setActionLoading(id);

    try {
      const res = await fetch(`/api/leave/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Leave request deleted successfully");
        // Remove the deleted request from the list
        setRequests((prev) => prev.filter((req) => req._id !== id));
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete leave request");
      }
    } catch (error) {
      console.error("Error deleting leave request:", error);
      toast.error("An error occurred while deleting your request");
    } finally {
      setActionLoading(null);
    }
  };

  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString();
    const end = new Date(endDate).toLocaleDateString();

    if (start === end) {
      return start;
    }

    return `${start} - ${end}`;
  };

  // Calculate number of days
  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  if (!session) {
    return <p className="text-center">Please sign in to view leave requests</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Leave Requests</h2>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            className="text-sm border rounded p-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            disabled={loading}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <Calendar className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">No leave requests found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                <div>
                  <h3 className="font-medium">
                    {session.user.role === "admin" ||
                    session.user.role === "manager"
                      ? request.user.name
                      : "Your request"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {session.user.role === "admin" ||
                    session.user.role === "manager"
                      ? `${request.user.department} • ${request.user.position}`
                      : ""}
                  </p>
                </div>
                <div
                  className={`mt-2 md:mt-0 px-3 py-1 text-sm rounded-full ${
                    request.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : request.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {request.status === "approved" ? (
                    <span className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" /> Approved
                    </span>
                  ) : request.status === "rejected" ? (
                    <span className="flex items-center">
                      <XCircle className="w-3 h-3 mr-1" /> Rejected
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> Pending
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Date Range</p>
                  <p className="font-medium">
                    {formatDateRange(request.startDate, request.endDate)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {calculateDays(request.startDate, request.endDate)} days
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium capitalize">{request.type}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Reason</p>
                <p className="text-sm">{request.reason}</p>
              </div>

              {request.approvedBy && (
                <div className="text-xs text-gray-500 mb-4">
                  {request.status} by {request.approvedBy.name} on{" "}
                  {new Date(request.approvalDate!).toLocaleDateString()}
                </div>
              )}

              {request.status === "pending" && (
                <div className="flex flex-wrap gap-2">
                  {(session.user.role === "admin" ||
                    session.user.role === "manager") && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleLeaveRequestAction(request._id, "approved")
                        }
                        disabled={actionLoading === request._id}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleLeaveRequestAction(request._id, "rejected")
                        }
                        disabled={actionLoading === request._id}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  {(session.user.id === request.user._id ||
                    session.user.role === "admin") && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteLeaveRequest(request._id)}
                      disabled={actionLoading === request._id}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1 || loading}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {pagination.page} of {pagination.pages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.pages || loading}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
} 