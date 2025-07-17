import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { UserCircle, LogOut, Home, Calendar } from "lucide-react";
import { signOut } from "next-auth/react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  // Redirect if not authenticated
  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and name */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center font-bold text-xl">
                <Home className="h-6 w-6 mr-2 text-blue-600" />
                Revee InfoTech
              </Link>
            </div>
            
            {/* Navigation links */}
            <div className="hidden md:flex space-x-4">
              <Link 
                href="/dashboard" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/attendance" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 flex items-center"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Attendance
              </Link>
            </div>
            
            {/* User */}
            <div className="flex items-center">
              <div className="mr-4 text-right hidden sm:block">
                <div className="text-sm font-medium">{session.user.name}</div>
                <div className="text-xs text-gray-500 capitalize">{session.user.role}</div>
              </div>
              <div className="relative group">
                <button className="flex text-sm rounded-full focus:outline-none">
                  {session.user.image ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={session.user.image}
                      alt={`${session.user.name}'s avatar`}
                    />
                  ) : (
                    <UserCircle className="h-8 w-8 text-gray-400" />
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <form
                    action={async () => {
                      'use server';
                      await signOut({ redirect: true, callbackUrl: "/" });
                    }}
                  >
                    <button 
                      type="submit"
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Content */}
      <main>
        {children}
      </main>
    </div>
  );
} 