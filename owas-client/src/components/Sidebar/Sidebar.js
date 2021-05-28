import styles from "./sidebar.module.css"
const Sidebar = (props) => {
    const onOverlayClick = () => {
        props.hide();
    }
        return (
            <div className={`${props.state ? '' : styles.Hide} ${styles.SidebarWrapper}`}>
                <div className={styles.Sidebar}>
                    <i onClick={onOverlayClick} className="fas fa-times"></i>
                    <button onClick={() => props.navTo("motos")}>
                       Motos
                    </button>
                    <button onClick={() => props.navTo("newresa")}>
                       Nouvelle réservation
                    </button>
                    <button onClick={() => props.navTo("clients")}>
                       Clients
                    </button>
                    <button onClick={() => props.navTo("calendrier")}>
                       Calendrier
                    </button>
                </div>
                <div onClick={onOverlayClick} className={styles.Overlay}>
                </div>
            </div>
        );
}

export default Sidebar