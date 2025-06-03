"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Star, Upload, Check, AlertCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

const Feedback = () => {
  // State for feedback form
  const [simulations, setSimulations] = useState([])
  const [selectedSimulation, setSelectedSimulation] = useState(null)
  const [overallRating, setOverallRating] = useState(0)
  const [accuracyRating, setAccuracyRating] = useState(0)
  const [comments, setComments] = useState("")
  const [category, setCategory] = useState("Simulation Quality")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [file, setFile] = useState(null)
  const [fileDescription, setFileDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'
  const [activeTab, setActiveTab] = useState("simulation")

  // Fetch user's simulations
  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        const userId = user?.id

        if (!userId) {
          console.error("User not authenticated")
          return
        }

        // Get simulations with persona info
        const { data: userSimulations, error } = await supabase
          .from("simulations")
          .select(`
            id,
            title,
            description,
            created_at,
            persona_id,
            personas (name)
          `)
          .eq("user_id", userId)
          .order("created_at", { ascending: false })

        if (error) throw error

        setSimulations(userSimulations || [])
      } catch (error) {
        console.error("Error fetching simulations:", error)
      }
    }

    fetchSimulations()
  }, [])

  const handleSimulationSelect = (simulation) => {
    setSelectedSimulation(simulation)
    // Reset ratings when selecting a new simulation
    setOverallRating(0)
    setAccuracyRating(0)
    setComments("")
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmitFeedback = async () => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const userId = isAnonymous ? null : user?.id

      // Submit feedback to Supabase
      const { data, error } = await supabase.from("feedback").insert({
        user_id: userId,
        simulation_id: selectedSimulation?.id,
        rating_overall: overallRating,
        rating_accuracy: accuracyRating,
        comments,
        category,
      })

      if (error) throw error

      // Reset form
      setSelectedSimulation(null)
      setOverallRating(0)
      setAccuracyRating(0)
      setComments("")
      setCategory("Simulation Quality")
      setIsAnonymous(false)

      setSubmitStatus("success")
    } catch (error) {
      console.error("Error submitting feedback:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitDataSnippet = async () => {
    if (!file) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const userId = user?.id

      if (!userId) throw new Error("User not authenticated")

      // Upload file to Supabase Storage
      const filePath = `research_data/${userId}/${Date.now()}_${file.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("research_notes")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Create record in research_data table
      const { data, error } = await supabase.from("research_data").insert({
        user_id: userId,
        file_path: filePath,
        description: fileDescription,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
      })

      if (error) throw error

      // Reset form
      setFile(null)
      setFileDescription("")

      setSubmitStatus("success")
    } catch (error) {
      console.error("Error uploading data snippet:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating, setRating, name) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
            aria-label={`Rate ${star} out of 5 stars`}
          >
            <Star
              className={`h-8 w-8 ${
                star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              } transition-colors`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-neutral-gray">{rating > 0 ? `${rating}/5` : "Select rating"}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black font-['Inter'] mb-2">Feedback Center</h1>
          <p className="text-neutral-gray font-['Inter'] max-w-2xl mx-auto">
            Help us improve Simulacrum by sharing your thoughts on simulations and the platform. Your feedback directly
            influences our development priorities.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="simulation" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simulation">Simulation Feedback</TabsTrigger>
            <TabsTrigger value="data">Upload Research Data</TabsTrigger>
          </TabsList>

          {/* Simulation Feedback Tab */}
          <TabsContent value="simulation">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-black font-['Inter']">
                  Rate Your Simulation Experience
                </CardTitle>
                <CardDescription>
                  Select a simulation and provide your feedback on its accuracy and usefulness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Simulation Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black font-['Inter']">Select Simulation</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {simulations.map((sim) => (
                      <div
                        key={sim.id}
                        onClick={() => handleSimulationSelect(sim)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedSimulation?.id === sim.id
                            ? "border-purple bg-light-purple"
                            : "border-light-gray hover:border-purple"
                        }`}
                      >
                        <h3 className="font-medium text-black font-['Inter'] mb-1">
                          {sim.title || `Simulation #${sim.id.substring(0, 8)}`}
                        </h3>
                        <div className="flex justify-between text-xs text-neutral-gray">
                          <span>Persona: {sim.personas?.name || "Unknown"}</span>
                          <span>{new Date(sim.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}

                    {simulations.length === 0 && (
                      <div className="col-span-2 p-8 text-center text-neutral-gray">
                        No simulations found. Run a simulation first to provide feedback.
                      </div>
                    )}
                  </div>
                </div>

                {selectedSimulation && (
                  <>
                    {/* Overall Rating */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-black font-['Inter']">Overall Experience</label>
                      {renderStars(overallRating, setOverallRating, "overall")}
                    </div>

                    {/* Accuracy Rating */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-black font-['Inter']">Persona Accuracy</label>
                      {renderStars(accuracyRating, setAccuracyRating, "accuracy")}
                    </div>

                    {/* Feedback Category */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-black font-['Inter']">Feedback Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-md border border-light-gray px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple"
                      >
                        <option value="Simulation Quality">Simulation Quality</option>
                        <option value="Persona Accuracy">Persona Accuracy</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Bug Report">Bug Report</option>
                      </select>
                    </div>

                    {/* Comments */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-black font-['Inter']">Comments</label>
                      <Textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Share your thoughts about this simulation..."
                        className="min-h-[120px] border-light-gray focus:ring-purple"
                      />
                    </div>

                    {/* Anonymous Option */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-light-gray text-purple focus:ring-purple h-4 w-4"
                      />
                      <label htmlFor="anonymous" className="text-sm text-neutral-gray font-['Inter']">
                        Submit anonymously
                      </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      onClick={handleSubmitFeedback}
                      disabled={isSubmitting || overallRating === 0 || accuracyRating === 0}
                      className="w-full bg-purple text-white hover:bg-purple/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Feedback"
                      )}
                    </Button>
                  </>
                )}

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-md">
                    <Check className="h-5 w-5 mr-2" />
                    Thank you for your feedback! Your input helps us improve Simulacrum.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center p-4 bg-red-50 text-red-700 rounded-md">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    There was an error submitting your feedback. Please try again.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Upload Tab */}
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-black font-['Inter']">Upload Research Data</CardTitle>
                <CardDescription>
                  Share data snippets, research notes, or other materials to help improve our simulations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black font-['Inter']">Upload File</label>
                  <div className="border-2 border-dashed border-light-gray rounded-lg p-8 text-center">
                    <input type="file" id="file-upload" onChange={handleFileChange} className="hidden" />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-neutral-gray mb-2" />
                      <span className="text-neutral-gray font-['Inter'] mb-1">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </span>
                      <span className="text-xs text-neutral-gray font-['Inter']">
                        PDF, CSV, JSON, TXT, or image files up to 10MB
                      </span>
                    </label>
                  </div>
                </div>

                {/* File Description */}
                {file && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black font-['Inter']">Description</label>
                    <Textarea
                      value={fileDescription}
                      onChange={(e) => setFileDescription(e.target.value)}
                      placeholder="Describe what this data contains and how it might be useful..."
                      className="min-h-[120px] border-light-gray focus:ring-purple"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  onClick={handleSubmitDataSnippet}
                  disabled={isSubmitting || !file}
                  className="w-full bg-purple text-white hover:bg-purple/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Data"
                  )}
                </Button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-md">
                    <Check className="h-5 w-5 mr-2" />
                    Thank you for your contribution! Your data has been uploaded successfully.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center p-4 bg-red-50 text-red-700 rounded-md">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    There was an error uploading your data. Please try again.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Feedback
