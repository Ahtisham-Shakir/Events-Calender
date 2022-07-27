import React, { useState } from 'react'
import { useGlobalState } from '../../StateProvider'
import axios from '../../axios';

function Login() {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    const { showToast, validate, user, setUser } = useGlobalState();

    const handleChange = (e) => {
        setUserData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    // function to login user
    const login = () => {
        if (validate(userData)) {
            axios.post('/login', userData).then((res) => {
                showToast('success', res.data.message)
                setUser(res.data.username);
                
                setUserData({
                    username: '',
                    password: ''
                })
            }).catch((err) => {
                showToast('error', 'Getting some issues try again later')
            })
        }
        console.log('login with: ' + user);
    }

    // function to register user
    const register = () => {
        if (validate(userData)) {
            axios.post('/register', userData).then((res) => {
                showToast('success', res.data);
                setUserData({
                    username: '',
                    password: ''
                })
            }).catch((err) => {
                showToast('error', 'Getting some issues try again later')
            })
        }
    }

    return (
        <>
            <h2 className='text-center my-5'>Login or Register</h2>
            <div className='container w-25 box'>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" value={userData.username} name='username' onChange={handleChange} />
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={userData.password} name='password' onChange={handleChange} />
                    </div>

                    <div className="col-12 text-center">
                        <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                    </div>
                    <div className="col-12 text-center">
                        <button type="button" className="btn btn-primary" onClick={register}>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login