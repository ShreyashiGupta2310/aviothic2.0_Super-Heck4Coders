// Entities/User.jsx
export class User {
  static async me() {
    // Mock current logged-in user
    return { email: "volunteer@example.com", name: "John Doe" };
  }

  static async login() {
    alert("Mock login triggered. Replace with real login logic.");
    return { email: "volunteer@example.com", name: "John Doe" };
  }
}
