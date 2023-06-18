import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const context = useContext(noteContext);
    const { showAlert ,host} = context;
    const [details, setDetails] = useState({ email: "", password: ""})
    let navigate  = useNavigate();
    const onChange = (e) => {
      setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const submitFnc = async (e) => {
      e.preventDefault();
      // API call
      const url = `${host}/api/auth/login`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3MDQ4YjkyM2FjYWRhOTI4MTY3ZjZhIn0sImlhdCI6MTY4NTE4ODI3MH0.JwwfY6dU30AgkCr4anid9TTptohgMfbs0hHrk8MhPR0",
          },
          body: JSON.stringify({ email: details.email, password: details.password }),
        });
    
        const json = await response.json();
        if (response.ok) {
          await showAlert("You're Logged in");
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
                    Login Page
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details for login.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Email" type="email"  id="email" name='email' value={details.email} onChange={onChange} required/>
                        <Input size="lg" label="Password" type="password" id="password" name='password' value={details.password} onChange={onChange} required minLength={4} />
                    </div>
                    <Button disabled={details.email.length<5 || details.password.length <4 } className="mt-6" fullWidth onClick={submitFnc}>
                        Submit
                    </Button>
                </form>
            </Card>
        </div>
    )
}
