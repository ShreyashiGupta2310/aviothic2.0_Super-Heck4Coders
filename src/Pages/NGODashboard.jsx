
import React, { useState, useEffect } from "react";
import RequestData from "../Entities/Request.json"; // default import
// import { User } from "../Entities/user";
// import { Card, CardHeader, CardTitle, CardContent } from "../Components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart3, MapPin, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
// import { Alert, AlertDescription } from "../Components/ui/alert";
// import { Button } from "../Components/ui/button";

const COLORS = {
  food: "#F77F00",
  water: "#1D3557",
  medical: "#E63946",
  shelter: "#06D6A0",
  other: "#9D84B7"
};

export default function NGODashboard() {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      const allRequests = await Request.list("-created_date");
      setRequests(allRequests || []);
    } catch (err) {
      console.error("Failed to load data:", err);
      setUser(null);
      setError("A network error occurred. Please check your connection and try again.");
    }
    setIsLoading(false);
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
            <p className="text-gray-600 mb-6">Please log in to access the NGO dashboard</p>
            <Button onClick={() => User.login()} className="btn-primary">
              Login / Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categoryData = Object.keys(COLORS).map(category => ({
    name: category,
    value: requests.filter(r => r.category === category).length,
    color: COLORS[category]
  }));

  const statusData = [
    { name: "Open", value: requests.filter(r => r.status === "open").length, color: "#E63946" },
    { name: "In Progress", value: requests.filter(r => r.status === "in_progress").length, color: "#F77F00" },
    { name: "Resolved", value: requests.filter(r => r.status === "resolved").length, color: "#06D6A0" }
  ];

  const urgencyData = [
    { name: "High", value: requests.filter(r => r.urgency === "high").length },
    { name: "Medium", value: requests.filter(r => r.urgency === "medium").length },
    { name: "Low", value: requests.filter(r => r.urgency === "low").length }
  ];

  const resolvedPercentage = requests.length > 0 
    ? ((requests.filter(r => r.status === "resolved").length / requests.length) * 100).toFixed(1)
    : 0;

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
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-[#1D3557]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">NGO Analytics Dashboard</h1>
                <p className="text-gray-200">{user.organization || "Organization Dashboard"}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-200 mb-1">Total Requests</p>
                <p className="text-3xl font-bold">{requests.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-200 mb-1">Open Now</p>
                <p className="text-3xl font-bold text-[#E63946]">
                  {requests.filter(r => r.status === "open").length}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-200 mb-1">Resolved</p>
                <p className="text-3xl font-bold text-[#06D6A0]">
                  {requests.filter(r => r.status === "resolved").length}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-200 mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-[#06D6A0]">{resolvedPercentage}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1D3557]">
                  <MapPin className="w-5 h-5" />
                  Requests by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                {requests.length > 0 && !error ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-400">
                    {error ? "Could not load data" : "No data available"}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1D3557]">
                  <BarChart3 className="w-5 h-5" />
                  Status Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {requests.length > 0 && !error ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-400">
                    {error ? "Could not load data" : "No data available"}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1D3557]">
                <AlertCircle className="w-5 h-5" />
                Requests by Urgency Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              {requests.length > 0 && !error ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={urgencyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#1D3557" name="Number of Requests" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  {error ? "Could not load data" : "No data available"}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
