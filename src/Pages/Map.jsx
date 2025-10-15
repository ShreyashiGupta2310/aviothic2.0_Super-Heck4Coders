
import React, { useState, useEffect } from "react";

import { button } from "../Components/ui/button";
import badge from '/src/Components/ui/badge.jsx';

import { card } from "../Components/ui/card";
import { MapPin, Loader2, AlertCircle, RefreshCw } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import RequestData from "../Entities/Request.json"; // default import



import { motion, AnimatePresence } from "framer-motion";
// import { Alert, AlertDescription } from "../Components/ui/select";

const urgencyColors = 
{
  high: "#E63946",
  medium: "#F77F00",
  low: "#06D6A0"
};

const categoryIcons = {
  food: "🍽️",
  water: "💧",
  medical: "🏥",
  shelter: "🏠",
  other: "❓"
};

const statusColors = {
  open: "bg-red-100 text-red-800 border-red-200",
  in_progress: "bg-yellow-100 text-yellow-800 border-yellow-200",
  resolved: "bg-green-100 text-green-800 border-green-200"
};

export default function MapPage() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    loadRequests();
    const interval = setInterval(loadRequests, 10000);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          console.log("Location access denied:", err);
        }
      );
    }

    return () => clearInterval(interval);
  }, []);

  const loadRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await Request.list("-created_date");
      setRequests(data || []);
    } catch (err) {
      console.error("Error loading requests:", err);
      setError("A network error occurred. Please check your connection and try again.");
      setRequests([]);
    }
    setIsLoading(false);
  };

  const filteredRequests = requests.filter(req => {
    const categoryMatch = filterCategory === "all" || req.category === filterCategory;
    const statusMatch = filterStatus === "all" || req.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  if (isLoading && requests.length === 0) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#1D3557] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1D3557] mb-2">Active Requests Map</h1>
          <p className="text-gray-600">View and respond to help requests in your area</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="ml-2">{error}</AlertDescription>
              </div>
              <Button onClick={loadRequests} variant="destructive" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </Alert>
        )}

        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Filter by Category</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="food">🍽️ Food</SelectItem>
                  <SelectItem value="water">💧 Water</SelectItem>
                  <SelectItem value="medical">🏥 Medical</SelectItem>
                  <SelectItem value="shelter">🏠 Shelter</SelectItem>
                  <SelectItem value="other">❓ Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Filter by Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-[#1D3557] mb-4">
            Showing {filteredRequests.length} {filteredRequests.length === 1 ? 'Request' : 'Requests'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card
                  className="p-6 cursor-pointer hover:shadow-xl transition-all border-l-4 h-full"
                  style={{ borderLeftColor: urgencyColors[request.urgency] }}
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{categoryIcons[request.category]}</span>
                      <div>
                        <h3 className="font-bold text-lg text-[#1D3557]">{request.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{request.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{request.location_name || "Location provided"}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant="outline" 
                      className={statusColors[request.status]}
                    >
                      {request.status.replace('_', ' ')}
                    </Badge>
                    <Badge 
                      variant="outline"
                      style={{ 
                        backgroundColor: `${urgencyColors[request.urgency]}20`,
                        color: urgencyColors[request.urgency],
                        borderColor: urgencyColors[request.urgency]
                      }}
                    >
                      {request.urgency} priority
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredRequests.length === 0 && !isLoading && !error && (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-xl text-gray-500">No requests match your filters</p>
          </div>
        )}
      </div>

      <RequestDetailModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onUpdate={loadRequests}
      />
    </div>
  );
}
