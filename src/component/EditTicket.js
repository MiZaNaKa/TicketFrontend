import React,{useState,useRef,useEffect} from 'react';
import Axios from "../api/customAxios";
import SimpleReactValidator from 'simple-react-validator';
import Header from './Header';
import { useParams,useNavigate } from 'react-router-dom';

function EditTicket() {
    const [data, setData] = useState({ "name":"","description":"","price":"","ticketNo":"",});
    const navigate = useNavigate()     
    const [error, setError] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const params = useParams();  

    useEffect(() => {
        async function fetchMyAPI() {
            var userInfo=localStorage.getItem('UserInfo')
            var store=JSON.parse(userInfo)    
            try{
                var result = await Axios.get(`ticket/getTicketDetail/`+params.id)
                if(result.data.status===1){
                    var total=result.data.success.data.success.data
                    setData(total)
                }
            }   
            catch(e){
                console.log(e)
                console.log(e)
            }   
        }

        fetchMyAPI()
    }, [])

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
                var result = await Axios.post(`ticket/edit/`+params.id,data)
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
                    <p>{simpleValidator.current.message('name', data.name, 'required')}</p>

                    <input type="number"  onChange={priceOnChange}  placeholder="price" value={data.price}/>
                    <p>{simpleValidator.current.message('price', data.price, 'required')}</p>

                    <input type="number"  onChange={ticketNoOnChange}  placeholder="ticketNo" value={data.ticketNo}/>
                    <p>{simpleValidator.current.message('ticketNo', data.ticketNo, 'required')}</p>

                    <textarea maxLength={250} value={data.description} id="w3review" placeholder="description" name="w3review" rows="4" cols="50" onChange={descriptionOnChange}/>
                    <p>{simpleValidator.current.message('description', data.description, 'required')}</p>
                    
                    <button type="submit">Save</button>

                </form>
                {error ? <p>Require field</p>:null}
                </div>
            </div>);
}

export default EditTicket