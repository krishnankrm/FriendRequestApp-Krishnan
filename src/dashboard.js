import React, { Component } from "react";
import axios from "axios";
import FullHeader from './FullHeader';
import  configData  from './config.json';
var backendip=configData.backendip

class DAshboard extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
        friendslist: [],
        suggestedfriendslist: [],
        mutualFrdList: "NA",
        friendProfileiD:''
      }
      }
      mutualFnAxios(ele)
      {
        axios.post(backendip+'/RequestedList/mutual',{"user":sessionStorage.getItem('Login'),"frd":ele})
        .then((res)=>{
          if(res.status==208) this.setState({mutualFrdList:"NA"})
          else if(res.status==201) this.setState({mutualFrdList:"NA"})
          else {this.setState({mutualFrdList:res.data}) } 
        })
      }
      friendlistFunciton()
      {
       if(this.state.friendslist.length>0)
       {
          return(this.state.friendslist.map((ele)=>{
            return(<div className='ShakeText' onClick={()=>{this.setState({friendProfileiD:ele});this.mutualFnAxios(ele)}} data-bs-toggle="modal" data-bs-target="#alertmodel" style={{display:'flex', cursor:'pointer', alignItems:'center', padding:'10px 0px 5px 15px', borderBottom:'1px dashed maroon', width:'100%'}}>
            {/* <div>  <img src='./1234.jpg' alt="Avatar" style={{width:"50px", marginRight:'10px', borderRadius: "50%"}}></img> </div>   <div> <h6>Krishnan {ele}</h6></div>  */}
            <div>  <img src='./1234.jpg' alt="Avatar" style={{width:"50px", marginRight:'10px', borderRadius: "50%"}}></img> </div>   <div> <h6>{ele}</h6></div> 

            </div>)
          }))
       }
      }

      Friendshipaxioslist()
      {
        axios.post(backendip+'/RequestedList/friendship',{"user":sessionStorage.getItem('Login')})
        .then((res)=>{
          if(res.status!=208){this.setState({friendslist:res.data}) } 
                    else this.setState({friendslist:[]})
        })
      }
      componentDidMount(){
        this.Friendshipaxioslist()
        if(sessionStorage.getItem('Date')!=(new Date()).toLocaleDateString())
         { sessionStorage.setItem('Date',(new Date()).toLocaleDateString())
          sessionStorage.setItem('startIndex',0)
        }
        setTimeout(() => {
          this.SuggestFriendshipaxioslist(sessionStorage.getItem('startIndex'))

        }, 500);
        setInterval(() => {
          this.SuggestFriendshipaxioslist(sessionStorage.getItem('startIndex'))
        }, 60000);
      }
      SuggestFriendshipaxioslist(startIndex)
      {
        axios.post(backendip+'/Suggestfrds',{"user":sessionStorage.getItem('Login'),"startIndex":startIndex})
        .then((res)=>{
          if(res.status!=208){this.setState({suggestedfriendslist:res.data.suggest});sessionStorage.setItem('startIndex',res.data.updatedStartIndex.toString()) } 
                    else this.setState({suggestedfriendslist:[]})
        })
      }
      SuggestfriendlistFunciton()
      {
        if(this.state.suggestedfriendslist.length>0)
        {
           return(this.state.suggestedfriendslist.map((ele)=>{
             return(<div style={{display:'flex', alignItems:'center', padding:'10px 0px 5px 15px', borderBottom:'1px dashed maroon', width:'100%'}}>
              {/*              <div>  <img src='./1234.jpg' alt="Avatar" style={{width:"50px", marginRight:'10px', borderRadius: "50%"}}></img> </div>   <div> <h6>Krishnan {ele}</h6></div>  */}
             <div>  <img src='./1234.jpg' alt="Avatar" style={{width:"50px", marginRight:'10px', borderRadius: "50%"}}></img> </div>   <div> <h6> {ele}</h6></div> 
             </div>)
           }))
        }   
         }
      alertDialog()
  {

    return(
      <div class="modal fade" id="alertmodel" tabindex="-1" aria-labelledby="alertmodelLabel" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
    <div class="modal-dialog " >
  
      <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="alertmodelLabel" > {this.state.friendProfileiD}'s Profile</h5>

          {/* <h5 class="modal-title" id="alertmodelLabel" >Krishnan {this.state.friendProfileiD}'s Profile</h5> */}
          <button id='alertclsbtn' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
        </div>
  
        <div class="modal-body">
          <div className="flex-col mt-1" style={{alignItems:"center"}} >

                      <img className="mt-3" src='./1234.jpg' alt="Avatar" style={{width:"125px",  borderRadius: "50%"}}></img>
                      <h5 className="mt-3">{this.state.friendProfileiD}</h5>  
{/*                       <h5 className="mt-3">Krishnan {this.state.friendProfileiD}</h5>  
 */}
                      <div><span style={{fontSize:'18px',fontWeight:600}}>Mutual Friends -</span> {this.state.mutualFrdList=='NA'?'NA':this.state.mutualFrdList.map((ele,index)=> {if(index!=this.state.mutualFrdList.length-1) return ('Krishnan '+ele+', ') 
                      else return (ele)})}</div>
{/*                       else return ('Krishnan '+ele)})}</div>
 */}
                      </div>
        </div>
      </div>
    </div>
  </div>)
  }

      render()
      {
        return(<div style={{backgroundColor:'#fdebd0', height:'100vh'}}>
            <FullHeader onSelectLanguage={(e)=>{this.Friendshipaxioslist()}}/>
            <div style={{height:'calc(100vh - 60px)', overflow:'auto'}}>
              <div className="mt-5" style={{flexWrap:'wrap',display:'flex',justifyContent:'center'}}>
              
                  <div className="card" style={{height:'400px', width:'275px',backgroundColor:'rgb(205 133 81 / 40%)', border:'1px solid grey', margin:'10px'}}>
                      <div className="flex-col mt-1" style={{alignItems:"center"}} >
                      <h5 className="mt-3">My Profile</h5>  

                      <img className="mt-3" src='./1234.jpg' alt="Avatar" style={{width:"125px",  borderRadius: "50%"}}></img>
                      <h5 className="mt-3">{sessionStorage.getItem('Login')}</h5>  
                      {/* <h5 className="mt-3">Krishnan {sessionStorage.getItem('Login')}</h5>   */}

                      <div className="mt-3">+919962391114</div>  
                      <div className="mt-2">krm.krish@gmail.com</div>  
                      <div className="mt-2">India</div>  

                      </div>
               
                </div>
                  <div className="card" style={{height:'400px',width:'275px',backgroundColor:'rgb(205 133 81 / 40%)', border:'1px solid grey', margin:'10px'}}>
                  <div className="flex-col mt-1" style={{alignItems:"center"}} >
                      <h5 className="mt-3 mb-3">My Friends</h5>  
                      <div style={{height:'300px', width:'100%', overflowY:'auto', overflowX:'hidden'}}>
                      {this.friendlistFunciton()}
                      {this.alertDialog()}
                      </div>
                      </div>

                  </div>
                  <div className="card" style={{height:'400px',width:'275px',backgroundColor:'rgb(205 133 81 / 40%)', border:'1px solid grey', margin:'10px'}}>
                  <div className="flex-col mt-1" style={{alignItems:"center"}} >
                      <h5 className="mt-3 mb-3">Suggested Friends</h5>  
                      <div style={{height:'300px', width:'100%', overflowY:'auto', overflowX:'hidden'}}>
                      {this.SuggestfriendlistFunciton()}
                      </div>
                      </div>
                  </div>
              </div>
            </div>
            </div>)
      }
    }

     export default DAshboard