"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight,
  CalendarIcon,
  CheckCircle,
  XCircle,
  Clock,
  AlarmClock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type AttendanceRecord = {
  _id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'halfday' | 'leave';
  workingHours: number | null;
  notes?: string;
};

type PaginationInfo = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

export default function AttendanceHistory() {
  const { data: session } = useSession();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  });
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // Fetch attendance records
  const fetchAttendance = async (page = 1) => {
    if (!session?.user) return;
    
    setLoading(true);
    
    try {
      const { startDate, endDate } = dateRange;
      const res = await fetch(
        `/api/attendance?page=${page}&startDate=${startDate}&endDate=${endDate}`
      );
      
      if (!res.ok) {
        throw new Error('Failed to fetch attendance records');
      }
      
      const data = await res.json();
      
      setRecords(data.records || []);
      setPagination(data.pagination || {
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
      });
      
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      toast.error('Failed to load attendance records');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (session?.user) {
      fetchAttendance();
    }
  }, [session, dateRange]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    fetchAttendance(newPage);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Present
          </Badge>
        );
      case 'absent':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <XCircle className="w-3 h-3 mr-1" /> Absent
          </Badge>
        );
      case 'late':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="w-3 h-3 mr-1" /> Late
          </Badge>
        );
      case 'halfday':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <AlarmClock className="w-3 h-3 mr-1" /> Half Day
          </Badge>
        );
      case 'leave':
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            <CalendarIcon className="w-3 h-3 mr-1" /> Leave
          </Badge>
        );
      default:
        return (
          <Badge>{status}</Badge>
        );
    }
  };

  if (!session) {
    return <p className="text-center">Please sign in to view attendance history</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Attendance History</h2>
        
        <div className="flex gap-2 items-center">
          <div className="text-sm">
            <label className="block text-gray-500">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({
                ...dateRange,
                startDate: e.target.value
              })}
              className="border rounded p-1"
            />
          </div>
          
          <div className="text-sm">
            <label className="block text-gray-500">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({
                ...dateRange,
                endDate: e.target.value
              })}
              className="border rounded p-1"
            />
          </div>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Working Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  Loading...
                </TableCell>
              </TableRow>
            ) : records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  No attendance records found for the selected date range
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(record.status)}
                  </TableCell>
                  <TableCell>
                    {record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : '-'}
                  </TableCell>
                  <TableCell>
                    {record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : '-'}
                  </TableCell>
                  <TableCell>
                    {record.workingHours ? `${record.workingHours} hours` : '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1 || loading}
          >
            <ChevronLeft className="w-4 h-4" />
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
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
} 