import React, { useState } from "react";
import RequestData from "../Entities/Request.json"; 
import { User } from "../Entities/User";
// import { UploadFile, InvokeLLM } from "../integr?ations/Core";
// import { button } from "../Components/ui/button";
// import { Input } from "../Components/ui/input";
// import { Textarea } from "../Components/ui/textarea";
// import { Card, CardHeader, CardTitle, CardContent } from "../Components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select";
import { AlertCircle, MapPin, Upload, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
// import { Alert, AlertDescription } from "../Components/ui/alert";
import { motion } from "framer-motion";

export default function PostRequestPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "medium",
    latitude: null,
    longitude: null,
    location_name: "",
    photo_url: "",
    requester_contact: ""
  });

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          fetchLocationName(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError("Could not detect your location. Please enable location services.");
        }
      );
    }
  }, []);

  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        location_name: data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      }));
    } catch (err) {
      setFormData(prev => ({
        ...prev,
        location_name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      }));
    }
  };

  const handleAIAnalysis = async () => {
    if (!formData.description) return;

    setIsAnalyzing(true);
    try {
      const result = await InvokeLLM({
        prompt: `Analyze this disaster relief request and suggest the category (food, water, medical, shelter, other) and urgency level (low, medium, high):

Request: "${formData.description}"

Return only JSON with category and urgency.`,
        response_json_schema: {
          type: "object",
          properties: {
            category: { type: "string" },
            urgency: { type: "string" }
          }
        }
      });

      setFormData(prev => ({
        ...prev,
        category: result.category,
        urgency: result.urgency
      }));
    } catch (err) {
      console.error("AI analysis failed:", err);
    }
    setIsAnalyzing(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { file_url } = await UploadFile({ file });
      setFormData(prev => ({ ...prev, photo_url: file_url }));
    } catch (err) {
      setError("Failed to upload photo. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.description || !formData.category) {
      setError("Please fill in all required fields");
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      setError("Location is required. Please enable location services.");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await User.me();
      await Request.create({
        ...formData,
        requester_contact: formData.requester_contact || user.email
      });

      setSuccess(true);
      setTimeout(() => {
        navigate(createPageUrl("Map"));
      }, 2000);
    } catch (err) {
      setError("Failed to submit request. Please try again.");
    }

    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#06D6A0] to-[#05BF8E] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <CheckCircle className="w-16 h-16 text-[#06D6A0]" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Request Submitted!</h2>
          <p className="text-xl text-white/90">Volunteers nearby will see your request immediately</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#E63946] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <AlertCircle className="w-4 h-4" />
              Emergency Request
            </div>
            <h1 className="text-4xl font-bold text-[#1D3557] mb-3">Post Help Request</h1>
            <p className="text-lg text-gray-600">Tell us what you need - help will arrive soon</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="shadow-xl border-none">
            <CardHeader className="bg-gradient-to-r from-[#1D3557] to-[#2A4A73] text-white">
              <CardTitle className="text-2xl">Request Details</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Request Title *
                  </label>
                  <Input
                    placeholder="e.g., Need food and water for family of 4"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <Textarea
                    placeholder="Describe your situation in detail. What help do you need?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    onBlur={handleAIAnalysis}
                    className="h-32 text-base"
                  />
                  {isAnalyzing && (
                    <div className="flex items-center gap-2 text-sm text-[#1D3557] mt-2">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      AI analyzing your request...
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">🍽️ Food</SelectItem>
                        <SelectItem value="water">💧 Water</SelectItem>
                        <SelectItem value="medical">🏥 Medical</SelectItem>
                        <SelectItem value="shelter">🏠 Shelter</SelectItem>
                        <SelectItem value="other">❓ Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Urgency Level *
                    </label>
                    <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Can wait</SelectItem>
                        <SelectItem value="medium">Medium - Soon</SelectItem>
                        <SelectItem value="high">High - Urgent!</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Location
                  </label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <MapPin className="w-5 h-5 text-[#E63946]" />
                    <span className="text-sm text-gray-700 flex-1">
                      {formData.location_name || "Detecting location..."}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Information
                  </label>
                  <Input
                    placeholder="Phone number or email"
                    value={formData.requester_contact}
                    onChange={(e) => setFormData({ ...formData, requester_contact: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1D3557] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload a photo</p>
                    </label>
                    {formData.photo_url && (
                      <img src={formData.photo_url} alt="Uploaded" className="mt-4 max-h-48 mx-auto rounded-lg" />
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-lg py-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Submit Help Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}