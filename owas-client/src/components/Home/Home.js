import Sidebar from '../Sidebar/Sidebar'
import styles from './home.module.css'

const Home = (props) => {
    return(
        <div className={styles.Home} id="page-wrap">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            {props.children}
        </div>
    )
}

export default Home;