import styles from './addBook.module.css'
import { useBookStore } from '../../store/useBookStore';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddBook() {
    const { saveBookToDatabase, isBookLoading, error } = useBookStore();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [readStatus, setReadStatus] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [seriesName, setSeriesName] = useState("");
    const [blurb, setBlurb] = useState("");
    const [genre, setGenre] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [publishDate, setPublishDate] = useState(new Date());

    const handleDateChange = (date) => {
        setPublishDate(date);
    };
    
    const handleQuillChange = (value) => {
        setBlurb(value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const bookData = {
                title,
                author,
                readStatus,
                coverImage,
                seriesName,
                blurb,
                genre,
                pageCount,
                publishDate: publishDate.toISOString()
            };
            console.log(bookData)

            await saveBookToDatabase(bookData);

         //   Clear form and reset state
            setTitle("");
            setAuthor("");
            setSeriesName("")
            setReadStatus("");
            setCoverImage(null);
            setBlurb("");
            setGenre("");
            setPageCount(0);
            setPublishDate(new Date());
        } catch (err) {
            console.error("Failed to create book:", err);
        }
    }

    if (isBookLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
            <div className={styles.container}>
                <h1 className={styles.header}>Add Book</h1>
                <form onSubmit={handleSubmit}>
                    <div className={`${styles.formGroup} ${styles.inlineGroup}`}>
                        <div className={styles.inlineItem}>
                            <label className={styles.label} htmlFor="title">Title:</label>
                            <input
                                className={styles.input}
                                id="title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => {setTitle(e.target.value)}}
                                required
                            />
                        </div>
                        <div className={styles.inlineItem}>
                        <label className={styles.label} htmlFor="read-status-dropdown">Read Status</label>
                            <select
                                id="read-status-dropdown"
                                className={styles.input}
                                value={readStatus}
                                onChange={(e) => {
                                    setReadStatus(e.target.value)
                                }}
                                required
                            >
                                <option value="">Choose status</option>
                                <option value="wantToRead">Want To Read</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                        

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="publishDate">Publish Date:</label>
                            <DatePicker 
                                selected={publishDate} 
                                onChange={handleDateChange}
                                id="publishDate"
                                name="publishDate"
                                className={styles.input}
                            />
                        </div>

    
    
    
                    </div>
                    <div className={styles.inlineItem}>
                            <label className={styles.label} htmlFor="seriesName">Series Name:</label>
                            <input
                                className={styles.input}
                                id="seriesName"
                                name="seriesName"
                                type="text"
                                value={seriesName}
                                onChange={(e) => {setSeriesName(e.target.value)}}
                            />
                        </div>
                    <div className={`${styles.formGroup} ${styles.inlineGroup}`}>
                        <div className={styles.inlineItem}>
                            <label className={styles.label} htmlFor="author">Authors:</label>
                            <input
                                className={styles.input}
                                id="author"
                                name="author"
                                type="text"
                                value={author}
                                onChange={(e) => {setAuthor(e.target.value)}}
                                required
                            />
                        </div>
                        <div className={styles.inlineItem}>
                            <label className={styles.label} htmlFor="pageCount">Page Count:</label>
                            <input
                                className={styles.input}
                                id="pageCount"
                                name="pageCount"
                                type="number"
                                value={pageCount}
                                onChange={(e) => {setPageCount(e.target.value)}}
                                required
                            />
                        </div>
                        <div className={styles.inlineItem}>
                            <label className={styles.label} htmlFor="genre">Genre:</label>
                            <select
                                className={styles.input}
                                id="genre"
                                name="genre"
                                value={genre}
                                onChange={(e) => {setGenre(e.target.value)}}
                                required
                            >
                                 <option value="">Choose Genre</option>
                                <option value="romance">Romance</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="sci-fi">Sci-Fi</option>
                                <option value="classic">Classic</option>
                                <option value="children">Children</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="coverImage">Cover Image:</label>
                        <input
                            className={styles.input}
                            id="coverImage"
                            name="coverImage"
                            type="text"
                            value={coverImage}
                            onChange={(e) => {setCoverImage(e.target.value)}}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="blurb">Book Blurb:</label>
                        <ReactQuill
                            id="blurb"
                            theme="snow"
                            className={styles.textarea}
                            value={blurb}
                            onChange={handleQuillChange}
                            required
                        />
                    </div>
                    <button className={styles.button} type="submit">Save</button>
                </form>
            </div>
        );
}