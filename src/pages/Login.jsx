import React ,{useState} from 'react'
import "../App.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {


 

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()


  const handleSubmit=(e)=>{
    e.preventDefault()

     // validation for login input form 
     if(email.trim()==="" || password.trim()===""){
      toast("please fill all the input fields !")
     
      return;
     }
     


    //  checking the  login credentials 

    const existingUserData=JSON.parse(localStorage.getItem("userData"))
    // console.log(existingUserData)

    const user=existingUserData.find((user)=>user.email===email && user.password===password)
    console.log(user)
    if(user){
      localStorage.setItem("userAuth",JSON.stringify(user.name))
      
      setEmail("")
      setPassword("")
      navigate("/todos")
    }else{
      
      toast("invalid credentials!")
      setEmail("")
      setPassword("")
    }



    
  }




  return (
    
    <div className='signup'>
      <ToastContainer />
      <div className="signup_header"></div>
      <div className="signup_nav">
          <h1 id='signup_nav_heading'>Welcome Back!</h1>
          <p id='signup_nav_para'>Let’s help you to meet your tasks</p>

      </div>
      <div className="signup_logo">
        <img src="Assests/undraw_my_notifications_re_ehmk 1.svg" id='signup_loco_icon' alt="" />
      </div>
      <div className="signup_form_container">

      <form onSubmit={handleSubmit}   className='login_form'>
            <input type='email'  className='login_form_input' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter your email' />
            <input type='password'  className='login_form_input' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' />
            <button type='submit' className='btn'>Login</button>
            

      </form>
      </div>
      <div className="btn_contaner">
           
            <div className="login_navigation">
              <p>Don’t have  an account ?  </p>
              <span><Link to="/signup">sign up</Link></span>
            </div>
      </div>


         
            
      
    </div>
      
    
  )
}

export default Login
