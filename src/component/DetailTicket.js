import React, { useState,useEffect } from 'react';
import Header from './Header';
import Axios from "../api/customAxios";
import { useParams,useNavigate } from 'react-router-dom';

function DetailTicket() {
    const [data, setData] = React.useState(false)
    const [userInfo, setUserInfo] = React.useState(false)
    const params = useParams();  
    const navigate = useNavigate()    
    useEffect(() => {

        async function fetchMyAPI() {
            var userInfo=localStorage.getItem('UserInfo')
            var store=JSON.parse(userInfo)  
            console.log(store)  
            setUserInfo(store)   
            try{
                var result = await Axios.get(`ticket/getTicketDetail/`+params.id)
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

    const needInformationAPI=async()=>{
        try{
            var result = await Axios.get(`ticket/needInformation/`+params.id)
            if(result.data.status===1){
                navigate(`/TicketList`)
            }
        }
        catch(e){

        }
        
        
    }

    const sentToLeader=async()=>{
        try{
            var result = await Axios.get(`ticket/sentToLeader/`+params.id)
        
            if(result.data.status===1){
                navigate(`/TicketList`)
            }
        }
        catch(e){
            
        }
        
    }

    const Approve=async()=>{
        try{
            var result = await Axios.get(`ticket/approveTicket/`+params.id)
        
            if(result.data.status===1){
                navigate(`/TicketList`)
            }
        }
        catch(e){
            
        }
        
    }

    

    return (
        <div className="App">
            <Header/>
            <div style={{marginTop:60}}>
                <div className="DetailBOx">
                    <div className='row clearfix' style={{marginBottom:20}}>
                        <div className='col30L'>
                            <label>Name</label>
                        </div>

                        <div className='col70R'>
                            <label>{data.name}</label>
                        </div>
                    </div>

                    <div className='row clearfix' style={{marginBottom:20}}>
                        <div className='col30L'>
                            <label>Price</label>
                        </div>

                        <div className='col70R'>
                            <label>{data.price}</label>
                        </div>
                    </div>

                    <div className='row clearfix' style={{marginBottom:20}}>
                        <div className='col30L'>
                            <label>Ticket No</label>
                            
                        </div>

                        <div className='col70R'>
                            <label>{data.ticketNo}</label>
                        </div>
                    </div>

                    <div className='row clearfix' style={{marginBottom:20}}>
                        <div className='col30L'>
                            <label>Description</label>
                        </div>

                        <div className='col70R'>
                            <textarea value={data.description} readonly className='detailTicketArea'/>
                        </div>
                    </div>

                    <div className='row clearfix' style={{marginBottom:20}}>
                        <div className='col30L'>
                            <label>Status</label>
                        </div>

                        <div className='col70R'>
                            <label>
                                {data.status===1 ? "Waiting Supervisor Approve" : null}
                                {data.status===2 ? "Waiting Leader Approve" : null}
                                {data.status===3 ? "Reject" : null}
                                {data.status===4 ? "Approve" : null}
                            </label>
                        </div>
                    </div>
                    
                    
                </div>

                

                
                
                {userInfo.roleId!=='1' ?
                    <div className='buttonBox row clearfix'>
                        <div className='buttonBoxLeft'>
                            <button className='cursor' onClick={needInformationAPI} type="submit">Need Imformation</button>
                        </div>

                        <div className='buttonBoxRight'>
                            {userInfo.roleId==='2' ?
                                <button className='cursor' onClick={sentToLeader} type="submit">Sent to Leader</button>
                                :
                                null
                            }

                            {userInfo.roleId==='3' ?
                                <button className='cursor' onClick={Approve} type="submit">Ok</button>
                                :
                                null
                            }

                        </div>
                        
                    </div>
                    :
                    null
                }

                
                
            </div>
        </div>
    );
}

export default DetailTicket