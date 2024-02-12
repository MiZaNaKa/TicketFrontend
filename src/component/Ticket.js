import React,{useState,useRef} from 'react';
import Axios from "../api/customAxios";
import {useNavigate} from "react-router-dom" 
import SimpleReactValidator from 'simple-react-validator';
import Header from './Header';


function Ticket() {
    const [data, setData] = useState({ "name":"","description":"","price":"","ticketNo":"",});
    const navigate = useNavigate()     
    const [error, setError] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();


    const nameOnChange=(event)=>{
        setData(state => ({ ...state, name:  event.target.value }));
    }

    const priceOnChange=(event)=>{
        setData(state => ({ ...state, price:  event.target.value }));
    }

    const ticketNoOnChange=(event)=>{
        setData(state => ({ ...state, ticketNo:  event.target.value }));
    }

    

    const descriptionOnChange=(event)=>{
        setData(state => ({ ...state, description:  event.target.value }));
    }

    
    const Action=async(event)=>{
        event.preventDefault();
        const formValid = simpleValidator.current.allValid()
        
        if (!formValid) {
            simpleValidator.current.showMessages()
            forceUpdate(1)
        }
        else{
            try{
                var result = await Axios.post(`ticket/create`,data)
                if(result.data.status===1){
                    navigate("/TicketList")
                }
            }
            catch(e){
                
            }
            
            
            
        }
    }
    return (<div className="App">
                <Header/>
               <div className="width50">
                <form onSubmit={Action}>
                    <input type="text"  onChange={nameOnChange}  placeholder="name" value={data.name}/>
                    <p className='error'>{simpleValidator.current.message('name', data.name, 'required')}</p>

                    <input type="number"  onChange={priceOnChange}  placeholder="price" value={data.price}/>
                    <p className='error'>{simpleValidator.current.message('price', data.price, 'required')}</p>

                    <input type="number"  onChange={ticketNoOnChange}  placeholder="ticketNo" value={data.ticketNo}/>
                    <p className='error'>{simpleValidator.current.message('ticketNo', data.ticketNo, 'required')}</p>

                    <textarea maxLength={250} value={data.description} id="w3review" placeholder="description" name="w3review" rows="4" cols="50" onChange={descriptionOnChange}/>
                    <p className='error'>{simpleValidator.current.message('description', data.description, 'required')}</p>
                    <input type="submit" />
                </form>
                {error ? <p>Require field</p>:null}
                </div>
            </div>);
}

export default Ticket