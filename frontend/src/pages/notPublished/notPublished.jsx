import { useEffect } from "react";
import { useBookStore } from "../../store/useBookStore";
import BookImageComponent from "../../components/bookImg/bookImage";
import styles from './notPublished.module.css'

export default function NotPubished() {
        const { getNotPublishedBooks, booksNotPublished, isBookLoading, error } = useBookStore();

        useEffect(() => {
            getNotPublishedBooks()
        },[getNotPublishedBooks])

    
    return (
        <div className={styles.container}>
            {
                booksNotPublished.map((book) => {
                    return (
                        <div key={book._id} >
                        <BookImageComponent book={book} />
                        </div>
                )
                })
            } 
        </div>
    )
}