import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t glass backdrop-blur-xl relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-[10%] w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-[15%] w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="container py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4 group">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-secondary shadow-xl button-3d group-hover:shadow-2xl transition-all animate-pulse-glow">
                <span className="text-lg font-bold text-primary-foreground relative z-10">AB</span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)] rounded-xl"></div>
              </div>
              <span className="text-xl font-bold gradient-text">AB Function Hall</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creating memorable events in a stunning venue. Perfect for weddings, corporate events, birthdays, and special celebrations.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-4 text-lg gradient-text">Contact Us</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-3 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="flex-1 leading-relaxed !whitespace-pre-line">59GQ+H86, behind SSGS Degree College, SN Pet, Guntakal, Andhra Pradesh 515801</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="h-4 w-4 text-secondary" />
                </div>
                <a href="tel:+916300972292" className="hover:text-primary transition-colors font-medium">
                  +91 6300972292
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-4 w-4 text-accent-foreground" />
                </div>
                <a href="mailto:Shaikbilaal223@gmail.com" className="hover:text-primary transition-colors font-medium">
                  Shaikbilaal223@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h3 className="font-semibold mb-4 text-lg gradient-text">Quick Links</h3>
            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="block hover:text-primary transition-colors hover:translate-x-1 transform duration-200 font-medium">
                Home
              </Link>
              <Link href="/booking" className="block hover:text-primary transition-colors hover:translate-x-1 transform duration-200 font-medium">
                Book Now
              </Link>
              <Link href="/admin" className="block hover:text-primary transition-colors hover:translate-x-1 transform duration-200 font-medium">
                Admin Dashboard
              </Link>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg gradient-text">Follow Us</h3>
              <div className="flex space-x-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all button-3d group">
                  <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 hover:bg-secondary hover:text-secondary-foreground transition-all button-3d group">
                  <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 hover:bg-accent hover:text-accent-foreground transition-all button-3d group">
                  <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="gradient-text font-semibold">AB Function Hall</span>
            <span>. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>);

}