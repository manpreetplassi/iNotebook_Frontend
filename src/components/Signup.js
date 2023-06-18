import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


export default function Signup() {

    const context = useContext(noteContext);
    const { showAlert ,host} = context;
    const [details, setDetails] = useState({name:"", email: "", password: "", confirmPassword: ""})
    let navigate  = useNavigate();
    const onChange = (e) => {
      setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const submitFnc = async (e) => {
      e.preventDefault();
      
    // Check if password and confirmPassword match
    if (details.password !== details.confirmPassword) {
      showAlert("Passwords don't match");
      return;
    }

      // API call
      const url = `${host}/api/auth/createUser`;
      const {name, email, password} = details;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
    
        const json = await response.json();
        if (response.ok) {
          await showAlert("Welcome to iNotebook");
          localStorage.setItem("token", json.token);
          navigate("/");
          // console.log(json);
        } else {
          await showAlert(json.errors[0].msg);
          throw new Error(json.errors[0].msg);
        }
      } catch (error) {
        console.log("Error occurred:", error);
        // Handle the error as needed
      }
    };
    
    return (
        <div className='grid place-content-center'>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Signup Page
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details for Signup.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Name" type="text"  id="name" name='name' value={details.name} onChange={onChange} required/>
                        <Input size="lg" label="Email" type="email"  id="email" name='email' value={details.email} onChange={onChange} required/>
                        <Input size="lg" label="Password" type="password" id="password" name='password' value={details.password} onChange={onChange} required minLength={4} />
                        <Input size="lg" label="Confirm Password" type="password" id="confirmPassword" name='confirmPassword' value={details.confirmPassword} onChange={onChange} required minLength={4} />
                    </div>
                    <Button disabled={details.email.length<5 || details.password.length <4 } className="mt-6" fullWidth onClick={submitFnc}>
                        Sign Up
                    </Button>
                </form>
            </Card>
        </div>
    )
}
