import React, { Component } from "react";
import axios from "axios";
import  configData  from './config.json';
import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
var backendip=configData.backendip

class Header extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
        alertbool: false,
        seachBar: '',
        mutualFrdList: "NA",
        friendslist:[],
        youRequestedList:[],

        requestedListArray:[]
      }
      }
      requestListAxiosfn()

      {
        axios.post(backendip+'/RequestedList',{"user":sessionStorage.getItem('Login')})
        .then((res)=>{
          if(res.status!=208){this.setState({requestedListArray:res.data}) } 
                    else this.setState({requestedListArray:[]})
    })
      }
      componentDidMount()
      {
        this.requestListAxiosfn()
      }
      logoutfn()
      {
        sessionStorage.setItem('Login',false)
        window.location.href='/Login'
      }
      confirmFN(username)
      {
        axios.post(backendip+'/RequestedList/confirm',{"user":sessionStorage.getItem('Login'), "friend":username})
        .then((res)=>{this.requestListAxiosfn();this.friendshipfn();   this.props.onSelectLanguage(true);
          this.YouRequestedList()})

      }
      friendshipfn()
      {
        axios.post(backendip+'/RequestedList/friendship',{"user":sessionStorage.getItem('Login')})
        .then((res)=>{

          if(res.status!=208){this.setState({friendslist:res.data}) } 
                    else this.setState({friendslist:[]})
        })
      }
      YouRequestedList()
      {
        axios.post(backendip+'/RequestedList/YouRequestedList',{"user":sessionStorage.getItem('Login')})
        .then((res)=>{

          if(res.status!=208){this.setState({youRequestedList:res.data}) } 
                    else this.setState({youRequestedList:[]})
        })
      }
      addFriend()
      {
        axios.post(backendip+'/RequestedList/Addfriend',{"user":sessionStorage.getItem('Login'), "frd":this.state.seachBar})
        .then((res)=>{alert('Friend Request sent'); document.getElementById('alertclsbtn45').click()})
      }
    
      deleteFN(username)
      {
        axios.post(backendip+'/RequestedList/delete',{"user":sessionStorage.getItem('Login'), "requested":username})
        .then((res)=>{this.requestListAxiosfn()})
      }
      alertDialog()
      {
    var t=[...this.state.friendslist,...this.state.youRequestedList]
        return(
          <div class="modal fade" id="alertmodel23" tabindex="-1" aria-labelledby="alertmodelLabel" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog " >
      
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="alertmodelLabel" > {
             (this.state.seachBar=='NA')?
            //  <span style={{color:'red'}}>Alert</span>:`Krishnan ${this.state.seachBar}'s Profile`
             <span style={{color:'red'}}>Alert</span>:`${this.state.seachBar}'s Profile`

             }</h5>
              <button id='alertclsbtn45' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
           
            <div class="modal-body">

              {(this.state.seachBar=='NA')?
             <h6>Person with the Username not found</h6>: <div className="flex-col mt-1" style={{alignItems:"center"}} >  <img className="mt-3" src='./1234.jpg' alt="Avatar" style={{width:"125px",  borderRadius: "50%"}}></img>
             <h5 className="mt-3" style={{textAlign:'center'}}>{this.state.seachBar}</h5> 
             {/* <h5 className="mt-3" style={{textAlign:'center'}}>Krishnan {this.state.seachBar}</h5>  */}

             {/* <div><span style={{fontSize:'18px',fontWeight:600}}>Mutual Friends -</span> {this.state.mutualFrdList=='NA'?'NA':this.state.mutualFrdList.map((ele,index)=> {if(index!=this.state.mutualFrdList.length-1) return ('Krishnan '+ele+', ') */}
                          <div><span style={{fontSize:'18px',fontWeight:600}}>Mutual Friends -</span> {this.state.mutualFrdList=='NA'?'NA':this.state.mutualFrdList.map((ele,index)=> {if(index!=this.state.mutualFrdList.length-1) return (ele+', ') 
 
             else return (ele)})}</div>
             {/*              else return ('Krishnan '+ele)})}</div>
 */}
{!t.includes(this.state.seachBar) &&              <button className='btn btn-primary mt-2' onClick={()=>{this.addFriend()}} style={{backgroundColor:'rgb(88, 62, 53)', border:0}}>Add Friend</button>
}

              </div>
             }
                          
                         
    
            </div>
          </div>
        </div>
      </div>)
      }
      mutualFnAxios(ele)
      {
        axios.post(backendip+'/RequestedList/mutual',{"user":sessionStorage.getItem('Login'),"frd":ele})
        .then((res)=>{
          if(res.status==208){this.setState({mutualFrdList:"NA"}) } 
          else if(res.status==201){
            this.setState({seachBar:'NA'})
            this.setState({mutualFrdList:"NA"})
        } 
          else this.setState({mutualFrdList:res.data})
        })
      }
      alertfn()
      {
        if(this.state.requestedListArray.length!=0)
    {    var table=this.state.requestedListArray.Requested.map((ele,index)=>{
          return(<div style={{display:'flex', margin:'10px', paddingBottom:'5px', borderBottom:'1px  dotted grey', alignItems:'center', justifyContent:'space-between'}}>
  <div style={{display:'flex', alignItems:'center'}}><img src='./1234.jpg' alt="Avatar" style={{width:"50px",  borderRadius: "50%"}}></img>     
  <span style={{ fontSize:'18px'}}>{ele}</span>    </div> 
{/*  <span style={{ fontSize:'18px'}}>Krishnan {ele}</span>    </div> 
  */}
  <div style={{display:'flex'}}>
    <button className="btn btn-primary" onClick={()=>{this.confirmFN(ele)}} style={{padding:'2px'}}><i className="fas fa-check"></i></button>
    <button className="btn btn-danger " onClick={()=>{this.deleteFN(ele)}} style={{padding:'5px', marginLeft:'5px'}}><i className=" fas fa-times"></i></button>

  </div></div>)
        })}
        else 
          var table=<h6 style={{padding:'10px'}}>No Pending Friend Requests</h6>
        return(table)

      }


      render()
      {
        return(<div style={{height:'60px', boxShadow:'2px 2px #c7c7c7', backgroundColor:'white', alignItems:"center", display:"flex", justifyContent:'space-between', padding:'10px'}}>
            
            <div style={{alignItems:"center", display:"flex", flexWrap:'wrap'}}>
            <img src='./12.png' alt="Avatar" style={{width:"100px", paddingRight:'20px'}}></img>                   <div style={{fontSize:'24px', fontWeight:600, fontFamily:'sans-sherif', color:'#583e35', paddingLeft:'10px', paddingRight:'20px'}}> WELCOME !!
              </div>
              </div>
              <div>
              <i class="fa fa-search " id='searchbtnheader' style={{color:'#25695c', cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#alertmodel23" onClick={()=>{ this.mutualFnAxios(this.state.seachBar);this.friendshipfn();this.YouRequestedList()}}></i>
        <input type="text"  placeholder='Search For People' onChange={(event)=>{this.setState({seachBar:event.target.value})}}  style={{border:'0px',outline: "none",paddingLeft:'15px',fontSize:'16px',color:''}} 
        
        onKeyPress={(event)=>{  if (event.key === "Enter") {
          event.preventDefault();
document.getElementById('searchbtnheader').click()      }
      }}/>
      {this.alertDialog()}

              </div>

              <div style={{alignItems:"center", display:"flex"}}>
              <div style={{ border:'1px solid #e6edef', cursor:'pointer',height:'59px'}} onClick={()=>this.setState({ alertbool: !this.state.alertbool})} >
          <i class="far fa-bell fa-lg" style={{padding:'20px 15px 15px 15px ', position:'relative'}} ></i>
          <span className="blink" style={{position:'absolute', backgroundColor:'#c7161e',  width:'6px', borderRadius:'50%', height:'6px',    transform: 'translate(-15px,13px)'}}></span>
        
        </div>
              <div style={{ border:'1px solid #e6edef', cursor:'pointer',height:'59px'}} onClick={()=>this.logoutfn()}>           <i class="fas fa-sign-out-alt fa-lg" style={{padding:'20px 10px 15px 15px ',height:'60px', position:'relative'}} ></i>

              </div>
              </div>
              {this.state.alertbool &&
       <div style={{position:'absolute', animation: 'Animate1234 0.5s' ,background:'white', width:'280px',borderRadius:'5px',  zIndex:100000, right:'8px',top:'62px', boxShadow:  '0px 0px 5px #25695c'}} onMouseLeave={()=>{this.setState({alertbool:!this.state.alertbool})}}>
        <div className='alertcardcontainer' style={{maxHeight:'260px',overflowY:'scroll'}}>
        {this.alertfn()}
        </div>
       </div>}
           </div>)
      }
    }

     export default Header