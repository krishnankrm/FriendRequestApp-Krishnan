import {useState,useEffect} from 'react';
import axios from 'axios';
import  configData  from './config.json';
var backendip=configData.backendip

function App()
{
  const [Username,setUsername]=useState('')
  const [Password,setPassword]=useState('')
  const [ConfirmPassword,setConfirmPassword]=useState('')

  const [Alertval,setAlertval]=useState(false)
  
  
  function HandleSubmit()
  {
      setAlertval(false)
      document.getElementsByClassName('ArrowButton')[0].style.display= "block" ;
      document.getElementsByClassName("user-login3223")[0].style.borderBottom='2px solid grey'
      document.getElementsByClassName("password-login")[0].style.borderBottom='2px solid grey'
      document.getElementsByClassName("confirm-password-login")[0].style.borderBottom='2px solid grey'

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
      else if (ConfirmPassword.trim('')=='')
      {
          document.getElementsByClassName("confirm-password-login")[0].style.borderBottom='2px solid #e55757'
          setAlertval('Confirm Password cannot be empty')
      }
      else if (Password!=ConfirmPassword)
      {
          document.getElementsByClassName("password-login")[0].style.borderBottom='2px solid #e55757'
          document.getElementsByClassName("confirm-password-login")[0].style.borderBottom='2px solid #e55757'

          setAlertval('Password does not match')
      }


      else
      {
          var json={
              "username": Username,
              "password":Password
          }
          axios.post(backendip+'/login/Register',json)
          .then((res)=>{ 
          if(res.status==206)
          {                 
              setAlertval('Network Error')
          }
          else if(res.status==205)
          {                 
              setAlertval('User Already Exists')
          }
          else
            {
              setTimeout(() => {
                  window.location.href='/login'
              }, 1000);
              setAlertval('Registration Successful')

  
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
            <div id ='loginLegand' style={{zIndex:2,fontSize:'40px', fontWeight:'600', color:'#583e35', fontFamily:'sans-serif', transform:'translate(35px, 17px)'}}>REGISTER
                    </div>
                    <div id='logincirle'style={{width:'100px',height:'100px', borderRadius:'50%',background:'#cd8551',transform:'translateX(-35px)'}}>
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
<input className='form-control ' type='password' autoComplete='off' placeholder='Password' value={Password} onChange={(e)=>{setPassword(e.target.value)}} style={{    border:"0px",background:'transparent'}}/> 

</div>  
<div className='flex-row mt-4 confirm-password-login' style={{alignItems:'center'}}>
            <i className='fas fa-key loginicon' style={{color:'rgb(88, 62, 53)'}} ></i>
<input className='form-control ' type='password' autoComplete='off' placeholder='Confirm Password' value={ConfirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} style={{    border:"0px",background:'transparent'}}/> 

</div>  
             <div className='mt-4 flex-row ' style={{justifyContent:'center'}}>
               <button className='btn btn-primary LoginBtnAnimate flex-row' onClick={()=>{HandleSubmit()}} style={{width:'130px',backgroundColor:'#d3b68b', border:0,margin:'0px',padding:0,}}> 
                <div className='ArrowButton btn' style={{backgroundColor:'#cd8551',border:0,color:'#583e35'}}><i class="fas fa-arrow-right fa-lg"></i></div>
                
                <div className='animatetextLEgand' >SUBMIT</div>
               </button>  
               </div>
           <div className='mt-3' ></div>

             </div>
        </div>
        </div>)}

export default App