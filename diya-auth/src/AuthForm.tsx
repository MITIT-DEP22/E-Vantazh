import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {useLocation} from "react-router-dom";
import {User} from "./data/user";
import axios from "axios";


const AuthForm = () => {
    const [location, setLocation] = useState('/registration')
    const [user, setUser] = useState({} as User)

    const sendData = () => {
        if (user.email && user.password) {
            axios.post('http://example:4000', {...user})
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => {
                    alert(error)
                })
        }
    }

    return (
        <div className={'bg-white bg-gradient w-100 h-100 d-flex flex-column align-items-center justify-content-center'}>
            <div className={'w-25 h-auto pb-2 pt-2 ps-lg-5 pe-lg-5 rounded-top-4 bg-success  text-white text-center'}>
                РЕЄСТРАЦІЯ
            </div>
            <div className={'bg-white shadow w-50 h-auto rounded-5 p-5 d-flex flex-column align-items-center' +
                ' justify-content-center gap-4'}>
                <div className={'w-50'}>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="text"
                        id="email"
                        aria-describedby="emailHelp"
                        className={'text-success border-success'}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                    <Form.Text id="emailHelp" muted>
                        Your email must be like this - example@example.com
                    </Form.Text>
                </div>
                <div className={'w-50'}>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        aria-describedby="passwordHelp"
                        className={'text-success border-success'}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                    <Form.Text id="passwordHelp" muted>
                        Your password must be 8-20 characters long, contain letters and numbers,
                        and must not contain spaces.
                    </Form.Text>
                </div>
                {location === '/registration'
                    &&
                    <div className={'w-50'}>
                        <Form.Label htmlFor="confPassword">Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            id="confPassword"
                            aria-describedby="confPasswordHelp"
                            className={'text-success border-success'}
                        />
                        <Form.Text id="confPasswordHelp" muted>
                            Your confirm password must be like your password
                        </Form.Text>
                    </div>
                }
                <button type="button" className="btn btn-outline-success" onClick={sendData}>LOG IN</button>
                {location === '/registration' ?
                    <div className={'text-success btn text-decoration-underline'} onClick={() => setLocation('/login')}>Go to login</div>
                    :
                    <div className={'text-success btn text-decoration-underline'} onClick={() => setLocation('/registration')} >Go to registration</div>
                }
            </div>
        </div>
    );
};

export default AuthForm;