import { useBookStore } from '../../store/useBookStore'
import { useSeriesStore } from '../../store/useSeriesStore'
import { useEffect, useState, useRef } from 'react'
import styles from './hero.module.css'
import BookImageComponent from '../bookImg/bookImage'
import { Link } from 'react-router-dom'


export default function HeroBook() {
  const { getAllBooks, books, isBookLoading, error } = useBookStore();
  const { getAllSeries, allSeries, isSeriesLoading, seriesError } = useSeriesStore();

  const [randomBook, setRandomBook] = useState(null);
  const hasSelectedRandomBook = useRef(false);

  useEffect(() => {
    getAllBooks();
    getAllSeries();
  }, [getAllBooks, getAllSeries]);

  const selectRandomBook = () => {
    if (books.length > 0 && books && allSeries && !hasSelectedRandomBook.current) {
      // Filter series with 0 books read
      const unreadSeries = allSeries.map(series => {
        const books = series.books || []
        const readBooks = books.map(book => book.readStatus === "read").length;
        return readBooks === 0 && series.books.length > 0;
      });
  
      if (unreadSeries.length > 0) {
        // Select a random unread series
        const randomSeriesIndex = Math.floor(Math.random() * unreadSeries.length);
        const selectedSeries = unreadSeries[randomSeriesIndex];
        
  
        // Find the first book of the selected series
        const firstBookOfSeries = books.find(book => book.seriesName === selectedSeries.name);


        if (firstBookOfSeries) {
          setRandomBook({
            ...firstBookOfSeries,
        
          });
          hasSelectedRandomBook.current = true;
        }
      }
    }
  };

  useEffect(() => {
    selectRandomBook();
  }, [books, allSeries]);



 

  if (error || seriesError) {
    return <div className={styles.error}>Error: {error || seriesError}</div>;
  }

  if (isBookLoading || isSeriesLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!randomBook) return null;


  return (
    <div className={styles.heroContainer}>
      <BookImageComponent book={randomBook} className={styles.heroImgContainer}  />
      <div className={styles.detailContainer}>
        <h1>{randomBook.title}</h1>
        {randomBook.seriesName && (
         <div>
              <Link to={`/series/${randomBook.seriesId}`}>
                <h3 className={styles.seriesLink}>{randomBook.seriesName}</h3>
              </Link>
         </div>
        )}
        <p>Authors: {randomBook.author?.join(', ') || 'Unknown'}</p>
      </div>
    </div>
  );
}
