import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Badge } from '../ui/badge'
import { LogOut, MapPin, Plane, MessageSquare, FileText, Users, Settings } from 'lucide-react'
import { LiveMap } from '../map/LiveMap'

interface User {
  id: string
  email: string
  role: 'admin' | 'staff' | 'family' | 'providers'
  first_name: string
  last_name: string
}

interface DashboardProps {
  user: User
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'staff': return 'bg-blue-100 text-blue-800'
      case 'family': return 'bg-green-100 text-green-800'
      case 'providers': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTabsForRole = (role: string) => {
    const commonTabs = [
      { id: 'overview', label: 'Overview', icon: Users },
      { id: 'trips', label: 'Trips', icon: MapPin },
      { id: 'messages', label: 'Messages', icon: MessageSquare },
    ]

    switch (role) {
      case 'admin':
        return [
          ...commonTabs,
          { id: 'users', label: 'Users', icon: Users },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings },
        ]
      case 'staff':
        return [
          ...commonTabs,
          { id: 'tracking', label: 'Live Tracking', icon: MapPin },
          { id: 'flights', label: 'Flight Status', icon: Plane },
          { id: 'documents', label: 'Documents', icon: FileText },
        ]
      case 'family':
      case 'providers':
        return [
          ...commonTabs,
          { id: 'tracking', label: 'Track Trip', icon: MapPin },
          { id: 'documents', label: 'Documents', icon: FileText },
        ]
      default:
        return commonTabs
    }
  }

  const tabs = getTabsForRole(user.role)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="transport-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img src="/logo.jpg" alt="IYT Transport" className="h-8 w-auto" />
              <h1 className="text-xl font-semibold text-gray-900">
                IYT Family Transport
              </h1>
              <Badge className={getRoleColor(user.role)}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user.first_name} {user.last_name}
              </span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Trips</CardTitle>
                  <CardDescription>Currently in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Trips</CardTitle>
                  <CardDescription>Upcoming this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">7</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Unread notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2</div>
                </CardContent>
              </Card>
            </div>
            {user.role === 'staff' && (
              <Card>
                <CardHeader>
                  <CardTitle>Live Map Test</CardTitle>
                  <CardDescription>Testing the new live map functionality</CardDescription>
                </CardHeader>
                <CardContent>
                  <LiveMap tripId="demo-trip-id" />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trip Management</CardTitle>
                <CardDescription>View and manage transport trips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Active Trips</h3>
                    {user.role === 'staff' && (
                      <Button className="transport-button-primary">
                        <MapPin className="h-4 w-4 mr-2" />
                        Create New Trip
                      </Button>
                    )}
                  </div>
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium text-sm">
                      <div>Trip ID</div>
                      <div>Client</div>
                      <div>Status</div>
                      <div>Departure</div>
                      <div>Destination</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-mono text-sm">TRP-001</div>
                        <div>John Smith</div>
                        <div><Badge className="bg-green-100 text-green-800">In Progress</Badge></div>
                        <div>Dallas, TX</div>
                        <div>Phoenix, AZ</div>
                        <div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-mono text-sm">TRP-002</div>
                        <div>Sarah Johnson</div>
                        <div><Badge className="bg-blue-100 text-blue-800">Scheduled</Badge></div>
                        <div>Houston, TX</div>
                        <div>Denver, CO</div>
                        <div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-4 p-4 items-center">
                        <div className="font-mono text-sm">TRP-003</div>
                        <div>Mike Davis</div>
                        <div><Badge className="bg-gray-100 text-gray-800">Completed</Badge></div>
                        <div>Austin, TX</div>
                        <div>Seattle, WA</div>
                        <div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Tracking</CardTitle>
                <CardDescription>Real-time location and status updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.role === 'staff' ? (
                  <LiveMap tripId="demo-trip-id" />
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Trip Tracking</h3>
                      <p className="text-sm text-gray-600 mt-2">View real-time location of active trips</p>
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">No active trips to track</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Secure Messaging</CardTitle>
                <CardDescription>Communicate with authorized parties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Recent Messages</h3>
                    <Button className="transport-button-primary">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      New Message
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">Trip TRP-001 Update</div>
                        <div className="text-sm text-gray-500">2 hours ago</div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Client pickup completed successfully. Currently en route to destination.
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">From: Transport Staff</div>
                        <Button variant="outline" size="sm">Reply</Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">Schedule Confirmation</div>
                        <div className="text-sm text-gray-500">1 day ago</div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Trip TRP-002 scheduled for tomorrow at 9:00 AM. Please confirm client availability.
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">From: Family Member</div>
                        <Button variant="outline" size="sm">Reply</Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">Document Request</div>
                        <div className="text-sm text-gray-500">2 days ago</div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Please upload the medical clearance form for upcoming transport.
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">From: Admin</div>
                        <Button variant="outline" size="sm">Reply</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>Upload and manage trip documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Trip Documents</h3>
                    {(user.role === 'staff' || user.role === 'admin') && (
                      <Button className="transport-button-primary">
                        <FileText className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    )}
                  </div>
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 font-medium text-sm">
                      <div>Document Name</div>
                      <div>Type</div>
                      <div>Trip ID</div>
                      <div>Uploaded</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-5 gap-4 p-4 items-center">
                        <div>Medical Clearance Form</div>
                        <div><Badge variant="outline">Medical</Badge></div>
                        <div className="font-mono text-sm">TRP-001</div>
                        <div className="text-sm text-gray-500">2 days ago</div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Download</Button>
                          {(user.role === 'staff' || user.role === 'admin') && (
                            <Button variant="outline" size="sm">Delete</Button>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-4 p-4 items-center">
                        <div>Consent Form</div>
                        <div><Badge variant="outline">Legal</Badge></div>
                        <div className="font-mono text-sm">TRP-002</div>
                        <div className="text-sm text-gray-500">1 day ago</div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Download</Button>
                          {(user.role === 'staff' || user.role === 'admin') && (
                            <Button variant="outline" size="sm">Delete</Button>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-4 p-4 items-center">
                        <div>Travel Itinerary</div>
                        <div><Badge variant="outline">Travel</Badge></div>
                        <div className="font-mono text-sm">TRP-001</div>
                        <div className="text-sm text-gray-500">3 days ago</div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Download</Button>
                          {(user.role === 'staff' || user.role === 'admin') && (
                            <Button variant="outline" size="sm">Delete</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flight Integration</CardTitle>
                <CardDescription>Track flight status and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Flight Status</h3>
                    {user.role === 'staff' && (
                      <Button className="transport-button-primary">
                        <Plane className="h-4 w-4 mr-2" />
                        Add Flight Info
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">AA 1234</CardTitle>
                        <CardDescription>American Airlines</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Status:</span>
                            <Badge className="bg-green-100 text-green-800">On Time</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Departure:</span>
                            <span className="text-sm">DFW - 2:30 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Arrival:</span>
                            <span className="text-sm">PHX - 4:15 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Gate:</span>
                            <span className="text-sm">A12</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Trip:</span>
                            <span className="text-sm font-mono">TRP-001</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">UA 5678</CardTitle>
                        <CardDescription>United Airlines</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Status:</span>
                            <Badge className="bg-yellow-100 text-yellow-800">Delayed</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Departure:</span>
                            <span className="text-sm">IAH - 10:45 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Arrival:</span>
                            <span className="text-sm">DEN - 12:30 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Gate:</span>
                            <span className="text-sm">B7</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Trip:</span>
                            <span className="text-sm font-mono">TRP-002</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {user.role === 'admin' && (
            <>
              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage system users and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">System Users</h3>
                        <Button className="transport-button-primary">
                          <Users className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </div>
                      <div className="border rounded-lg">
                        <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 font-medium text-sm">
                          <div>Name</div>
                          <div>Email</div>
                          <div>Role</div>
                          <div>Status</div>
                          <div>Actions</div>
                        </div>
                        <div className="divide-y">
                          <div className="grid grid-cols-5 gap-4 p-4 items-center">
                            <div>John Smith</div>
                            <div>john.smith@iyt.com</div>
                            <div><Badge className="bg-blue-100 text-blue-800">Staff</Badge></div>
                            <div><Badge className="bg-green-100 text-green-800">Active</Badge></div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Disable</Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-5 gap-4 p-4 items-center">
                            <div>Sarah Johnson</div>
                            <div>sarah.j@family.com</div>
                            <div><Badge className="bg-green-100 text-green-800">Family</Badge></div>
                            <div><Badge className="bg-green-100 text-green-800">Active</Badge></div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Disable</Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-5 gap-4 p-4 items-center">
                            <div>Dr. Mike Davis</div>
                            <div>m.davis@provider.com</div>
                            <div><Badge className="bg-purple-100 text-purple-800">Provider</Badge></div>
                            <div><Badge className="bg-green-100 text-green-800">Active</Badge></div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Disable</Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-5 gap-4 p-4 items-center">
                            <div>Admin User</div>
                            <div>admin@iyt.com</div>
                            <div><Badge className="bg-red-100 text-red-800">Admin</Badge></div>
                            <div><Badge className="bg-green-100 text-green-800">Active</Badge></div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" disabled>Disable</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports & Analytics</CardTitle>
                    <CardDescription>View system reports and analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Total Trips</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">127</div>
                            <div className="text-sm text-gray-600">This month</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Success Rate</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">98.4%</div>
                            <div className="text-sm text-gray-600">Completed successfully</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Avg Duration</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">4.2h</div>
                            <div className="text-sm text-gray-600">Per trip</div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Trips completed today</span>
                                <span className="font-medium">5</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Active staff members</span>
                                <span className="font-medium">12</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Messages sent</span>
                                <span className="font-medium">23</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Documents uploaded</span>
                                <span className="font-medium">8</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>System Health</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">GPS Tracking</span>
                                <Badge className="bg-green-100 text-green-800">Online</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Flight API</span>
                                <Badge className="bg-green-100 text-green-800">Connected</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Messaging</span>
                                <Badge className="bg-green-100 text-green-800">Active</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Database</span>
                                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure system settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Notification Settings</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Email notifications</span>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">SMS alerts</span>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Push notifications</span>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Security Settings</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Password policy</span>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Session timeout</span>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Two-factor auth</span>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">GPS & Tracking</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Update interval</span>
                              <Button variant="outline" size="sm">10 seconds</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Geofence alerts</span>
                              <Button variant="outline" size="sm">Enabled</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Location history</span>
                              <Button variant="outline" size="sm">30 days</Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Integration Settings</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Flight API key</span>
                              <Button variant="outline" size="sm">Update</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Email service</span>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">SMS provider</span>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>
    </div>
  )
}
