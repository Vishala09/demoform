import React,{useState,useEffect,useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function Form() {
    const [state, setState] = useState("");
    const [name, setName] = useState("");
    const [black, setBlack] = useState(5);
    const [yellow, setYellow] = useState(0);
    const ref = useRef("")
    useEffect(() => {
        console.log('calling');
        axios.get('http://localhost:8080/entry').then((res,err)=>{
            console.log(res,err);
            setState(res.data);
        })
    }, [])
    
    function submitData(e){
        e.preventDefault();
        console.log(yellow);
        const rating = Number(yellow);
        const review = ref.current.value;
        axios.post('http://localhost:8080/postReview',{name,rating,review}).then((res,err)=>{
            console.log(res,err);
            
        })
    }
    function setStars(index){

        setBlack(5-index-1);setYellow(index+1)
    }
    return (
        <div>
                Welcome : {state}
                <form onSubmit={(e)=>submitData(e)}>
                Enter your name  <p></p>   <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <hr></hr>
                Please give your ratings  <p></p>
                    {
                        Array(Number(yellow)).fill().map((_,index)=>
                        <span onClick={()=>{setBlack(5-index);setYellow(index)}}  key={index} style={{color:'yellow'}}>
                            
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
                        </span>
                        )
                        
                    }  
                    {
                        Array(Number(black)).fill().map((_,index)=>
                        <span key={index+yellow} onClick={()=>setStars(index+yellow)} style={{color:'black'}}>                
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
                        </span>
                        )
                        
                    }  
                  <hr></hr>
                  Enter your reviews <p></p>
                <textarea ref={ref}>
                    
                </textarea>
                <hr></hr>
                    <button type="submit" >Submit</button>
                </form>
        </div>
    )
}

export default Form
