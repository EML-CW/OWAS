import { useEffect, useState } from "react";
import Authenticator from "../Authenticator";
import styles from './app.module.css';
import axios from 'axios'
import qs from 'querystring'

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
            axios.post(`http://localhost:42069/retrieve`, qs.stringify(formData), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(res => {
                console.log(res);
                setUsrInfo({email: res.data.email, arToken: res.data.token});
                localStorage.setItem('token', res.data.token);
            })
            .catch((err) => {
                console.log(err);
                setUsrInfo({email: '', username: '', arToken: ''});
            })
        }
    }, [])
    const onSubmitForm = (usrCreds) => {
        const formData = {email: usrCreds.email, password: usrCreds.password}
        console.log(formData);
        console.log(usrCreds);
        axios.post(`http://${process.env.REACT_APP_FOO}/login`, qs.stringify(formData), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
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
        axios.get(`http://${process.env.REACT_APP_FOO}/ping`)
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
                <p>Hi! Welcome to OWAS!</p>
                <p>Server status: {serverState._isUp ? "Server up!" : "Couldn't fetch server"}</p>
        </div>
    )
}

export default App;