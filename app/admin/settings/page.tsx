"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, RefreshCw, UserCog, Building, BellRing, Shield, Mail } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  // General settings
  const [companyName, setCompanyName] = useState("Revee InfoTech");
  const [companyEmail, setCompanyEmail] = useState("support@reveeinfotech.com");
  const [companyPhone, setCompanyPhone] = useState("+91 8950803350");
  const [companyAddress, setCompanyAddress] = useState("Cabin No 4, 3rd Floor, Oahfeo Coworking Space, Sector 45 Gurgaon 122003");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [leaveRequestNotifications, setLeaveRequestNotifications] = useState(true);
  const [taskAssignmentNotifications, setTaskAssignmentNotifications] = useState(true);
  const [attendanceReminderNotifications, setAttendanceReminderNotifications] = useState(true);
  
  // Security settings
  const [requireStrongPasswords, setRequireStrongPasswords] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  
  // Loading states
  const [saving, setSaving] = useState(false);
  
  async function saveSettings(category: string) {
    setSaving(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    toast.success(`${category} settings saved successfully`);
    setSaving(false);
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">System Settings</h1>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general" className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <BellRing className="h-4 w-4 mr-2" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your company information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Email Address</Label>
                <Input 
                  id="companyEmail" 
                  type="email"
                  value={companyEmail} 
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Phone Number</Label>
                <Input 
                  id="companyPhone" 
                  value={companyPhone} 
                  onChange={(e) => setCompanyPhone(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyAddress">Address</Label>
                <Textarea 
                  id="companyAddress" 
                  rows={3}
                  value={companyAddress} 
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => saveSettings("Company")}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Enable or disable all email notifications
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Leave Request Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications when a leave request is submitted
                  </p>
                </div>
                <Switch
                  checked={leaveRequestNotifications}
                  onCheckedChange={setLeaveRequestNotifications}
                  disabled={!emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Assignment Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications when tasks are assigned or updated
                  </p>
                </div>
                <Switch
                  checked={taskAssignmentNotifications}
                  onCheckedChange={setTaskAssignmentNotifications}
                  disabled={!emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Attendance Reminders</Label>
                  <p className="text-sm text-gray-500">
                    Send daily reminders to employees to mark their attendance
                  </p>
                </div>
                <Switch
                  checked={attendanceReminderNotifications}
                  onCheckedChange={setAttendanceReminderNotifications}
                  disabled={!emailNotifications}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => saveSettings("Notification")}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security settings for your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Strong Passwords</Label>
                  <p className="text-sm text-gray-500">
                    Enforce password complexity requirements for all users
                  </p>
                </div>
                <Switch
                  checked={requireStrongPasswords}
                  onCheckedChange={setRequireStrongPasswords}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">
                    Require two-factor authentication for admin users
                  </p>
                </div>
                <Switch
                  checked={twoFactorAuth}
                  onCheckedChange={setTwoFactorAuth}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input 
                  id="sessionTimeout" 
                  type="number"
                  min={5}
                  max={120}
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}
                />
                <p className="text-xs text-gray-500">
                  Time in minutes before inactive users are automatically logged out
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => saveSettings("Security")}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 