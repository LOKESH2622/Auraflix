"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bot, X, MessageSquare, ChevronRight, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! I'm NeoxAI, your streaming assistant. How can I help you today?" },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: inputValue }])

    // Simulate AI response
    setTimeout(() => {
      let response = "I'll look into that for you right away."

      if (inputValue.toLowerCase().includes("problem") || inputValue.toLowerCase().includes("issue")) {
        response =
          "I'm sorry you're experiencing problems. Could you provide more details about what's happening? Our support team will be notified."
      } else if (inputValue.toLowerCase().includes("recommend") || inputValue.toLowerCase().includes("suggestion")) {
        response =
          "Based on your viewing history, you might enjoy 'Quantum Effect' or 'Neon Nights'. Would you like more recommendations?"
      } else if (inputValue.toLowerCase().includes("account") || inputValue.toLowerCase().includes("billing")) {
        response =
          "For account and billing questions, I can connect you with our support team. Would you like me to do that?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    }, 1000)

    setInputValue("")
  }

  const flaggedReviews = [
    {
      id: 1,
      title: "Cosmic Horizon",
      review: "This is the best movie ever made! Everyone must watch it now! Click my profile for amazing deals!",
      user: "movie_fan_2023",
      confidence: 92,
      reason: "Promotional content, excessive enthusiasm, call to action",
    },
    {
      id: 2,
      title: "The Quantum Effect",
      review: "Terrible movie, worst I've ever seen. Don't waste your time.",
      user: "new_account_5678",
      confidence: 78,
      reason: "New account, extreme negativity, no specific details",
    },
  ]

  const anomalies = [
    {
      id: 1,
      type: "Rating Manipulation",
      description: "Unusual spike in 5-star ratings for 'Digital Dreams' in the last 24 hours",
      severity: "Medium",
      status: "Investigating",
    },
    {
      id: 2,
      type: "Bot Activity",
      description: "Multiple accounts with similar behavior patterns reviewing 'Neon Nights'",
      severity: "High",
      status: "Confirmed",
    },
  ]

  return (
    <>
      {/* Floating AI Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed z-50 bottom-6 right-6 rounded-full w-14 h-14 bg-purple-600 hover:bg-purple-700 shadow-lg ${isOpen ? "hidden" : "flex"}`}
        size="icon"
      >
        <Bot className="h-6 w-6" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>

      {/* AI Assistant Panel */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? "visible" : "invisible"}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

        <Card className="w-full max-w-md md:max-w-lg relative z-10 bg-zinc-900 border-zinc-800 text-white shadow-xl">
          <CardHeader className="border-b border-zinc-800 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 text-purple-400 mr-2" />
                <CardTitle className="text-lg">NeoxAI Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-zinc-800"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-gray-400">
              AI-powered assistance for your streaming experience
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-zinc-800 border-b border-zinc-700 w-full justify-start rounded-none p-0">
              <TabsTrigger
                value="chat"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-purple-400 rounded-none border-r border-zinc-700"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Support Chat
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-purple-400 rounded-none border-r border-zinc-700"
              >
                <Shield className="h-4 w-4 mr-2" />
                Review Monitor
              </TabsTrigger>
              <TabsTrigger
                value="anomalies"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-purple-400 rounded-none"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Anomalies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="m-0">
              <ScrollArea className="h-[300px] p-4">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-purple-600 text-white" : "bg-zinc-800 text-gray-200"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </ScrollArea>

              <CardFooter className="border-t border-zinc-800 p-3 flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                <Button size="icon" onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </TabsContent>

            <TabsContent value="reviews" className="m-0">
              <ScrollArea className="h-[300px]">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-300">Flagged Reviews</h3>
                    <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-700">
                      AI Monitored
                    </Badge>
                  </div>

                  {flaggedReviews.map((review) => (
                    <Card key={review.id} className="bg-zinc-800 border-zinc-700">
                      <CardHeader className="p-3 pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-sm">{review.title}</CardTitle>
                            <CardDescription className="text-xs text-gray-400">by {review.user}</CardDescription>
                          </div>
                          <Badge
                            className={`${
                              review.confidence > 90
                                ? "bg-red-900/30 text-red-300 border-red-700"
                                : "bg-yellow-900/30 text-yellow-300 border-yellow-700"
                            }`}
                          >
                            {review.confidence}% Suspicious
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <p className="text-sm text-gray-300 mb-2">"{review.review}"</p>
                        <p className="text-xs text-gray-400">Reason: {review.reason}</p>
                      </CardContent>
                      <CardFooter className="p-3 pt-0 flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Ignore
                        </Button>
                        <Button size="sm" className="h-8 text-xs bg-purple-600 hover:bg-purple-700">
                          Remove
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="anomalies" className="m-0">
              <ScrollArea className="h-[300px]">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-300">Detected Anomalies</h3>
                    <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-700">
                      Real-time Analysis
                    </Badge>
                  </div>

                  {anomalies.map((anomaly) => (
                    <Card key={anomaly.id} className="bg-zinc-800 border-zinc-700">
                      <CardHeader className="p-3 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-sm">{anomaly.type}</CardTitle>
                          <Badge
                            className={`${
                              anomaly.severity === "High"
                                ? "bg-red-900/30 text-red-300 border-red-700"
                                : "bg-yellow-900/30 text-yellow-300 border-yellow-700"
                            }`}
                          >
                            {anomaly.severity}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <p className="text-sm text-gray-300 mb-2">{anomaly.description}</p>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs">
                            {anomaly.status}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 pt-0 flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Details
                        </Button>
                        <Button size="sm" className="h-8 text-xs bg-purple-600 hover:bg-purple-700">
                          Take Action
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  )
}

