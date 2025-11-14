"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "✨ Welcome to AB Function Hall! I'm your virtual assistant. How can I help you today?\n\nYou can ask me about our venue, location, pricing, availability, or booking process!",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const knowledgeBase = {
    owner: "AB Function Hall is proudly owned by Shaik Bilaal. He's committed to making every event special and memorable for our clients.",
    contact: "📞 Contact us at: 6300972292\n\nFeel free to call us for any inquiries, bookings, or to schedule a venue visit. We're always happy to help!",
    location: "📍 AB Function Hall is located at:\n\nBehind SSGS Degree College\nSN Pet, Hanumesh Nagar\nGuntakal, Andhra Pradesh 515801\n\nWe have ample parking space available for your guests!",
    hours: "🕐 We're open:\nMonday - Sunday\n9:00 AM to 9:00 PM\n\nVisit us anytime during these hours to see our beautiful venue!",
    capacity: "AB Function Hall (also known as AB Convention Hall) offers a spacious venue perfect for both large gatherings and intimate celebrations. Our flexible space can accommodate your guest list comfortably.",
    features: "✨ Key Features:\n\n🏢 Spacious and Clean - Well-maintained, spacious hall\n❄️ Central Air Conditioning - Full AC throughout\n🍽️ Separate Dining Area - Dedicated space for meals\n🚗 Ample Parking - Plenty of space for guests\n🚻 Modern Restrooms - Clean facilities\n📸 Photo-Ready Spaces - Beautiful backdrops\n\nWe maintain the highest standards of cleanliness!",
    pricing: "Our pricing is competitive and varies based on:\n• Event type (wedding, birthday, corporate)\n• Number of days\n• Guest count\n• Additional services required\n\nFor a detailed quote tailored to your needs, please call us at 6300972292 or submit a booking request!",
    events: "🎉 Perfect for Every Occasion:\n\n💒 Weddings & Receptions\n🎂 Birthday Parties\n🏢 Corporate Events\n🎊 Large Celebrations\n💝 Intimate Gatherings\n📚 Conferences & Seminars\n\nWhatever your event, we'll make it special!",
    booking: "📅 Easy Booking Process:\n\n1. Click 'Book Your Event' on our website\n2. Fill in your event details\n3. Submit the form\n4. We'll contact you within 24 hours\n\nOr call us directly at 6300972292 to discuss your requirements!",
    amenities: "🌟 Our Amenities Include:\n\n❄️ Central Air Conditioning\n🍽️ Separate Dining Hall\n🚗 Ample Parking Space\n🚻 Clean Restrooms\n💡 Professional Lighting\n🎵 Sound System\n✨ Elegant Decor Options\n📸 Beautiful Photo Spots",
    availability: "To check availability for your specific date, please:\n\n📞 Call us at 6300972292\n📝 Submit a booking request on our website\n🏢 Visit us at our location in Guntakal\n\nWe'll respond promptly with available dates!",
    catering: "We offer customizable catering options with our expert culinary team. We can prepare various cuisines based on your preferences and dietary requirements. Contact us at 6300972292 to discuss your menu!",
    decoration: "Our professional decoration services can be tailored to match your event theme perfectly. From traditional to modern, elegant to grand - we bring your vision to life!",
    why: "🌟 Why Choose AB Function Hall?\n\n✅ Spacious & Clean venue\n✅ Central AC throughout\n✅ Separate dining area\n✅ Ample parking\n✅ Professional service\n✅ Flexible booking options\n✅ Competitive pricing\n✅ Perfect for all events\n\nExperience excellence at AB Function Hall!"
  }

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Greeting responses
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening|namaste)/)) {
      return "Hello! 🙏 Thank you for contacting AB Function Hall. I'm here to assist you with any questions about our venue, booking, pricing, or facilities. How can I help you today?"
    }

    // Owner related
    if (lowerMessage.includes("owner") || lowerMessage.includes("shaik") || lowerMessage.includes("bilaal") || lowerMessage.includes("who owns")) {
      return knowledgeBase.owner
    }

    // Contact/Phone related
    if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("number") || lowerMessage.includes("call") || lowerMessage.includes("reach")) {
      return knowledgeBase.contact
    }

    // Location/Address related
    if (lowerMessage.includes("location") || lowerMessage.includes("where") || lowerMessage.includes("address") || lowerMessage.includes("guntakal") || lowerMessage.includes("how to reach")) {
      return knowledgeBase.location
    }

    // Hours/Timing related
    if (lowerMessage.includes("hours") || lowerMessage.includes("timing") || lowerMessage.includes("open") || lowerMessage.includes("time") || lowerMessage.includes("when")) {
      return knowledgeBase.hours
    }

    // Capacity related
    if (lowerMessage.includes("capacity") || lowerMessage.includes("how many") || lowerMessage.includes("guests") || lowerMessage.includes("people") || lowerMessage.includes("size")) {
      return knowledgeBase.capacity
    }

    // Features related
    if (lowerMessage.includes("features") || lowerMessage.includes("key features") || lowerMessage.includes("what makes") || lowerMessage.includes("highlights")) {
      return knowledgeBase.features
    }

    // Pricing related
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("rate") || lowerMessage.includes("fee") || lowerMessage.includes("charge") || lowerMessage.includes("budget")) {
      return knowledgeBase.pricing
    }

    // Amenities/Facilities
    if (lowerMessage.includes("amenities") || lowerMessage.includes("facilities") || lowerMessage.includes("what do you offer") || lowerMessage.includes("services") || lowerMessage.includes("ac") || lowerMessage.includes("air condition") || lowerMessage.includes("parking")) {
      return knowledgeBase.amenities
    }

    // Booking process
    if (lowerMessage.includes("book") || lowerMessage.includes("reserve") || lowerMessage.includes("how to book") || lowerMessage.includes("reservation") || lowerMessage.includes("booking process")) {
      return knowledgeBase.booking
    }

    // Event types
    if (lowerMessage.includes("event") || lowerMessage.includes("wedding") || lowerMessage.includes("party") || lowerMessage.includes("corporate") || lowerMessage.includes("birthday") || lowerMessage.includes("what kind") || lowerMessage.includes("occasion")) {
      return knowledgeBase.events
    }

    // Availability
    if (lowerMessage.includes("available") || lowerMessage.includes("availability") || lowerMessage.includes("free") || lowerMessage.includes("vacant") || lowerMessage.includes("check date")) {
      return knowledgeBase.availability
    }

    // Catering
    if (lowerMessage.includes("food") || lowerMessage.includes("catering") || lowerMessage.includes("menu") || lowerMessage.includes("cuisine") || lowerMessage.includes("dining")) {
      return knowledgeBase.catering
    }

    // Decoration
    if (lowerMessage.includes("decor") || lowerMessage.includes("decoration") || lowerMessage.includes("theme") || lowerMessage.includes("design")) {
      return knowledgeBase.decoration
    }

    // Why choose
    if (lowerMessage.includes("why") || lowerMessage.includes("advantage") || lowerMessage.includes("benefit") || lowerMessage.includes("special")) {
      return knowledgeBase.why
    }

    // Thank you responses
    if (lowerMessage.match(/thank/)) {
      return "You're most welcome! 😊 If you have any other questions about AB Function Hall, feel free to ask. We're here to make your event perfect! You can also call us at 6300972292."
    }

    // Goodbye responses
    if (lowerMessage.match(/bye|goodbye|see you/)) {
      return "Thank you for contacting AB Function Hall! 👋 We look forward to hosting your special event. For any questions, call us at 6300972292. Have a wonderful day!"
    }

    // Default response
    return "I'd be happy to help you with information about AB Function Hall! 🏢\n\nYou can ask me about:\n\n📍 Location & Directions\n⏰ Operating Hours\n💰 Pricing & Packages\n📅 Booking Process\n🎉 Event Types We Host\n✨ Facilities & Amenities\n🍽️ Catering Options\n📞 Contact Information\n\nWhat would you like to know?"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800)
  }

  return (
    <>
      {/* Chat Button - Enhanced with gradient and animation */}
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className={cn(
          "fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-2xl transition-all hover:shadow-xl hover:scale-110",
          "bg-gradient-to-br from-primary via-primary to-secondary",
          "animate-pulse-glow",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="h-7 w-7" />
      </Button>

      {/* Chat Window - Enhanced design */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[420px] h-[650px] shadow-2xl flex flex-col border-2 animate-in slide-in-from-bottom-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground rounded-t-lg relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">AB Function Hall</CardTitle>
                <p className="text-xs opacity-90">Virtual Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-white/20 relative z-10"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/20 to-background">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-md",
                    message.role === "assistant"
                      ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                      : "bg-gradient-to-br from-accent to-accent/70 text-accent-foreground"
                  )}
                >
                  {message.role === "assistant" ? (
                    <Sparkles className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 max-w-[80%] text-sm break-words shadow-sm",
                    message.role === "assistant"
                      ? "bg-muted border border-border"
                      : "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 items-start animate-in fade-in">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-md">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-muted border border-border shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <form onSubmit={handleSubmit} className="p-4 border-t bg-background/50 backdrop-blur-sm">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border-2 focus-visible:ring-2 focus-visible:ring-primary"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim()}
                className="rounded-full h-10 w-10 bg-gradient-to-br from-primary to-secondary shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Powered by AB Function Hall AI
            </p>
          </form>
        </Card>
      )}
    </>
  )
}