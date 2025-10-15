import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { button } from "../Components/ui/button";
import { AlertCircle, Heart, MapPin, Zap, Globe, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen">
      {}
      <section className="relative bg-gradient-to-br from-[#1D3557] via-[#2A4A73] to-[#1D3557] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#E63946] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Sahayak
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Connect Help When
              <br />
              <span className="text-[#06D6A0] boldy">It's Needed Most</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto">
              Post urgent requests. Find volunteers nearby. Save lives in real time during disasters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={createPageUrl("PostRequest")}>
                <button size="lg" className="btn-primary text-lg px-8 py-6 w-full sm:w-auto shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  I Need Help
                </button>
              </Link>
              <Link to={createPageUrl("VolunteerDashboard")}>
                <button size="lg" variant="outline" className="bg-white text-[#1D3557] hover:bg-gray-100 text-lg px-8 py-6 w-full sm:w-auto shadow-xl">
                  <Heart className="w-5 h-5 mr-2" />
                  I Can Help
                </button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#06D6A0]" />
                <span>AI-Powered Categorization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#06D6A0]" />
                <span>Instant Map Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#06D6A0]" />
                <span>Multi-Language Support</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D3557] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to connect help with those who need it most
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#E63946] to-[#D62839] rounded-2xl flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-6xl font-bold text-[#E63946] mb-4">01</div>
              <h3 className="text-2xl font-bold text-[#1D3557] mb-3">Post Your Need</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick form with automatic location detection. Our AI categorizes your request and sets urgency levels instantly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#1D3557] to-[#152847] rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="text-6xl font-bold text-[#1D3557] mb-4">02</div>
              <h3 className="text-2xl font-bold text-[#1D3557] mb-3">Volunteers See It</h3>
              <p className="text-gray-600 leading-relaxed">
                Your request appears on the map instantly. Nearby volunteers and NGOs receive real-time notifications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#06D6A0] to-[#05BF8E] rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-6xl font-bold text-[#06D6A0] mb-4">03</div>
              <h3 className="text-2xl font-bold text-[#1D3557] mb-3">Help Arrives</h3>
              <p className="text-gray-600 leading-relaxed">
                Volunteers accept your request, coordinate with you, and mark it resolved once help has been delivered.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-gradient-to-br from-[#1D3557] to-[#2A4A73] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#E63946] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              AI-Powered Platform
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Smart Technology for Faster Relief
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Artificial intelligence working behind the scenes to save time when every second counts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20"
            >
              <Shield className="w-12 h-12 text-[#06D6A0] mb-4" />
              <h3 className="text-2xl font-bold mb-3">Auto-Categorization</h3>
              <p className="text-gray-200 leading-relaxed">
                Our AI instantly classifies requests as Food, Water, Medical, Shelter, or Other - and determines urgency levels automatically.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20"
            >
              <Globe className="w-12 h-12 text-[#06D6A0] mb-4" />
              <h3 className="text-2xl font-bold mb-3">Instant Translation</h3>
              <p className="text-gray-200 leading-relaxed">
                Post requests in any language - they're automatically translated so volunteers worldwide can understand and help.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D3557] mb-6">
              Every Second Counts
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join thousands of volunteers and organizations making a real difference during disasters. Your help can save lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Map")}>
                <button size="lg" className="btn-secondary text-lg px-8 py-6 w-full sm:w-auto shadow-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  View Active Requests
                </button>
              </Link>
              <Link to={createPageUrl("About")}>
                <button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}