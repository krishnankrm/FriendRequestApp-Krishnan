
import { render } from "react-dom";
import {  BrowserRouter,  Routes,  Route, Navigate} from "react-router-dom";


import NewUser from './NewUser';
import UserManagement from './login';
import Dashboard from './dashboard';

var a=sessionStorage.getItem('Login'),table=[]

if (a!='false' && a!=null)
{
table=[]

table.push(    <Route path="/Login" element={<UserManagement />} />)
table.push(    <Route path="/Dashboard" element={<Dashboard />} />)
table.push( <Route path="/NewUser" element={<NewUser />}/> )



}
else
{
  table=[<Route path="/Login" element={<UserManagement />} />,
  <Route path="*" element={<Navigate to="/Login" replace />}/>,
  <Route path="/NewUser" element={<NewUser />} 
  />]
}

render(
  
  <BrowserRouter>
  <Routes>
  {table}

  </Routes>
</BrowserRouter>,
  document.getElementById("root")
);