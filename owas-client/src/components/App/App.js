import 'semantic-ui-css/semantic.min.css'
import AuthContainer from '../AuthContainer';
import { Button, Card, Container, Header, Segment } from 'semantic-ui-react';
import BottomMenu from '../BottomMenu';
import BikeCard from '../BikeCard';
import styles from "./app.module.css"
import { useState } from 'react';
const App = () => {
    const [activeMenu, setActiveMenu] = useState("parc");
    const [usrInfo, setUsrInfo] = useState({});
    const setActiveMenuItem = (item) => {
        console.log(item);
        setActiveMenu(item);
    }

    return (
        <Container>
            <div className={styles.header}>
                <Header color="blue" textAlign="center" as="h1">OWAS</Header>
            </div>
            <Container textAlign="center" className={styles.aled}>
                <BikeCard/>
                <BikeCard/>
                <BikeCard/>
                <BikeCard/>
                <BikeCard/>
                <BikeCard/>
            </Container>
            <BottomMenu setActiveItem={setActiveMenuItem} activeItem={activeMenu}></BottomMenu>
        </Container>
    )
}

export default App;