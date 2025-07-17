"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { ListChecks, Plus, XCircle, CheckCircle, Clock } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: string;
  isActive: boolean;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: User;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export default function TasksManagement() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Check authorization
    if (session?.user) {
      if (!['admin', 'super-admin'].includes(session.user.role as string)) {
        router.push('/dashboard');
        return;
      }
      
      fetchTasks();
      fetchUsers();
    } else if (session === null) {
      router.push('/auth/signin');
    }
  }, [session, router]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/tasks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data.users.filter((user: User) => user.isActive));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskForm),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      toast.success('Task created successfully');
      setIsDialogOpen(false);
      setTaskForm({
        title: '',
        description: '',
        assignedTo: '',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0]
      });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      toast.success('Task updated successfully');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/admin/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };
  
  // Helper function to format date string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get priority style
  const getPriorityBadgeStyle = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status style and icon
  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'completed':
        return { 
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          style: 'bg-green-100 text-green-800'
        };
      case 'in-progress':
        return { 
          icon: <Clock className="h-4 w-4 text-blue-500" />,
          style: 'bg-blue-100 text-blue-800'
        };
      default:
        return { 
          icon: <Clock className="h-4 w-4 text-gray-500" />,
          style: 'bg-gray-100 text-gray-800'
        };
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Task Management</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Assign New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Assign New Task</DialogTitle>
              <DialogDescription>
                Create a task and assign it to an employee
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={taskForm.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={taskForm.description}
                  onChange={handleInputChange}
                  placeholder="Enter task details"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <select
                    id="assignedTo"
                    name="assignedTo"
                    value={taskForm.assignedTo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Employee</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={taskForm.dueDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Priority</Label>
                <RadioGroup 
                  defaultValue="medium" 
                  className="flex space-x-4"
                  value={taskForm.priority}
                  onValueChange={(value) => 
                    setTaskForm(prev => ({ ...prev, priority: value }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <DialogFooter>
                <Button type="submit">
                  Create Task
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-8">
          <ListChecks size={48} className="text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks assigned</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start by creating a new task and assigning it to an employee
          </p>
          <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Assign New Task
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card key={task._id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      Due: {formatDate(task.dueDate)}
                    </CardDescription>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadgeStyle(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Assigned to:</span>
                    <span className="text-sm font-medium">{task.assignedTo?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Status:</span>
                    <div className="flex items-center">
                      {getStatusInfo(task.status).icon}
                      <span className={`ml-1 text-xs px-2 py-1 rounded-full ${getStatusInfo(task.status).style}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <div className="flex space-x-2">
                  {task.status !== 'completed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateTaskStatus(task._id, 'completed')}
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Mark Complete
                    </Button>
                  )}
                  {task.status === 'pending' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateTaskStatus(task._id, 'in-progress')}
                    >
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      In Progress
                    </Button>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => deleteTask(task._id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <XCircle className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 