import { Link, useLocation } from "react-router-dom";
import BookImageComponent from "../bookImg/bookImage";
import { Book, BookOpenText } from '@phosphor-icons/react';
import styles from './bookSeries.module.css';
import ReadStatusDropdown from '../readStatus/ReadStatusDropdown'

export default function BookSeries({ series }) {

  if (!series) {
    return <div>Loading series...</div>; // O algún mensaje adecuado
  }

  return (
    <div className={styles.seriesContainer}>
      <div className={styles.seriesDetails}>

      <Link to={`/series/${series._id}`}>
        <h2>{series.name}</h2>
      </Link>
       
        <div className={styles.seriesReadDetails}>
          <p>{series.totalBooks}</p>
          <p>
            {series.booksRead === series.totalBooks ? (
              <Book size={20} />
            ) : (
              <BookOpenText size={20} />
            )}
          </p>
        </div>
      </div>
      <ul className={styles.bookList}>
      {series.books?.map((seriesBook, index) => (
        <li key={seriesBook._id} className={styles.bookContainer}>
            <ReadStatusDropdown bookId={seriesBook._id} currentStatus={seriesBook.readStatus} />
            <div className={styles.imgAndOrder}>
                <BookImageComponent book={seriesBook} />
                <div className={styles.bookOrder}>
                    <span className={styles.bookOrderSpan}>
                        {index + 1}
                    </span>
                </div>
            </div>
        </li>
      ))}

      </ul>
    </div>
  );
}
