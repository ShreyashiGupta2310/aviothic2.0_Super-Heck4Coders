import React from "react";
import { card, CardContent } from "../Components/ui/card";
import { Shield, Heart, Globe, Zap, Users, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#E63946] to-[#D62839] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-[#1D3557] mb-4">About Disaster Relief Connect</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bridging the gap between those in need and those ready to help during disasters
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <card className="shadow-xl border-none bg-gradient-to-br from-[#1D3557] to-[#2A4A73] text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                In times of disaster, every second counts. Disaster Relief Connect was created to instantly connect people in crisis with volunteers and organizations ready to help. Our platform leverages cutting-edge technology including AI-powered categorization and real-time mapping to ensure help reaches those who need it most, as quickly as possible.
              </p>
            </CardContent>
          </card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 text-[#E63946] mb-4" />
                <h3 className="text-2xl font-bold text-[#1D3557] mb-3">For Those in Need</h3>
                <p className="text-gray-600 leading-relaxed">
                  Post your urgent needs with a simple form. Our AI automatically categorizes your request and determines urgency, getting your message to the right people instantly.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-[#06D6A0] mb-4" />
                <h3 className="text-2xl font-bold text-[#1D3557] mb-3">For Volunteers</h3>
                <p className="text-gray-600 leading-relaxed">
                  See real-time requests on an interactive map. Accept requests near you and coordinate directly with those who need help most.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <Target className="w-12 h-12 text-[#F77F00] mb-4" />
                <h3 className="text-2xl font-bold text-[#1D3557] mb-3">For NGOs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access comprehensive analytics and bulk request management tools to coordinate large-scale relief efforts efficiently.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-[#1D3557] mb-4" />
                <h3 className="text-2xl font-bold text-[#1D3557] mb-3">Global Reach</h3>
                <p className="text-gray-600 leading-relaxed">
                  Multi-language support with automatic translation ensures help can be requested and provided across language barriers.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="shadow-xl border-none">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-[#E63946]" />
                <h2 className="text-3xl font-bold text-[#1D3557]">How We're Different</h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-2 bg-[#E63946] rounded-full flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1D3557] mb-1">Real-Time Updates</h4>
                    <p className="text-gray-600">Requests appear on the map instantly, ensuring the fastest possible response times.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 bg-[#1D3557] rounded-full flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1D3557] mb-1">AI-Powered Intelligence</h4>
                    <p className="text-gray-600">Automatic categorization and urgency detection helps prioritize the most critical needs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 bg-[#06D6A0] rounded-full flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1D3557] mb-1">Simple and Fast</h4>
                    <p className="text-gray-600">One-click location detection and streamlined forms mean help can be requested in seconds.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 bg-[#F77F00] rounded-full flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1D3557] mb-1">Coordinated Response</h4>
                    <p className="text-gray-600">Prevents duplicate efforts by showing which requests are already being handled.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Card className="shadow-xl border-none bg-gradient-to-r from-[#E63946] to-[#D62839]">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Join the Movement</h2>
              <p className="text-xl text-white/90 mb-6">
                Together, we can make disaster relief faster, more efficient, and more compassionate
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
                  <p className="text-3xl font-bold">10,000+</p>
                  <p className="text-sm">Requests Processed</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
                  <p className="text-3xl font-bold">5,000+</p>
                  <p className="text-sm">Active Volunteers</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
                  <p className="text-3xl font-bold">95%</p>
                  <p className="text-sm">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}




