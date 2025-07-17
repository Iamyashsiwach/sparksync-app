import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { 
  UserCircle, LogOut, Home, Calendar, Users, ClipboardList, 
  ShieldAlert, LayoutDashboard, Clock, Settings, CheckSquare 
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions);

  // Redirect if not authenticated or not an admin/super-admin
  if (!session || (session.user.role !== 'super-admin' && session.user.role !== 'admin')) {
    redirect("/auth/signin?message=You must be an admin to access this page");
  }

  // Check if user is super-admin
  const isSuperAdmin = session.user.role === "super-admin";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <ShieldAlert size={24} className="text-teal-500" />
            <span className="font-semibold text-lg">Admin Dashboard</span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase mt-4 mb-2">General</p>
            
            <Link href="/admin" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <LayoutDashboard className="mr-3 h-4 w-4" />
              Dashboard
            </Link>
            
            <Link href="/admin/users" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <Users className="mr-3 h-4 w-4" />
              User Management
            </Link>
            
            <Link href="/admin/tasks" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <CheckSquare className="mr-3 h-4 w-4" />
              Task Management
            </Link>
            
            <p className="text-xs font-medium text-gray-500 uppercase mt-6 mb-2">Attendance</p>
            
            <Link href="/admin/attendance" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <Clock className="mr-3 h-4 w-4" />
              Attendance Log
            </Link>
            
            <Link href="/admin/leaves" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <ClipboardList className="mr-3 h-4 w-4" />
              Leave Requests
            </Link>
            
            {isSuperAdmin && (
              <>
                <p className="text-xs font-medium text-gray-500 uppercase mt-6 mb-2">System</p>
                
                <Link href="/admin/settings" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                  <Settings className="mr-3 h-4 w-4" />
                  System Settings
                </Link>
              </>
            )}
          </div>
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
              <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 font-medium">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium truncate">{session.user.name}</div>
              <div className="text-xs text-gray-500 truncate">{session.user.email}</div>
            </div>
            <Link href="/api/auth/signout" className="text-gray-500 hover:text-gray-700">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
        <div className="grid grid-cols-4 gap-1">
          <Link href="/admin" className="flex flex-col items-center justify-center py-2">
            <LayoutDashboard className="h-5 w-5 text-gray-600" />
            <span className="text-xs mt-1 text-gray-600">Dashboard</span>
          </Link>
          
          <Link href="/admin/users" className="flex flex-col items-center justify-center py-2">
            <Users className="h-5 w-5 text-gray-600" />
            <span className="text-xs mt-1 text-gray-600">Users</span>
          </Link>
          
          <Link href="/admin/tasks" className="flex flex-col items-center justify-center py-2">
            <CheckSquare className="h-5 w-5 text-gray-600" />
            <span className="text-xs mt-1 text-gray-600">Tasks</span>
          </Link>
          
          <Link href="/admin/attendance" className="flex flex-col items-center justify-center py-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <span className="text-xs mt-1 text-gray-600">Attendance</span>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              Admin Portal
              {isSuperAdmin && (
                <span className="ml-2 bg-teal-100 text-teal-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Super Admin
                </span>
              )}
              {!isSuperAdmin && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </h1>
            
            <div className="flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Return to User Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 