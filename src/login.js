import './login.css'
import './Animate.css'
import './scrollbar-webkit.css'
import './blinking.css'
import './General.css'

import {useState,useEffect} from 'react';
import axios from 'axios';
import  configData  from './config.json';
var backendip=configData.backendip
var colorOfSeeIcon='grey'
function App()
{
  const [Username,setUsername]=useState('')
  const [Password,setPassword]=useState('')
  const [inputtypebool,setinputtypebool]=useState(true)
  const [Alertval,setAlertval]=useState(false)
  const [CheckBoxBool,setCheckBoxBool]=useState(false)

  useEffect(()=>{
var str = document.cookie.split('; ');
    const result = {};
for (let i in str) {
    const cur = str[i].split('=');
    result[cur[0]] = cur[1];
}



if(result.Username!=undefined) {
    setUsername(result.Username)
    setPassword(result.Password)
}
  },[])


    function HandleSubmit()
    {
        setAlertval(false)
        document.getElementsByClassName('ArrowButton')[0].style.display= "block" ;
        document.getElementsByClassName("user-login3223")[0].style.borderBottom='2px solid grey'
        document.getElementsByClassName("password-login")[0].style.borderBottom='2px solid grey'
        if (Username.trim('')=='')
        {
            setAlertval('Username cannot be empty')
            document.getElementsByClassName("user-login3223")[0].style.borderBottom='2px solid #e55757'
        }
        else if (Password.trim('')=='')
        {
            document.getElementsByClassName("password-login")[0].style.borderBottom='2px solid #e55757'
            setAlertval('Password cannot be empty')
        }

        else
        {
            var json={
                "username": Username,
                "password":Password
            }
            axios.post(backendip+'/login',json)
            .then((res)=>{ 
            if(res.status==206)
            {    
                sessionStorage.setItem("Login", "False");
                setAlertval('Invalid credentials')
            }
            else
              {
                setTimeout(() => {
                    window.location.href='/dashboard'
                }, 1000);
                sessionStorage.setItem("Login", Username);

                
                if(CheckBoxBool!=false)
                {document.cookie = "Username="+Username;
                document.cookie = "Password="+Password;
                    }

                document.getElementsByClassName('animatetextLEgand')[0].style.display= "none" ;
                document.getElementsByClassName('ArrowButton')[0].style.animation= "shake22 1.2s" ;
                }
            
            })
            
        }
    }
    return(
    <div className='Loginmain_div' onKeyPress={(e)=>{  if (e.key === "Enter") {document.getElementsByClassName('LoginBtnAnimate')[0].click()}    }}>
        <div className='flex-row' style={{height:'95vh', justifyContent:'center', alignItems:'center'}} >
        <div className='card' id='logincard' style={{width:'350px', padding:'20px',backgroundColor:'#FDEBD0', opacity:'0.9'}}>
        <div className='mt-4 flex-row' >
            <div id ='loginLegand' style={{position:'relative', fontSize:'40px', fontWeight:'600', color:'#583e35', fontFamily:'sans-serif', transform:'translate(75px, 17px)'}}>LOGIN
                    </div>
                    <div id='logincirle'style={{width:'100px',height:'100px', borderRadius:'50%',background:'#cd8551'}}>
                    </div>
            </div>
            <div className='mt-1' style={{color:'red',textAlign:'center',height:"10px"}}>       
                {Alertval!=false?Alertval:<div>{''}</div>}                  
            </div>  
           <div className='flex-row mt-4 user-login3223' style={{alignItems:'center',}}>
            <i className='fas fa-user loginicon'  style={{color:'rgb(88, 62, 53)'}} ></i>
            <input className='form-control user-logininput' autoComplete='off' autoFocus type='text' value={Username} placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}} style={{    background:'transparent'}}/> 

           </div>  
           <div className='flex-row mt-4 password-login' style={{alignItems:'center'}}>
            <i className='fas fa-key loginicon' style={{color:'rgb(88, 62, 53)'}} ></i>
<input className='form-control ' type={inputtypebool?'password':'text'} autoComplete='off' placeholder='Password' value={Password} onChange={(e)=>{setPassword(e.target.value)}} style={{    border:"0px",background:'transparent'}}/> 
{Password!='' ?<i className='fas fa-eye fa-sm' style={{color:colorOfSeeIcon,transform:'translate(-5px,5px)',cursor:'pointer'}} onClick={()=>{setinputtypebool(!inputtypebool);if (colorOfSeeIcon=='grey') colorOfSeeIcon='maroon' 
else colorOfSeeIcon='grey';}}></i>:''}
</div>  
<div className='mt-3'  >
    <input type="checkbox" value={CheckBoxBool} onClick={()=>{setCheckBoxBool(!CheckBoxBool)}} style={{marginRight:'5px',transform:'translateY(1px)'}}/>Remember Me</div> 

             <div className='mt-4 flex-row ' style={{justifyContent:'center'}}>
               <button className='btn btn-primary LoginBtnAnimate flex-row' onClick={()=>{HandleSubmit()}} style={{width:'115px',backgroundColor:'#d3b68b', border:0,margin:'0px',padding:0,}}> 
                <div className='ArrowButton btn' style={{backgroundColor:'#cd8551',border:0,color:'#583e35'}}><i class="fas fa-arrow-right fa-lg"></i></div>
                
                <div className='animatetextLEgand' >LOGIN</div>
               </button>  
               </div>
           <a className='mt-3' style={{textAlign:'center', cursor:'pointer', color:'#583e35'}} onClick={()=>{  window.location.href='/NewUser'}}>Register New User</a> 

             </div>
        </div>
        </div>)}

export default App