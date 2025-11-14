import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Sparkles, UtensilsCrossed, Music, Camera } from "lucide-react";
import { ChatBot } from "@/components/ChatBot";

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section with 3D Background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Enhanced 3D Floating Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-background">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-[15%] w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-[20%] w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-parallax-float"></div>
          {/* Additional glowing orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-6 max-w-4xl">
              {/* Enhanced Welcome Heading with 3D Effects */}
              <div className="relative">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 animate-fade-in">
                  <span className="block text-foreground mb-3 drop-shadow-lg !text-[70px]">Welcome to</span>
                  <span className="block relative !text-7xl">
                    <span className="gradient-text drop-shadow-2xl text-6xl md:text-8xl animate-pulse-glow inline-block hover:scale-105 transition-transform duration-300 !font-bold !italic lg:!text-7xl lg:!text-red-500 !tracking-[-1px] !opacity-100 !block !bg-orange-400">
                      AB Function Hall
                    </span>
                    {/* Decorative elements */}
                    <Sparkles className="absolute -top-4 -right-4 md:-right-8 h-8 w-8 md:h-12 md:w-12 text-secondary animate-float" />
                    <Sparkles className="absolute -bottom-2 -left-4 md:-left-8 h-6 w-6 md:h-10 md:w-10 text-primary animate-float-delayed" />
                  </span>
                </h1>
                {/* Glowing underline effect */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 md:w-96 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 blur-sm"></div>
              </div>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-md">
                The perfect venue for your special moments. From elegant weddings to corporate events, we bring your vision to life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 button-3d shadow-xl">
                <Link href="/booking">Book Your Event</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 button-3d glass">
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 3D Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Venue Showcase Section with 3D Cards */}
      <section className="py-16 md:py-24 bg-muted/40 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-pulse-glow"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold gradient-text">Our Beautiful Venue</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the elegance and grandeur of AB Function Hall
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Exterior View with 3D Effect */}
            <Card className="overflow-hidden card-3d border-2 shadow-2xl">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/download-1762967725238.jpeg?width=8000&height=8000&resize=contain"
                  alt="AB Function Hall - Exterior View"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-secondary" />
                      Modern Architecture
                    </h3>
                    <p className="text-sm opacity-90">Spacious parking and beautiful exterior lighting</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Interior Banquet Hall with 3D Effect */}
            <Card className="overflow-hidden card-3d border-2 shadow-2xl">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/download-1-1762967732260.jpeg?width=8000&height=8000&resize=contain"
                  alt="AB Function Hall - Banquet Setup"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-secondary" />
                      Elegant Banquet Hall
                    </h3>
                    <p className="text-sm opacity-90">Premium ceiling decor and perfect lighting ambiance</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section id="features" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold gradient-text">Why Choose AB Function Hall?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our premium amenities and exceptional service make every event unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-3d shadow-lg border-2 hover:shadow-2xl group">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/50 mb-4 animate-pulse-glow group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Spacious Venue</CardTitle>
                <CardDescription className="text-base">
                  Accommodate up to 500 guests with flexible seating arrangements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-3d shadow-lg border-2 hover:shadow-2xl group">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/50 mb-4 animate-pulse-glow group-hover:scale-110 transition-transform">
                  <UtensilsCrossed className="h-7 w-7 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl">Premium Catering</CardTitle>
                <CardDescription className="text-base">
                  Customizable menus with expert culinary team for any cuisine
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-3d shadow-lg border-2 hover:shadow-2xl group">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/50 mb-4 animate-pulse-glow group-hover:scale-110 transition-transform">
                  <Sparkles className="h-7 w-7 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Elegant Decor</CardTitle>
                <CardDescription className="text-base">
                  Professional decoration services tailored to your theme
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-3d shadow-lg border-2 hover:shadow-2xl group">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/50 mb-4 animate-pulse-glow group-hover:scale-110 transition-transform">
                  <Music className="h-7 w-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Sound & Lighting</CardTitle>
                <CardDescription className="text-base">
                  State-of-the-art audio-visual equipment and lighting systems
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-3d shadow-lg border-2 hover:shadow-2xl group">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/50 mb-4 animate-pulse-glow group-hover:scale-110 transition-transform">
                  <Calendar className="h-7 w-7 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl">Flexible Booking</CardTitle>
                <CardDescription className="text-base">
                  Book for single or multiple days based on your event needs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-3d shadow-lg border-2 hover:shadow-2xl group">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/50 mb-4 animate-pulse-glow group-hover:scale-110 transition-transform">
                  <Camera className="h-7 w-7 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Photo-Ready Spaces</CardTitle>
                <CardDescription className="text-base">
                  Beautiful backdrops and photo opportunities throughout the venue
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Types Section with 3D Image Cards */}
      <section className="py-16 md:py-24 bg-muted/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold gradient-text">Perfect For Every Occasion</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Host any type of event in our versatile space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
            { title: "Weddings", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800" },
            { title: "Corporate Events", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800" },
            { title: "Birthday Parties", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800" },
            { title: "Receptions", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800" }].
            map((event) =>
            <Card key={event.title} className="overflow-hidden card-3d cursor-pointer shadow-xl border-2 hover:shadow-2xl group">
                <div className="relative h-56 overflow-hidden">
                  <img
                  src={event.image}
                  alt={event.title}
                  className="object-cover w-full h-full group-hover:scale-125 transition-transform duration-700" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <CardHeader className="relative -mt-16 z-10">
                  <CardTitle className="text-center text-xl text-white drop-shadow-lg">{event.title}</CardTitle>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section with 3D Effects */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        <div className="container relative z-10">
          <Card className="bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground overflow-hidden relative shadow-2xl border-0 card-3d">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <CardContent className="relative p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">Ready to Book Your Event?</h2>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                Let us help you create unforgettable memories. Contact us today to check availability and discuss your event requirements.
              </p>
              <Button asChild size="lg" variant="secondary" className="text-lg px-10 shadow-2xl button-3d hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                <Link href="/booking">Start Booking Process</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Chatbot */}
      <ChatBot />
    </div>);

}