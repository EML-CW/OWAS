import styles from './itemcard.module.css'

const ItemCard = (props) => {
    return (
        <div className={styles.ItemCard}>
            <p className={styles.title}>{props.make} {props.model}</p>
            <p className={styles.datatype}>Année:</p>
            <p className={styles.data}>{props.year}</p>
            <p className={styles.datatype}>Cylindrée:</p>
            <p className={styles.data}>{props.displacement}</p>
            <p className={styles.datatype}>Kilométrage:</p>
            <p className={styles.data}>{props.mileage}</p>
            <button className={`${styles.ItemButton} ${styles.positive}`}>Editer</button>
            <button className={`${styles.ItemButton} ${styles.negative}`}>Supprimer</button>
            <button className={`${styles.ItemButton} ${styles.book} ${styles.positive}`}>Réserver</button>
            </div>
    )
}

export default ItemCard;