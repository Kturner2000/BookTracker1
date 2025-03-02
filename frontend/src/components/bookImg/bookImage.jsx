import { Link } from 'react-router-dom'
import styles from './bookImage.module.css'

export default function BookImageComponent({ book, className }) {
    return (
                <Link 
                    to={`/books/${book._id}`} 
                    className={`${styles.imageContainer} ${className || ''}`}
                >
                    <img src={book.coverImage} alt={book.title} className={styles.img} />
                </Link>
    )
}
