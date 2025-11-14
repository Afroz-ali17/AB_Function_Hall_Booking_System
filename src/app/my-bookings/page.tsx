"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Calendar, Users, Clock, Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"
import { toast } from "sonner"

interface Booking {
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
  userId: string | null
  createdAt: string
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, isPending } = useSession()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/my-bookings")
    }
  }, [session, isPending, router])

  // Fetch bookings
  useEffect(() => {
    if (session?.user) {
      fetchBookings()
    }
  }, [session])

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem("bearer_token")
      
      const response = await fetch("/api/my-bookings", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch bookings")
      }

      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error("Error fetching bookings:", error)
      toast.error("Failed to load bookings")
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while checking authentication
  if (isPending) {
    return (
      <div className="container py-16 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Don't render if not authenticated (will redirect)
  if (!session?.user) {
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <div className="container py-16 relative">
      {/* 3D Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            My Bookings
          </h1>
          <p className="text-muted-foreground text-lg">
            Track the status of your function hall booking requests
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : bookings.length === 0 ? (
          /* Empty State */
          <Card className="max-w-2xl mx-auto text-center backdrop-blur-sm bg-card/50 border-border/50">
            <CardContent className="pt-16 pb-16 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Calendar className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold">No Bookings Yet</h2>
              <p className="text-muted-foreground text-lg">
                You haven't made any booking requests yet. Start by booking our function hall for your event!
              </p>
              <Button onClick={() => router.push("/booking")} size="lg">
                Book Now
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Bookings List */
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{booking.eventType}</CardTitle>
                      <CardDescription className="text-base">
                        Booking #{booking.id} • Submitted {format(new Date(booking.createdAt), "MMM dd, yyyy")}
                      </CardDescription>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Event Dates</p>
                          <p className="font-semibold">
                            {format(new Date(booking.startDate), "MMM dd, yyyy")}
                          </p>
                          <p className="text-sm text-muted-foreground">to</p>
                          <p className="font-semibold">
                            {format(new Date(booking.endDate), "MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Guest Count</p>
                          <p className="font-semibold">{booking.guestCount} guests</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {booking.message && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-sm font-medium text-muted-foreground mb-2">Additional Requirements</p>
                          <p className="text-sm">{booking.message}</p>
                        </div>
                      )}

                      {/* Status Message */}
                      <div className="p-4 rounded-lg border border-border/50 bg-gradient-to-br from-muted/50 to-muted/20">
                        {booking.status === "pending" && (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="h-5 w-5 text-yellow-600" />
                              <p className="font-semibold text-yellow-600">Under Review</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Your booking request is being reviewed by our team. We'll contact you shortly to discuss pricing and confirm availability.
                            </p>
                          </>
                        )}
                        {booking.status === "approved" && (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <p className="font-semibold text-green-600">Booking Confirmed!</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Your booking has been approved. Our team will reach out to finalize the details and discuss payment.
                            </p>
                          </>
                        )}
                        {booking.status === "rejected" && (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <XCircle className="h-5 w-5 text-red-600" />
                              <p className="font-semibold text-red-600">Booking Declined</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Unfortunately, we couldn't accommodate this booking. Please contact us for alternative dates or more information.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {bookings.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button onClick={() => router.push("/booking")} size="lg">
              Book Another Event
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
