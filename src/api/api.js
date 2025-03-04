const API_URL = "http://localhost:3001/api/v1/user"; // Base API URL

/**
 * Universal function to make API requests.
 * @param {string} endpoint - API path ("login", "signup", "profile").
 * @param {string} method - HTTP method (POST, PUT).
 * @param {Object|null} data - Data to send in the request body (null if not needed).
 * @param {string|null} token - User authentication token (null if not needed).
 * @returns {Promise<Object>} - JSON response from the server.
 */
export const fetchData = async (endpoint, method, data = null, token = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Add token if provided
    },
    ...(data && { body: JSON.stringify(data) }), // Add request body if data is provided
  };

  const response = await fetch(`${API_URL}/${endpoint}`, options);
  
  // Check if the response is OK, otherwise throw an error
  return response.ok ? response.json() : Promise.reject(new Error(response.statusText));
};

// Login function
export const loginUser = (email, password) =>
  fetchData("login", "POST", { email, password });

// Signup function
export const signupUser = (email, password, firstName, lastName) =>
  fetchData("signup", "POST", { email, password, firstName, lastName });

// Get user profile
export const getUserProfile = (token) =>
  fetchData("profile", "POST", null, token);

// Update user profile
export const updateUserProfile = (token, firstName, lastName) =>
  fetchData("profile", "PUT", { firstName, lastName }, token);

