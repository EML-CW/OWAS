import { useState } from 'react'
import ItemCard from '../ItemCard';
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
        setCurrPage(nav);
        hideSideBar();
    }
    const showSidebar = () => {
        setFloatingComponents(<Sidebar state={true} hide={hideSideBar}navTo={navTo}/>)
    }
    return(
        <div className={styles.Home}>
            <i onClick={showSidebar} className={`${styles.Burger} fas fa-ellipsis-v`}></i>
            {props.children}
            <ItemCard make="KTM" model="1290 SuperDuke R" year="2020" mileage="2452" displacement="1290"/>
            <ItemCard make="KTM" model="790 Adventure R" year="2019" mileage="13421" displacement="790"/>
            <ItemCard make="KTM" model="390 Duke" year="2021" mileage="2312" displacement="1290"/>
            <ItemCard make="KTM" model="390 Duke" year="2021" mileage="2312" displacement="1290"/>


            {floatingComponents}
            {currPage}
        </div>
    )
}

export default Home;