import React, { useState,useEffect } from 'react';
import Header from './Header';
import Axios from "../api/customAxios";
import {useNavigate} from "react-router-dom" 
import NoData from "../img/not-found.png"


const TicketList = () => {
    const [data, setData] = React.useState(false)
    const [userInfo, setUserInfo] = React.useState("")
    const navigate = useNavigate()    
    const options = [
        {value: '', text: '--Choose an option--'},
        {value: '1', text: 'waitingSupervisorApprove'},
        {value: '2', text: 'waitingLeaderApprove'},
        {value: '3', text: 'reject'},
        {value: '4', text: 'Approve'},
    ];

    var store1=localStorage.getItem('UserInfo')
    var store=JSON.parse(store1)

    var pick=""
    if(store.roleId==='1'){
        pick='3'
    }
    else if(store.roleId==='2'){
        pick='1'
    }
    else if(store.roleId==='3'){
        pick='2'
    }

    const [selected, setSelected] = useState(pick);

    const handleChange = async(event) => {
        console.log(event.target.value);
        setSelected(event.target.value);
        try{
            var result = await Axios.get(`ticket/getTicketByStatus/`+event.target.value)
            if(result.data.status===1){
                var total=result.data.success.data.success.data
                setData(total)
            }
            
        }   
        catch(e){
            console.log(e)
            console.log(e)
        }
    };

    useEffect(() => {
        async function fetchMyAPI() {
            var userInfo=localStorage.getItem('UserInfo')
            var store=JSON.parse(userInfo)  
            console.log(store)
            setUserInfo(store)  
            try{
                var result = await Axios.get(`ticket/getTicket`)
                if(result.data.status===1){
                    var total=result.data.success.data.success.data
                    setData(total)
                }
                
            }   
            catch(e){
                
            }   
        }

        fetchMyAPI()
    }, [])

    useEffect(() => {
        console.log(`The count is`);
        console.log(`The count is`);
    },[]);

    const goEdit = (e,id) => {
        navigate(`/EditTicket/`+id)
    };

    const goDetail = (e,id) => {
        navigate(`/DetailTicket/`+id)
    };

    

    return (
        <div className="App">
            <Header/>
            <div style={{width:'90%',margin:'0 auto',marginTop:60}}>
                <div className='clearfix'>
                    <select style={{padding:8}} value={selected} onChange={handleChange}>
                        {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                        ))}
                    </select>
                </div>
                {data.length>0 ?
                    <div>
                        


                        <div className='ticketTable clearfix'>
                            <div className='column2'>
                                <p>Name</p>
                            </div>

                            <div className='column2'>
                                <p>Price</p>
                            </div>

                            <div className='column2'>
                                <p>Description</p>
                            </div>

                            <div className='column2'>
                                <p>Status</p>
                            </div>

                            <div className='column2'>
                                <p>Action</p>
                            </div>
                        </div>

                        {data.map((x,index)=>{
                            return <div key={index}>
                                <div className='row'>
                                    <div className='column2'>
                                        <p>{x.name}</p>
                                    </div>

                                    <div className='column2'>
                                        <p>{x.price}</p>
                                    </div>

                                    <div className='column2'>
                                       {x.description.length>20 ?
                                            <p>{x.description.slice(0, 20)}  ......</p>
                                            :
                                            <p>{x.description}</p>
                                        }
                                    </div>

                                    <div className='column2'>
                                        <p>
                                            {x.status===1 ? "Waiting Supervisor Approve" : null}
                                            {x.status===2 ? "Waiting Leader Approve" : null}
                                            {x.status===3 ? "Reject" : null}
                                            {x.status===4 ? "Approve" : null}
                                        </p>
                                    </div>

                                    <div className='column2'>
                                        {userInfo.roleId==='1' &&  x.status===3 ? <p style={{padding:6,backgroundColor:'#000',color:'#fff'}} onClick={(e)=>goEdit(e,x._id)} className='cursor'>Edit</p> : <p></p> }

                                        {userInfo.roleId==='2' &&  x.status===1 ? <p style={{padding:6,backgroundColor:'#000',color:'#fff'}} onClick={(e)=>goDetail(e,x._id)} className='cursor'>Detail</p> : <p></p> }

                                        {userInfo.roleId==='3' &&  x.status===2 ? <p style={{padding:6,backgroundColor:'#000',color:'#fff'}} onClick={(e)=>goDetail(e,x._id)} className='cursor'>Detail</p> : <p></p> }
                                       
                                       <p>.</p>
                                        
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    :
                    <div style={{marginTop:100}}>
                        <img src={NoData} style={{width:130,height:130}}/>
                    </div>
                }
            </div>
            
        </div>
    );
};
export default TicketList;