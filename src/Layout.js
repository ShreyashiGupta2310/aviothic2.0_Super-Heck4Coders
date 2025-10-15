import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { Shield, MapPin, Heart, BarChart3, Info, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await User.logout();
    window.location.href = createPageUrl("Home");
  };

  const isActive = (pageName) => {
    return location.pathname === createPageUrl(pageName);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{
      '--primary-red': '#E63946',
      '--secondary-blue': '#1D3557',
      '--success-green': '#06D6A0',
      '--warning-orange': '#F77F00',
    }}>
      <style>{`
        .btn-primary {
          background-color: var(--primary-red);
          color: white;
        }
        .btn-primary:hover {
          background-color: #D62839;
        }
        .btn-secondary {
          background-color: var(--secondary-blue);
          color: white;
        }
        .btn-secondary:hover {
          background-color: #152847;
        }
        .text-primary {
          color: var(--primary-red);
        }
        .text-secondary {
          color: var(--secondary-blue);
        }
        .bg-primary {
          background-color: var(--primary-red);
        }
        .bg-secondary {
          background-color: var(--secondary-blue);
        }
      `}</style>

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E63946] to-[#D62839] rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-[#1D3557]">Disaster Relief Connect</div>
                <div className="text-xs text-gray-500">Help When It's Needed Most</div>
              </div>
            </Link>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                <Link to={createPageUrl("Home")}>
                  <Button 
                    variant={isActive("Home") ? "default" : "ghost"} 
                    className={isActive("Home") ? "btn-secondary" : ""}
                  >
                    Home
                  </Button>
                </Link>
                <Link to={createPageUrl("Map")}>
                  <Button 
                    variant={isActive("Map") ? "default" : "ghost"}
                    className={isActive("Map") ? "btn-secondary" : ""}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Map
                  </Button>
                </Link>
                <Link to={createPageUrl("VolunteerDashboard")}>
                  <Button 
                    variant={isActive("VolunteerDashboard") ? "default" : "ghost"}
                    className={isActive("VolunteerDashboard") ? "btn-secondary" : ""}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Volunteer
                  </Button>
                </Link>
                {user?.user_type === 'ngo' && (
                  <Link to={createPageUrl("NGODashboard")}>
                    <Button 
                      variant={isActive("NGODashboard") ? "default" : "ghost"}
                      className={isActive("NGODashboard") ? "btn-secondary" : ""}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      NGO
                    </Button>
                  </Link>
                )}
                <Link to={createPageUrl("About")}>
                  <Button variant="ghost">
                    <Info className="w-4 h-4 mr-2" />
                    About
                  </Button>
                </Link>
              </div>

              {!isLoading && (
                <div className="flex items-center gap-3">
                  {!user ? (
                    <Button 
                      onClick={() => User.login()}
                      className="btn-secondary"
                    >
                      Login / Sign Up
                    </Button>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#1D3557] rounded-full flex items-center justify-center">
                            <UserIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="hidden sm:inline">{user.full_name}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <div className="px-3 py-2">
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400 mt-1 capitalize">{user.user_type || 'User'}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        {children}
      </main>

      <footer className="bg-[#1D3557] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#E63946]" />
                </div>
                <div className="text-xl font-bold">Disaster Relief Connect</div>
              </div>
              <p className="text-gray-300 text-sm max-w-md">
                Connecting communities in crisis with volunteers and organizations ready to help. 
                Every second counts in disaster relief.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to={createPageUrl("Home")} className="hover:text-white">Home</Link></li>
                <li><Link to={createPageUrl("Map")} className="hover:text-white">View Map</Link></li>
                <li><Link to={createPageUrl("PostRequest")} className="hover:text-white">Post Request</Link></li>
                <li><Link to={createPageUrl("VolunteerDashboard")} className="hover:text-white">Volunteer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Emergency: 911</li>
                <li>Support: help@reliefconnect.org</li>
                <li>Report Issues</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Disaster Relief Connect. Built with compassion. Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}