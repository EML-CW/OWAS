import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import styles from './home.module.css'

const Home = (props) => {
    const [floatingComponents, setFloatingComponents] = useState();
    const [currPage, setCurrPage] = useState("motos")
    const hideSideBar = () => {
        setFloatingComponents(<Sidebar state={false} hide={hideSideBar}navTo={navTo}/>)
        setTimeout(() => {
            setFloatingComponents();
        }, 300);
    }
    const navTo = (nav) => {
        console.log("called");
        setCurrPage(nav);
        hideSideBar();
    }
    const showSidebar = () => {
        setFloatingComponents(<Sidebar state={true} hide={hideSideBar}navTo={navTo}/>)
    }
    return(
        <div className={styles.Home} id="page-wrap">
            <i onClick={showSidebar} className={`${styles.Burger} fas fa-bars`}></i>
            {props.children}
            {floatingComponents}
            {currPage}
        </div>
    )
}

export default Home;