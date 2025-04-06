import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "../../store/useBookStore";
import { useSeriesStore } from "../../store/useSeriesStore"
import styles from './status.module.css'
import BookImageComponent from '../../components/bookImg/bookImage'
import Select from 'react-select'



export default function ReadStatusPage() {
    const { status } = useParams();
    const { getBooksByReadStatus, booksByStatus, isBookLoading, error } = useBookStore();
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [showNextInSeries, setShowNextInSeries] = useState(false);
    const currentDate = new Date();

    const { getAllSeries, allSeries ,isSeriesLoading, seriesError } = useSeriesStore();

    useEffect(() => {
        getBooksByReadStatus(status,selectedGenre);
    }, [getBooksByReadStatus, status, selectedGenre]);

    useEffect(() => {
        getAllSeries()
    }, [getAllSeries])

    const options = [
        { value: "", label: 'All Books' },
        { value: 'romance', label: 'Romance' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'sci-fi', label: 'Sci-fi' },
        { value: 'children', label: 'Children' },
        { value: 'classic', label: 'Classic' },
        { value: 'ya', label: 'Young Adult(YA)' },
        { value: 'mystery-crime', label: 'Mystery & Crime' },
        { value: 'graphic-novels-manga', label: 'Graphic Novels & Manga' },
        { value: 'non-fiction', label: 'Non-Fiction' },
    ]
    
    const nextSeriesBook = allSeries?.map(series => {
        const nextBook = series.books.find(book => {
            const publishDate = new Date(book.publishDate); 
           return book.readStatus === "wantToRead" && publishDate <= currentDate
        } );
        return (nextBook && <div key={nextBook._id} className={styles.bookContainer}>
            <BookImageComponent book={nextBook} />
            {nextBook.seriesOrder && (
                <div className={styles.bookOrder}>
                    <span className={styles.bookOrderSpan}>
                        {nextBook.seriesOrder}
                    </span>
                </div>
            )}
        </div>)
    });

    if (isBookLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const { books } = booksByStatus;


    return (
        <div >
            <div className={styles.inlineGroup}>
            <h2>{status === 'wantToRead' ? 'Want to Read' : status === 'currentlyReading' ? 'Currently Reading' : 'Read'}</h2>

            {status === 'wantToRead' && (
                <div className={styles.bookFilters}>
                    <div className={styles.genre}>
                        <label className={styles.label} htmlFor="genreSelect"></label>
                        <select
                                id="genreSelect"
                                className={styles.genreSelect}
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                            >
                                {options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        
                    </div>
                    <div>
                    <button className={styles.nextInSeries} onClick={() => setShowNextInSeries(!showNextInSeries)}>
                                {showNextInSeries ? "Show All Books" : "Next In Series"}
                            </button>
                    </div>
                </div>
            )}
            </div>
            <div className={styles.container}>
                {showNextInSeries ? (
                    nextSeriesBook
                ) : (
                    books && books.map(book => (
                         (
                            
                            <div key={book._id} className={styles.bookContainer}>
                            <BookImageComponent book={book} />
                            {book.seriesOrder && (
                                <div className={styles.bookOrder}>
                                    <span className={styles.bookOrderSpan}>
                                        {book.seriesOrder}
                                    </span>
                                </div>
                            )}
                        </div>
                        )
                        
                    ))
                )}
            </div>
        </div>
    );
}
