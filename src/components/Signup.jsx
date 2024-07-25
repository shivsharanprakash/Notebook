
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {

    const [crendentials, setCredentials] = useState({name:"", email: " ", password: " ",cpassword:" " })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
       const {name,email ,password}=crendentials;
        if (crendentials.password !== crendentials.cpassword) {
            alert("Passwords do not match");
            return;
        }
        

        const response = await fetch("http://localhost:3001/api/auth/createuser", {
          
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({name: crendentials.name, email: crendentials.email, password: crendentials.password })

        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully ","success");
        }
        else {
            props.showAlert("invalid Credentials","danger");
        }

    }


    const onChange = (e) => {
        setCredentials({ ...crendentials, [e.target.name]: e.target.value });
    };


    return (


        <div className='container mt-3'>
            <h2 className='my-2'> Create an account to use MyNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={crendentials.name} name='name' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={crendentials.email} name='email' aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  name='password' value={crendentials.password} id="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm-Password</label>
                    <input type="password" className="form-control" name='cpassword'value={crendentials.cpassword} id="cpassword" onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
