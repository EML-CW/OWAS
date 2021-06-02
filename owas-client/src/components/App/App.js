import 'semantic-ui-css/semantic.min.css'
import AuthContainer from '../AuthContainer';
import { Container, Header, Segment } from 'semantic-ui-react';
import BottomMenu from '../BottomMenu';
import styles from "./app.module.css"
import qs from "querystring"
import axios from "axios"
import { useEffect, useState } from 'react';
import ParcContent from '../ParcContent/ParcContent';
import SettingsView from '../SettingsView/SettingsView';
import NewVehiculeDialog from '../NewVehiculeDialog/NewVehiculeDialog';
const App = () => {
    const [activeMenu, setActiveMenu] = useState("parc");
    const [usrInfo, setUsrInfo] = useState({
        _username: "",
        _email: "",
        _arToken: ""
    });
    const [loadingLogin, setLoadingLogin] = useState(false);

    const viewtitle = ["clients", "parc", "calendrier", "parametres", "newvehicule"]
    const views = [null, <ParcContent setActiveMenu={setActiveMenu} usrInfo={usrInfo}/>, null, <SettingsView setUsrInfo={setUsrInfo}/>, <NewVehiculeDialog token={usrInfo._arToken} setActiveMenu={setActiveMenu}/>]
    const setActiveMenuItem = (item) => {
        console.log(item);
        setActiveMenu(item);
    }
    useEffect(() => {
        setLoadingLogin(true);
        const token = localStorage.getItem("_arToken")
        if (token) {
            axios.post("http://192.168.1.103:42069/retrieve", qs.stringify({token: token}), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(res => {
                setUsrInfo({
                    _username: localStorage.getItem("_username"),
                    _email: localStorage.getItem("email"),
                    _arToken: res.data.token
                })
                setLoadingLogin(false);
            })
        }
        setLoadingLogin(false);
    }, [])
    const authenticateUser = (userCreds) => {
        setLoadingLogin(true);
        const formData = {
            email: userCreds._email,
            password: userCreds._password
        }
        axios.post(`http://192.168.1.103:42069/login`, qs.stringify(formData), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((res) => {
            console.log(res.data)
            setLoadingLogin(false);
            setUsrInfo({
                _username: res.data.username,
                _arToken: res.data._arToken,
                _email: userCreds.email
            })
            localStorage.setItem("_arToken", res.data._arToken);
            localStorage.setItem("_email", userCreds.email);
            localStorage.setItem("_username", res.data.username);
        })
        .catch((err) => {

        })
        setUsrInfo(usrInfo)
    }

    if (!usrInfo._username) {
        return (
            <Container>
                <div className={styles.header}>
                    <Header color="blue" textAlign="center" as="h1">OWAS</Header>
                </div>
                <Segment basic textAlign="center" loading={loadingLogin} className={styles.aled}>
                    <AuthContainer authenticateFunction={authenticateUser}></AuthContainer>
                </Segment>
            </Container>
        )
    }
    return (
        <Container>
            <div className={styles.header}>
                <Header color="blue" textAlign="center" as="h1">OWAS</Header>
            </div>
            <Container textAlign="center" className={styles.aled}>
                {views[viewtitle.indexOf(activeMenu)]}
            </Container>
            <BottomMenu setActiveItem={setActiveMenuItem} activeItem={activeMenu}></BottomMenu>
        </Container>
    )
}

export default App;