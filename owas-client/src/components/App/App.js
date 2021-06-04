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
import CalendarView from '../CalendarView'
import NewVehiculeDialog from '../NewVehiculeDialog/NewVehiculeDialog';
import CustomersView from '../CustomersView/CustomersView';
import NewCustomerDialog from '../NewCustomerDialog/NewCustomerDialog';

const App = () => {
    const [activeMenu, setActiveMenu] = useState("parc");
    const [usrInfo, setUsrInfo] = useState({
        _username: "",
        _email: "",
        _arToken: ""
    });
    const [loadingLogin, setLoadingLogin] = useState(false);

    const viewtitle = ["clients", "parc", "calendrier", "parametres", "newvehicule", "newcustomer"]
    const views = [<CustomersView setActiveMenu={setActiveMenu} token={usrInfo._arToken} />,
                    <ParcContent setActiveMenu={setActiveMenu} usrInfo={usrInfo} />,
                    <CalendarView token={usrInfo._arToken}/>,
                    <SettingsView setUsrInfo={setUsrInfo} />,
                    <NewVehiculeDialog token={usrInfo._arToken} setActiveMenu={setActiveMenu} />,
                    <NewCustomerDialog token={usrInfo._arToken} setActiveMenu={setActiveMenu} />]
    const setActiveMenuItem = (item) => {
        setActiveMenu(item);
    }
    useEffect(() => {
        setLoadingLogin(true);
        const host = process.env.REACT_APP_HOST
        const token = localStorage.getItem("_arToken")
        if (token) {
            axios.post(`http://${host}/retrieve`, qs.stringify({ token: token }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
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
        const host = process.env.REACT_APP_HOST
        setLoadingLogin(true);
        const formData = {
            email: userCreds._email,
            password: userCreds._password
        }
        axios.post(`http://${host}/login`, qs.stringify(formData), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then((res) => {
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