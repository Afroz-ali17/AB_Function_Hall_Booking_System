"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, XCircle, Clock, Loader2, Eye, Mail, Phone, Calendar, Users, Sparkles } from "lucide-react"
import { format } from "date-fns"

type Booking = {
  id: number
  name: string
  email: string
  phone: string
  eventType: string
  startDate: string
  endDate: string
  guestCount: number
  message: string | null
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const ADMIN_PASSWORD = "admin123" // In production, use proper authentication

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings()
    }
  }, [isAuthenticated])

  async function fetchBookings() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/bookings")
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function updateBookingStatus(id: number, status: "approved" | "rejected") {
    setIsUpdating(id)
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        await fetchBookings()
      }
    } catch (error) {
      console.error("Error updating booking:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password")
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10">
        {/* 3D Floating Elements Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container py-16 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl mb-4 animate-float">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Admin Portal
              </h1>
              <p className="text-muted-foreground">Secure access to your dashboard</p>
            </div>

            <Card className="backdrop-blur-sm bg-card/50 border-2 shadow-2xl">
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Enter password to access admin dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="border-2"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Access Dashboard
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10">
      {/* 3D Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-40 right-10 w-44 h-44 bg-secondary/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container py-8 relative z-10">
        <div className="space-y-8">
          {/* Header with 3D Effect */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-20" />
            <div className="relative bg-card/50 backdrop-blur-sm rounded-lg p-6 border-2">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-xl animate-float">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Manage booking requests for AB Function Hall
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards with 3D Hover Effect */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 backdrop-blur-sm bg-card/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="pb-3 relative z-10">
                <CardDescription>Total Bookings</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  {statusCounts.all}
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 backdrop-blur-sm bg-card/50">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="pb-3 relative z-10">
                <CardDescription>Pending</CardDescription>
                <CardTitle className="text-3xl text-yellow-600 flex items-center gap-2">
                  {statusCounts.pending}
                  <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center animate-pulse">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 backdrop-blur-sm bg-card/50">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="pb-3 relative z-10">
                <CardDescription>Approved</CardDescription>
                <CardTitle className="text-3xl text-green-600 flex items-center gap-2">
                  {statusCounts.approved}
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 backdrop-blur-sm bg-card/50">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="pb-3 relative z-10">
                <CardDescription>Rejected</CardDescription>
                <CardTitle className="text-3xl text-red-600 flex items-center gap-2">
                  {statusCounts.rejected}
                  <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Bookings Table with Glass Effect */}
          <Card className="border-2 shadow-2xl backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Booking Requests
              </CardTitle>
              <CardDescription>View and manage all booking requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-muted/50 backdrop-blur-sm">
                  <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
                  <TabsTrigger value="approved">Approved ({statusCounts.approved})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected ({statusCounts.rejected})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : filteredBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">No bookings found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-muted/50">
                            <TableHead>Client</TableHead>
                            <TableHead>Event Type</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Guests</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBookings.map((booking) => (
                            <TableRow key={booking.id} className="hover:bg-muted/30 transition-colors">
                              <TableCell>
                                <div className="font-medium">{booking.name}</div>
                                <div className="text-sm text-muted-foreground">{booking.email}</div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-normal">
                                  {booking.eventType}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  {format(new Date(booking.startDate), "MMM dd, yyyy")} -
                                </div>
                                <div className="text-sm">
                                  {format(new Date(booking.endDate), "MMM dd, yyyy")}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  {booking.guestCount}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    booking.status === "approved"
                                      ? "default"
                                      : booking.status === "rejected"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                  className="shadow-sm"
                                >
                                  {booking.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                                  {booking.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                                  {booking.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                  {booking.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedBooking(booking)}
                                    className="hover:bg-primary hover:text-primary-foreground transition-all"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  {booking.status === "pending" && (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="default"
                                        onClick={() => updateBookingStatus(booking.id, "approved")}
                                        disabled={isUpdating === booking.id}
                                        className="bg-green-600 hover:bg-green-700 transition-all"
                                      >
                                        {isUpdating === booking.id ? (
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                          <CheckCircle className="h-4 w-4" />
                                        )}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => updateBookingStatus(booking.id, "rejected")}
                                        disabled={isUpdating === booking.id}
                                        className="transition-all"
                                      >
                                        {isUpdating === booking.id ? (
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                          <XCircle className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Details Dialog with 3D Effect */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl border-2 shadow-2xl backdrop-blur-sm bg-card/95">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-6 w-6 text-primary" />
              Booking Details
            </DialogTitle>
            <DialogDescription>Complete information about this booking request</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Client Name</Label>
                  <p className="font-medium text-lg">{selectedBooking.name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Status</Label>
                  <div>
                    <Badge
                      variant={
                        selectedBooking.status === "approved"
                          ? "default"
                          : selectedBooking.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                      className="shadow-sm"
                    >
                      {selectedBooking.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-muted/30 border">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <p className="font-medium">{selectedBooking.email}</p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-muted/30 border">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <p className="font-medium">{selectedBooking.phone}</p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border">
                <Label className="text-muted-foreground">Event Type</Label>
                <p className="font-medium text-lg">{selectedBooking.eventType}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 p-4 rounded-lg bg-muted/30 border">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </Label>
                  <p className="font-medium">
                    {format(new Date(selectedBooking.startDate), "PPPP")}
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-muted/30 border">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    End Date
                  </Label>
                  <p className="font-medium">
                    {format(new Date(selectedBooking.endDate), "PPPP")}
                  </p>
                </div>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-muted/30 border">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Guest Count
                </Label>
                <p className="font-medium text-lg">{selectedBooking.guestCount} guests</p>
              </div>

              {selectedBooking.message && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Additional Requirements</Label>
                  <p className="text-sm bg-gradient-to-br from-muted/50 to-muted/30 p-4 rounded-lg border">{selectedBooking.message}</p>
                </div>
              )}

              <div className="space-y-2 p-4 rounded-lg bg-muted/30 border">
                <Label className="text-muted-foreground">Submitted On</Label>
                <p className="text-sm font-medium">
                  {format(new Date(selectedBooking.createdAt), "PPPp")}
                </p>
              </div>

              {selectedBooking.status === "pending" && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 transition-all shadow-lg"
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, "approved")
                      setSelectedBooking(null)
                    }}
                    disabled={isUpdating === selectedBooking.id}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Booking
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 transition-all shadow-lg"
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, "rejected")
                      setSelectedBooking(null)
                    }}
                    disabled={isUpdating === selectedBooking.id}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Booking
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}