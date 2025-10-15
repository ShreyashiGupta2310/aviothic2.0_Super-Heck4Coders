// src/utils.js
export function createPageUrl(page) {
  switch (page) {
    case "PostRequest": return "/post-request";
    case "VolunteerDashboard": return "/volunteer-dashboard";
    case "Map": return "/map";
    case "About": return "/about";
    case "NGODashboard": return "/ngo-dashboard";
    default: return "/";
  }
}
