import { useState } from 'react';
import styles from './authenticator.module.css';

const Authenticator = (props) => {
    const [credInputs, setCredInputs] = useState({
        email: '',
        password: '',
    });
    const setEmail = (e) => {
        setCredInputs({
            email: e.target.value,
            password: credInputs.password
        })
    }
    const setPassword = (e) => {
        setCredInputs({
            email: credInputs.email,
            password: e.target.value
        })
    }
    const Authenticate = (e) => {
        e.preventDefault();
        props.Authenticate(credInputs);
    }
    return (
        <div className={styles.Authenticator}>
            <h3>Veuillez vous connecter</h3>
            <input onChange={setEmail} type="email" required={true} placeholder="E-mail"/>
            <input onChange={setPassword} type="password" required={true} placeholder="Mot de passe"/>
            <button onClick={Authenticate}>Connection</button>
        </div>
    )
}

export default Authenticator;