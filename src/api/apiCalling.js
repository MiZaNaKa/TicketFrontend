
import axios from 'axios';
const baseUrl = 'http://localhost:8000';



class apiCalling {
  
  login = async (value) => {
    
    const awaitResponse = await axios.post(
      baseUrl+`/users/login`,
      value,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
     
    );

    return awaitResponse
  };

  

  
}

export default new apiCalling()