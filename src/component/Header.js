import React, { useState,useEffect } from 'react';
import Axios from "../api/customAxios";
import {useNavigate} from "react-router-dom" 
// import component 👇
import Drawer from 'react-modern-drawer'

import Menu from "../img/menu.png"

import Bell from "../img/bell.png"

import Logo from "../img/logo.webp"

import User from "../img/user.png"

import { Link } from "react-router-dom";

import Close from "../img/close.png"



//import styles 👇
import 'react-modern-drawer/dist/index.css'

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [userInfo, setUserInfo] = React.useState("")
    const navigate = useNavigate()     
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    useEffect(() => {
        async function fetchMyAPI() {
            var userInfo=localStorage.getItem('UserInfo')
            if(userInfo){
                var store=JSON.parse(userInfo)   
                setUserInfo(store)         
                try{
                    var result = await Axios.get(`ticket/getTicket`)
                    if(result.data.status===1){
                        var count=result.data.success.data.success.data.length
                        if(count>0){
                            setCount(count)
                        }
                    }
                }
                catch(e){
                    console.log(e)
                    console.log(e)
                }
                
            }            
        }
    
        fetchMyAPI()
    }, [])

    const LogOut=()=>{
        localStorage.removeItem('UserInfo');
        window.location.reload(false);
    }

    const goRoute=(value)=>{
        navigate("/"+value)
    }


    

    

    return (
        <div className='headerBox clearfix'>
            <div className='row'>
                <div className='col1'>
                    <Link to="/">
                        <img src={Logo} className='logo'/>
                    </Link>
                </div>

                <div className='col2'>
                    
                    {count>0 ?
                        <p className='count'>{count}</p>
                        :
                        null
                    }
                    <img className='cursor' onClick={()=>goRoute("TicketList")} src={Bell} style={{width:30,height:30}}/>
                    
                </div>

                

                <div className='col3'>
                    <img onClick={toggleDrawer} src={Menu} className='toggleIcon'/>
                </div>

                <div className='col3'>
                    {userInfo ?
                        <img src={User} style={{width:30,height:30}}/>
                        :
                        <img className='cursor' onClick={()=>goRoute("Login")} src={User} style={{width:30,height:30}}/>
                    }
                    
                    <p style={{padding:0,margin:0}}>{userInfo.name}</p>
                </div>
            </div>

            {/* <button onClick={toggleDrawer}>Show</button> */}
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                // className='bla bla bla'
            >
                <div className='drawer'>
                    <img src={Close} onClick={toggleDrawer} className='closeDrawerIcon'/>
                    {userInfo ?
                        <div>
                            <div>
                                <p onClick={()=>goRoute("Ticket")} className='cursor'>Create Ticket</p>
                            </div>

                            <div>
                                <p onClick={()=>goRoute("TicketList")} className='cursor'>Ticket List</p>
                            </div>

                            <div>
                                <p onClick={LogOut} className='cursor'>Log Out</p>
                            </div>
                        </div>
                        :
                        <div>
                            <div>
                                <p onClick={()=>goRoute("Login")} className='cursor'>Login</p>
                            </div>
                            
                        </div>
                    }
                    
                    
                    
                </div>
                
            </Drawer>
        </div>
    )
}

export default Header