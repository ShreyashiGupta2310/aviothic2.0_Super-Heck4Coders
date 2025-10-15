import React from "react";
//import { dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
//import { button } from "Component/ui/Button";
//import { badge } from "../ui/Badge";
import { MapPin, Clock, User as UserIcon, Phone, Heart, CheckCircle, Loader2 } from "lucide-react";
import Request from "../../Entities/Request.json";

import { User } from "../../Entities/User";

const urgencyColors =
{
  high: "#E63946",
  medium: "#F77F00",
  low: "#06D6A0"
};

const categoryIcons = 
{
  food: "🍽️",
  water: "💧",
  medical: "🏥",
  shelter: "🏠",
  other: "❓"
};

export default function RequestDetailModal({ request, onClose, onUpdate }) {
  const [user, setUser] = React.useState(null);
  const [isAccepting, setIsAccepting] = React.useState(false);
  const [isResolving, setIsResolving] = React.useState(false);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    }
  };

  const handleAccept = async () => {
    if (!user) {
      await User.login();
      return;
    }

    setIsAccepting(true);
    try {
      await Request.update(request.id, {
        status: "in_progress",
        assigned_volunteer: user.email
      });
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Failed to accept request:", err);
    }
    setIsAccepting(false);
  };

  const handleResolve = async () => {
    setIsResolving(true);
    try {
      await Request.update(request.id, {
        status: "resolved"
      });
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Failed to resolve request:", err);
    }
    setIsResolving(false);
  };

  if (!request) return null;

  const canAccept = user && request.status === "open";
  const canResolve = user && request.assigned_volunteer === user.email && request.status === "in_progress";

  return (
    <Dialog open={!!request} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-4xl">{categoryIcons[request.category]}</span>
            {request.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Urgency */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline"
              className={`${
                request.status === "open" ? "bg-red-100 text-red-800 border-red-200" :
                request.status === "in_progress" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                "bg-green-100 text-green-800 border-green-200"
              }`}
            >
              {request.status.replace('_', ' ').toUpperCase()}
            </Badge>
            <Badge 
              variant="outline"
              style={{ 
                backgroundColor: `${urgencyColors[request.urgency]}20`,
                color: urgencyColors[request.urgency],
                borderColor: urgencyColors[request.urgency]
              }}
            >
              {request.urgency.toUpperCase()} PRIORITY
            </Badge>
            <Badge variant="outline">
              {request.category.toUpperCase()}
            </Badge>
          </div>

          {/* Photo */}
          {request.photo_url && (
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={request.photo_url} 
                alt="Request photo" 
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg text-[#1D3557] mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{request.description}</p>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-[#E63946] mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-[#1D3557] mb-1">Location</h4>
              <p className="text-sm text-gray-600">{request.location_name}</p>
            </div>
          </div>

          {/* Contact Information */}
          {request.requester_contact && (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-[#1D3557] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-[#1D3557] mb-1">Contact</h4>
                <p className="text-sm text-gray-600">{request.requester_contact}</p>
              </div>
            </div>
          )}

          {/* Time Posted */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            Posted {new Date(request.created_date).toLocaleString()}
          </div>

          {/* Assigned Volunteer */}
          {request.assigned_volunteer && (
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <UserIcon className="w-5 h-5 text-[#1D3557] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-[#1D3557] mb-1">Assigned To</h4>
                <p className="text-sm text-gray-600">{request.assigned_volunteer}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {canAccept && (
              <Button
                onClick={handleAccept}
                disabled={isAccepting}
                className="btn-primary flex-1"
              >
                {isAccepting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Accept Request
                  </>
                )}
              </Button>
            )}

            {canResolve && (
              <Button
                onClick={handleResolve}
                disabled={isResolving}
                className="bg-[#06D6A0] hover:bg-[#05BF8E] text-white flex-1"
              >
                {isResolving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Resolving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Mark as Resolved
                  </>
                )}
              </Button>
            )}

            {!user && request.status === "open" && (
              <Button
                onClick={() => User.login()}
                className="btn-secondary flex-1"
              >
                Login to Accept
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
