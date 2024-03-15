import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './style.css'

function SignUp() {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [Cpassword,setCPassword]=useState('')
    const isFormValid = email && password && Cpassword && password === Cpassword;
    const [formError, setFormError] = useState(null);

    async function submit(e){
        e.preventDefault();
        if (password !== Cpassword) {
            alert("Passwords do not match");
            return;
        }
        if (!isFormValid) {
            setFormError("Please fill all fields and ensure passwords match.");
            return;
          }
        console.log("hello")


    }

                                
    // try{

    //         await axios.post("http://localhost:8000/signup",{
    //             email,password
    //         })
    //         .then(res=>{
    //             if(res.data=="exist"){
    //                 alert("User already exists")
    //             }
    //             else if(res.data=="notexist"){
    //                 history("/home",{state:{id:email}})
    //             }
    //         })
    //         .catch(e=>{
    //             alert("wrong details")
    //             console.log(e);
    //         })

    //     }
    //     catch(e){
    //         console.log(e);

    //     }

    // }


    return (
        <div className="signup">

            <h1>Signup</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="password" onChange={(e) => { setCPassword(e.target.value) }} placeholder="Confirm Password" />

                <input type="submit" onClick={submit} disabled={!isFormValid} />

            </form>
            {!isFormValid && <p className="error" >Fill the form correctly!</p>}

            <br />

            <Link to="/">Already have an account? Login</Link>

        </div>
    )
}

export default SignUp