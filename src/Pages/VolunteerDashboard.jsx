
import React, { useState, useEffect } from "react";
import RequestData from "../Entities/Request.json"; // default import
import { User } from "../Entities/User";
import { card, CardHeader, CardTitle, CardContent } from "../Components/ui/card";
import { button } from "../Components/ui/button";
import badge from '/src/Components/ui/badge.jsx';
import { Heart, MapPin, CheckCircle, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { Alert, AlertDescription } from "../Components/ui/alert";

const urgencyColors = {
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

export default function VolunteerDashboard() {
  const [openRequests, setOpenRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState(null);
  const [resolvingId, setResolvingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      const allRequests = await Request.list("-created_date");
      
      setOpenRequests((allRequests || []).filter(r => r.status === "open"));
      setMyRequests((allRequests || []).filter(r => r.assigned_volunteer === currentUser.email && r.status !== "resolved"));
    } catch (err) {
      console.error("Failed to load data:", err);
      setUser(null);
      setError("A network error occurred. Please check your connection and try again.");
    }
    setIsLoading(false);
  };

  const handleAccept = async (requestId) => {
    if (!user) return;
    
    setAcceptingId(requestId);
    try {
      await Request.update(requestId, {
        status: "in_progress",
        assigned_volunteer: user.email
      });
      await loadData();
      setError(null);
    } catch (err) {
      console.error("Failed to accept request:", err);
      setError("Failed to accept request. Please try again.");
    }
    setAcceptingId(null);
  };

  const handleResolve = async (requestId) => {
    setResolvingId(requestId);
    try {
      await Request.update(requestId, {
        status: "resolved"
      });
      await loadData();
      setError(null);
    } catch (err) {
      console.error("Failed to resolve request:", err);
      setError("Failed to resolve request. Please try again.");
    }
    setResolvingId(null);
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#1D3557] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-[#E63946] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#1D3557] mb-3">Login Required</h2>
            <p className="text-gray-600 mb-6">Please log in to access the volunteer dashboard</p>
            <Button onClick={() => User.login()} className="btn-primary">
              Login / Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="ml-2">{error}</AlertDescription>
              </div>
              <Button onClick={loadData} variant="destructive" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-[#1D3557] to-[#2A4A73] rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-[#E63946]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Volunteer Dashboard</h1>
                <p className="text-gray-200">Welcome back, {user.full_name}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-200 mb-1">Open Requests</p>
                <p className="text-3xl font-bold">{openRequests.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-200 mb-1">My Active Tasks</p>
                <p className="text-3xl font-bold">{myRequests.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-200 mb-1">High Priority</p>
                <p className="text-3xl font-bold text-[#E63946]">
                  {openRequests.filter(r => r.urgency === "high").length}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-200 mb-1">Status</p>
                <p className="text-xl font-bold text-[#06D6A0]">Active</p>
              </div>
            </div>
          </div>
        </motion.div>

        {myRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-[#1D3557] mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              My Active Requests ({myRequests.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {myRequests.map((request) => (
                <Card key={request.id} className="shadow-lg border-l-4 border-l-[#F77F00] hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{categoryIcons[request.category]}</span>
                        <div>
                          <CardTitle className="text-xl text-[#1D3557]">{request.title}</CardTitle>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {request.location_name}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        style={{ 
                          backgroundColor: `${urgencyColors[request.urgency]}20`,
                          color: urgencyColors[request.urgency],
                          borderColor: urgencyColors[request.urgency]
                        }}
                        className="border"
                      >
                        {request.urgency}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{request.description}</p>
                    {request.requester_contact && (
                      <p className="text-sm text-gray-500 mb-4">Contact: {request.requester_contact}</p>
                    )}
                    <Button
                      onClick={() => handleResolve(request.id)}
                      disabled={resolvingId === request.id}
                      className="bg-[#06D6A0] hover:bg-[#05BF8E] text-white w-full"
                    >
                      {resolvingId === request.id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Marking as Resolved...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Resolved
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[#1D3557] mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#E63946]" />
            Available Requests ({openRequests.length})
          </h2>
          
          {openRequests.length === 0 && !error && (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-[#06D6A0] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1D3557] mb-2">All Caught Up!</h3>
                <p className="text-gray-600">No open requests at the moment. Great work volunteer!</p>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {openRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card 
                    className="shadow-lg border-l-4 hover:shadow-xl transition-all h-full"
                    style={{ borderLeftColor: urgencyColors[request.urgency] }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{categoryIcons[request.category]}</span>
                          <div>
                            <CardTitle className="text-lg text-[#1D3557]">{request.title}</CardTitle>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {request.location_name}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{request.description}</p>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          {request.category}
                        </Badge>
                        <Badge 
                          style={{ 
                            backgroundColor: `${urgencyColors[request.urgency]}20`,
                            color: urgencyColors[request.urgency],
                            borderColor: urgencyColors[request.urgency]
                          }}
                          className="border text-xs"
                        >
                          {request.urgency}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleAccept(request.id)}
                        disabled={acceptingId === request.id}
                        className="btn-primary w-full"
                      >
                        {acceptingId === request.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Accepting...
                          </>
                        ) : (
                          <>
                            <Heart className="w-4 h-4 mr-2" />
                            Accept Request
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
