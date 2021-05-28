import { useEffect, useState } from "react";
import Authenticator from "../Authenticator";
import styles from './app.module.css';
import axios from 'axios'
import qs from 'querystring'
import Home from "../Home/Home";
import Header from "../Header/Header";

const App = () => {
    const [usrInfo, setUsrInfo] = useState({
        username: '',
        email: '',
        arToken: ''
    })
    const [serverState, setServerState] = useState({
        _isUp: null
    })
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const formData = { token: localStorage.getItem('token') };
            axios.post(`http://${process.env.REACT_APP_HOST}/retrieve`, qs.stringify(formData), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(res => {
                setUsrInfo({email: res.data.email, arToken: res.data.token});
                localStorage.setItem('token', res.data.token);
            })
            .catch((err) => {
                setUsrInfo({email: '', username: '', arToken: ''});
            })
        }
    }, [])
    const onSubmitForm = (usrCreds) => {
        const formData = {email: usrCreds.email, password: usrCreds.password}
        axios.post(`http://${process.env.REACT_APP_HOST}/login`, qs.stringify(formData), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((res) => {
            setUsrInfo({email: usrCreds.email, username: 'uknwn', arToken: res.data.token});
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
        })
        .catch(err => {
            setUsrInfo({email: '', username: '', arToken: '',})
        });
    }
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_HOST}/ping`)
        .then(res => {
            console.log("Fetched!")
            setServerState({_isUp: true})
        })
        .catch(err => {
            console.log(err);
            setServerState({_isUp: false});
        })
    }, [])
    if (!usrInfo.arToken)
        return (
            <div className={styles.ContentWrapper}>
                <Authenticator Authenticate={onSubmitForm}></Authenticator>
                <p>Server status: {serverState._isUp ? "Server up!" : "Couldn't fetch server"}</p>
            </div>
        )
    return (
        <div className={styles.ContentWrapper}>
                <Home>
                <Header/>
                </Home>
                <p>Server status: {serverState._isUp ? "Server up!" : "Couldn't fetch server"}</p>
        </div>
    )
}

export default App;