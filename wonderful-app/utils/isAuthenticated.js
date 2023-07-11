import axios from "axios";
import Cookies from "universal-cookie";

const isAuthenticated = async () => {
    const cookies = new Cookies()
    const token = cookies.get("token")
  
    if (token) {
      try {
        const response = await axios.post('http://localhost:5000/api/checkToken', {token},{
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          ,
        
      }});
        console.log(response)
        if (response.status == 200) {
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
  