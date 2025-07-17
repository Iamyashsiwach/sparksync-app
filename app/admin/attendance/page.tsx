"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Download as DownloadIcon, 
  Filter as FilterIcon,
  RefreshCw
} from "lucide-react";
import { DateRange } from "react-day-picker";

type AttendanceRecord = {
  _id: string;
  userId: string;
  userName: string;
  date: string;
  status: 'present' | 'absent' | 'half-day';
  checkIn?: string;
  checkOut?: string;
  workingHours?: number;
};

export default function AdminAttendancePage() {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(1)), // First day of current month
    to: new Date()
  });

  useEffect(() => {
    fetchAttendanceData();
  }, [currentPage, dateRange]);

  async function fetchAttendanceData() {
    try {
      setLoading(true);
      if (!dateRange?.from || !dateRange?.to) return;
      
      const startDate = format(dateRange.from, "yyyy-MM-dd");
      const endDate = format(dateRange.to, "yyyy-MM-dd");
      
      const res = await fetch(
        `/api/admin/attendance?page=${currentPage}&startDate=${startDate}&endDate=${endDate}`
      );
      
      if (!res.ok) throw new Error("Failed to fetch attendance data");
      
      const data = await res.json();
      setAttendanceData(data.attendance || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleDateChange(selectedDateRange: DateRange | undefined) {
    setDateRange(selectedDateRange);
  }

  function exportToCSV() {
    // Implement CSV export functionality
    alert("Export functionality not implemented yet");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        
        <div className="flex space-x-2">
          <Button 
            onClick={() => fetchAttendanceData()}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button 
            onClick={exportToCSV}
            variant="outline"
            size="sm"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="w-full sm:w-auto">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleDateChange}
                className="border rounded-md p-3"
                numberOfMonths={2}
              />
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : attendanceData.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Working Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell className="font-medium">{record.userName}</TableCell>
                    <TableCell>{format(new Date(record.date), "PPP")}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        record.status === 'present' ? 'bg-green-100 text-green-800' :
                        record.status === 'absent' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {record.checkIn ? format(new Date(record.checkIn), "h:mm a") : "-"}
                    </TableCell>
                    <TableCell>
                      {record.checkOut ? format(new Date(record.checkOut), "h:mm a") : "-"}
                    </TableCell>
                    <TableCell>
                      {record.workingHours ? `${record.workingHours.toFixed(2)} hrs` : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-center mt-6">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No attendance records found for the selected date range.</p>
          </div>
        )}
      </div>
    </div>
  );
} 