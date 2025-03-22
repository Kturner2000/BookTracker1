import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBookStore } from '../../store/useBookStore';
import { useSeriesStore } from '../../store/useSeriesStore';
import styles from './bookpage.module.css';
import BookSeries from '../../components/bookSeries/BookSeries';
import { Pencil } from '@phosphor-icons/react';
import NotFound from '../../components/404/NotFound';

export default function BookPage() {
    const { id } = useParams();
    const { getBook, book, updateBookById, isBookLoading, error } = useBookStore();
    const { getSeries, series, isSeriesLoading, seriesError } = useSeriesStore();
    const [readStatus, setReadStatus] = useState(book?.readStatus || '');

    useEffect(() => {
        getBook(id);
    }, [id, getBook]);

    useEffect(() => {
        // Check if the book is available and has a seriesId
        if (book?.seriesId?._id) {
            // Fetch the series using the book's seriesId
            getSeries(book.seriesId._id);
        }
    }, [book, getSeries]);

    useEffect(() => {
        // Update local state when book data is fetched
        if (book) {
            setReadStatus(book.readStatus);
        }
    }, [book]);

    const handleChange = async (event) => {
        const newStatus = event.target.value;
        let newBookRead = [...book.bookRead]; 
    if (newStatus === 'read') {
        const readDate = new Date().toISOString().split('T')[0];
        newBookRead.push(readDate)
    }
        setReadStatus(newStatus);
        try {
            await updateBookById({
                id: book._id,
                updateData: { readStatus: newStatus, bookRead : newBookRead  }

            });
            if (newStatus === 'read' && book.seriesId?._id) {
                await updateSeries(book.seriesId._id, {
                    booksRead: (series?.booksRead || 0) + 1
                });
            }
        } catch (error) {
            console.error("Failed to update read status:", error);
        }
    };

    if (isBookLoading) return <div>Loading book...</div>;
    if (error) return <NotFound type={"Book"} />;
    if (!book) return <NotFound type={"Book"} />;


    // Ensure series is loaded before rendering series details
    if (isSeriesLoading) return <div>Loading series...</div>;
    if (seriesError) return <NotFound type={"Series"} />;

    return (
        <div className={styles.container}>
            <Link to={`/books/edit/${book._id}`} className={styles.edit}>
                <Pencil size={18} />
            </Link>

            <div className={styles.bookContainer}>
                 <div className={`${styles.imageContainer} `}>
                    <img src={book.coverImage} alt={book.title} className={styles.img} />
                </div>
                
                <div className={styles.detailContainer}>
                    <div className={styles.sectionOne}>
                        <h1>{book.title}</h1>
                        <div className={styles.statusItem}>
                            <label className={styles.label} htmlFor="read-status-dropdown">Read Status</label>
                            <select
                                id="read-status-dropdown"
                                className={styles.statusInput}
                                value={book.readStatus}
                                onChange={handleChange}
                            >
                                <option value="none">None</option>
                                <option value="wantToRead">Want To Read</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.sectionTwo}>
                        <p>Authors: {book.author?.join(', ') || 'Unknown'}</p>
                        <p>Genre: {book.genre}</p>
                    </div>
                    <div className={`${styles.sectionThree} ql-editor ${styles.blurb}`} dangerouslySetInnerHTML={{ __html: book.blurb }} />
                </div>
            </div>
            <div className={styles.series}>
                {/* Display series information if available */}
                {series && <BookSeries series={series} />}
            </div>
        </div>
    );
}
