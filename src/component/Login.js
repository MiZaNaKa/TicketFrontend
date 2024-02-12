import { useState,useEffect } from "react";
import apiCalling from "../api/apiCalling";
import {useNavigate} from "react-router-dom" 
import Header from './Header';
function Login() {
    const navigate = useNavigate() 
    const [userInfo, setUserInfo] = useState({email:"",password:""});
    const [error, setError] = useState(false);

    useEffect(() => {
        var userInfo=localStorage.getItem('UserInfo')
        if(userInfo){
            navigate("/")
        }
        
    }, [])


    const nameOnChange=(event)=>{
        setUserInfo(state => ({ ...state, email:  event.target.value }));
    }

    const passwordOnChange=(event)=>{
        setUserInfo(state => ({ ...state, password:  event.target.value }));
    }

    
    const loginAPI=async(event)=>{
        event.preventDefault();
        if(userInfo.email && userInfo.password){
            setError(false)
            try{
                var result=await apiCalling.login(userInfo)
                if(result.data.status===1){
                    localStorage.setItem('UserInfo',JSON.stringify(result.data.body));
                    navigate("/")
                }
                else{
                    setError(result.data.message)
                }
            }
            catch(e){
                setError(e.message)
            }
            
        }else{
            setError(true)
        }
        
    }

    

    return (<div className="App">
                <Header/>
               <div className="width50">
                <form onSubmit={loginAPI}>
                    <input type="email"  onChange={nameOnChange}  placeholder="email"/>
                    <input type="password"  onChange={passwordOnChange}  placeholder="password"/>
                    <input type="submit" />
                </form>
                {error ? <p className="error">{error}</p>:null}
                </div>
                <p className="loginInfoBox">
                    <h1>Staff</h1>
                    <h3>Email : staff@gmail.com</h3>
                    <h3>Password : staff123</h3>
                </p>

                <p className="loginInfoBox">
                    <h1>Supervisor</h1>
                    <h3>Email : supervisor@gmail.com</h3>
                    <h3>Password : supervisor123</h3>
                </p>


                <p className="loginInfoBox">
                    <h1>Leader</h1>
                    <h3>Email : leader@gmail.com</h3>
                    <h3>Password : leader123</h3>
                </p>

                
            </div>);
}

export default Login