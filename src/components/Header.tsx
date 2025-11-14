"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, isPending, refetch } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    const { error } = await authClient.signOut()
    if (error?.code) {
      toast.error(error.code)
    } else {
      localStorage.removeItem("bearer_token")
      refetch()
      router.push("/")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b glass backdrop-blur-xl shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-secondary shadow-xl button-3d group-hover:shadow-2xl transition-all animate-pulse-glow">
            <span className="text-lg font-bold text-primary-foreground relative z-10">AB</span>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)] rounded-xl"></div>
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:inline-block">AB Function Hall</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/booking" className="text-sm font-medium transition-colors hover:text-primary relative group">
            Book Now
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
          </Link>
          {session?.user && (
            <Link href="/my-bookings" className="text-sm font-medium transition-colors hover:text-primary relative group">
              My Bookings
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
            </Link>
          )}
          <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary relative group">
            Admin
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Auth Buttons + Theme Toggle - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          {isPending ? (
            <div className="h-9 w-24 animate-pulse bg-muted rounded-md"></div>
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="button-3d shadow-md glass">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-bold animate-pulse-glow">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="max-w-32 truncate">{session.user.name}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass backdrop-blur-xl border-2">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer hover:bg-destructive/10 hover:text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" className="button-3d">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild className="button-3d shadow-lg bg-gradient-to-r from-primary to-secondary hover:shadow-xl">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="button-3d"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t glass backdrop-blur-xl">
          <nav className="container py-4 flex flex-col space-y-3">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/booking"
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Link>
            {session?.user && (
              <Link
                href="/my-bookings"
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Bookings
              </Link>
            )}
            <Link
              href="/admin"
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <div className="pt-3 border-t space-y-2">
              {isPending ? (
                <div className="h-9 animate-pulse bg-muted rounded-md"></div>
              ) : session?.user ? (
                <>
                  <div className="text-sm py-2">
                    <p className="font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground">{session.user.email}</p>
                  </div>
                  <Button
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                    variant="destructive"
                    className="w-full button-3d"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full button-3d">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                  <Button asChild className="w-full button-3d bg-gradient-to-r from-primary to-secondary">
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}