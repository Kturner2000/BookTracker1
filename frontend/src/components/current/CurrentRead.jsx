import { useBookStore } from '../../store/useBookStore'
import { useSeriesStore } from '../../store/useSeriesStore'
import { useEffect, useState } from 'react'
import styles from './current.module.css'
import {Check, X}  from '@phosphor-icons/react'
import BookImageComponent from '../bookImg/bookImage'

export default function CurrentlyReading() {
  const { getAllBooks, books, isBookLoading, error } = useBookStore();
  const { getAllSeries, allSeries, isSeriesLoading, error: seriesError } = useSeriesStore();
  const [currentlyReading, setCurrentlyReading] = useState([]);

  useEffect(() => {
    getAllBooks();
    getAllSeries();
  }, [getAllBooks, getAllSeries]);

  useEffect(() => {
    if (books && allSeries) {
      const currentlyReadingBooks = books
      
        .filter(book => book.readStatus === "currentlyReading")
        .map(book => {
          const series = allSeries.find(s => s.name === book.seriesName);
          return series ? { 
            ...book,
            seriesInfo: {
              name: series.name,
              totalBooks: series.books.length,
              booksRead: series.books.filter(b => b.readStatus === "read").length,
              completed: series.completed,
            },
          } : book; // Return book without seriesInfo if no matching series found
        });
  
      setCurrentlyReading(currentlyReadingBooks);
    }
  }, [books, allSeries]);
  

    
  if (error || seriesError) {
    return <div className={styles.error}>Error: {error || seriesError}</div>;
  }
  
  if (isBookLoading || isSeriesLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.sectionContainer}>
       <h1 className={styles.sectionHeader}>Currently Reading</h1>
        <div className={styles.container}>
      
        {currentlyReading.map(book => (
          <div key={book._id} className={styles.bookContainer}>
            <BookImageComponent book={book} />
            <div>
              {book.seriesInfo && (
                <div className={styles.seriesInfo}>
                  <p>{book.seriesInfo.booksRead} / {book.seriesInfo.totalBooks}</p>
                  <p>{book.seriesInfo.completed ? <Check size={20} /> : <X size={20} />}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}
