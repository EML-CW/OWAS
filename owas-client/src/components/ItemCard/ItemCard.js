import styles from './itemcard.module.css'

const ItemCard = (props) => {
    return (
        <div className={styles.ItemCard}>
            <p className={styles.title}>{props.make} {props.model}</p>
            <p className={styles.datatype}>Année:</p>
            <p className={styles.data}>{props.year}</p>
            <p className={styles.datatype}>Cylindrée</p>
            <p className={styles.data}>{props.displacement}</p>
            <p className={styles.datatype}>Kilométrage:</p>
            <p className={styles.data}>{props.mileage}</p>
            <button>Réserver</button>
            <button>Supprimer</button>
        </div>
    )
}

export default ItemCard;