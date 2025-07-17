import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from '@/lib/mongodb';
import { User, Attendance, LeaveRequest } from '@/lib/models';
import Link from "next/link";
import { 
  Users, Clock, ClipboardList, UserCheck 
} from "lucide-react";

async function getStats() {
  await connectToDatabase();
  
  // Get counts
  const totalUsers = await User.countDocuments();
  const adminsCount = await User.countDocuments({ role: { $in: ['admin', 'super-admin'] } });
  const employeesCount = await User.countDocuments({ role: 'employee' });
  
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const tomorrow = new Date(todayDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todayPresent = await Attendance.countDocuments({ 
    date: { 
      $gte: todayDate, 
      $lt: tomorrow 
    }, 
    status: 'present' 
  });
  
  const todayAbsent = await Attendance.countDocuments({ 
    date: { 
      $gte: todayDate, 
      $lt: tomorrow 
    }, 
    status: 'absent' 
  });
  
  const pendingLeaves = await LeaveRequest.countDocuments({ status: 'pending' });
  
  return {
    totalUsers,
    adminsCount,
    employeesCount,
    todayPresent,
    todayAbsent,
    pendingLeaves
  };
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const stats = await getStats();
  
  // Format today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">{formattedDate}</p>
        </div>
        <div>
          <span className="bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1.5 rounded-full">
            Super Admin
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Stats Cards */}
        <Link 
          href="/admin/users" 
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
              <div className="flex space-x-2 mt-2">
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {stats.adminsCount} Admins
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {stats.employeesCount} Employees
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Users size={24} className="text-blue-500" />
            </div>
          </div>
        </Link>
        
        <Link 
          href="/admin/attendance" 
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Today's Attendance</p>
              <p className="text-3xl font-bold">{stats.todayPresent}</p>
              <div className="flex space-x-2 mt-2">
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {stats.todayPresent} Present
                </div>
                <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                  {stats.todayAbsent} Absent
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <UserCheck size={24} className="text-green-500" />
            </div>
          </div>
        </Link>
        
        <Link 
          href="/admin/leaves" 
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Leave Requests</p>
              <p className="text-3xl font-bold">{stats.pendingLeaves}</p>
              <div className="flex space-x-2 mt-2">
                <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  {stats.pendingLeaves} Pending
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-full">
              <ClipboardList size={24} className="text-yellow-500" />
            </div>
          </div>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/admin/users" 
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <Users size={24} className="text-blue-500 mb-2" />
            <span className="text-sm font-medium">Manage Users</span>
          </Link>
          
          <Link 
            href="/admin/attendance" 
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <Clock size={24} className="text-green-500 mb-2" />
            <span className="text-sm font-medium">Manage Attendance</span>
          </Link>
          
          <Link 
            href="/admin/leaves" 
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <ClipboardList size={24} className="text-yellow-500 mb-2" />
            <span className="text-sm font-medium">Review Leave Requests</span>
          </Link>
          
          <Link 
            href="/dashboard/attendance" 
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <UserCheck size={24} className="text-teal-500 mb-2" />
            <span className="text-sm font-medium">Go to User Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 