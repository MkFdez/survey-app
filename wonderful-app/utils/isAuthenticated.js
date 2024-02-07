import Cookies from "universal-cookie";
import API_URL from "../config/backend";
const isAuthenticated = async () => {
    const cookies = new Cookies()
    const token = cookies.get("token")
  
    if (token) {
      try {
        const response = await fetch(`${API_URL}/api/checkToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
  
        if (response.ok) {
          return true; // Token is valid
        } else {
          return false; // Token is invalid or expired
        }
      } catch (error) {
        console.error('Error checking token:', error);
        return false; // Error occurred while checking token
      }
    }
  
    return false; // No token found
  };
  
  export default isAuthenticated;
  