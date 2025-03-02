import { useBookStore } from "../../store/useBookStore";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./EditBookPage.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function EditBookPage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { getBook, updateBookById, book, isBookLoading, error } = useBookStore();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        readStatus: "",
        seriesName: "",
        coverImage: "",
        blurb: "",
        genre: "",
        pageCount: 0,
        publishDate: new Date()

    });

    useEffect(() => {
        getBook(id);
    }, [getBook, id]);

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || "",
                author: book.author ? book.author.join(", ") : "",
                readStatus: book.readStatus || "",
                seriesName: book.seriesName || "",
                coverImage: book.coverImage || "",
                blurb: book.blurb || "",
                genre: book.genre || "",
                pageCount: book.pageCount || 0,
                publishDate: book.publishDate || new Date()
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleQuillChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            blurb: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            publishDate: date
        }));
    };
    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBookById({ 
            id, 
            updateData: formData ,
            publishDate: formData.publishDate.toISOString()
        });
        
        navigate(`/books/${id}`)
    };

    if (isBookLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Book</h1>
            <form onSubmit={handleSubmit}>
                <div className={`${styles.formGroup} ${styles.inlineGroup}`}>
                    <div className={styles.inlineItem}>
                        <label className={styles.label} htmlFor="title">Title:</label>
                        <input
                            className={styles.input}
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inlineItem}>
                    <label className={styles.label} htmlFor="read-status-dropdown">Read Status</label>
                        <select
                            id="read-status-dropdown"
                            className={styles.input}
                            value={formData.readStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="wantToRead">Want To Read</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="publishDate">Publish Date:</label>
                        <DatePicker 
                            selected={formData.publishDate} 
                            onChange={handleDateChange}
                            id="publishDate"
                            name="publishDate"
                            className={styles.input}
                        />
                    </div>



                </div>
                <div className={`${styles.formGroup} ${styles.inlineGroup}`}>
                    <div className={styles.inlineItem}>
                        <label className={styles.label} htmlFor="author">Authors:</label>
                        <input
                            className={styles.input}
                            id="author"
                            name="author"
                            type="text"
                            value={formData.author}
                            onChange={handleChange}
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
                            value={formData.pageCount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inlineItem}>
                        <label className={styles.label} htmlFor="genre">Genre:</label>
                        <select
                            className={styles.input}
                            id="genre"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        >
                            <option value="romance">Romance</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="sci-fi">Sci-Fi</option>
                            <option value="classic">Classic</option>
                            <option value="children">Children</option>
                        </select>
                    </div>
                </div>
                <div className={styles.inlineItem}>
                    <label className={styles.label} htmlFor="seriesName">Series Name:</label>
                        <input
                        className={styles.input}
                        id="seriesName"
                        name="seriesName"
                        type="text"
                        value={formData.seriesName}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="coverImage">Cover Image:</label>
                    <input
                        className={styles.input}
                        id="coverImage"
                        name="coverImage"
                        type="text"
                        value={formData.coverImage}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="blurb">Book Blurb:</label>
                    <ReactQuill
                        id="blurb"
                        theme="snow"
                        className={styles.textarea}
                        value={formData.blurb}
                        onChange={handleQuillChange}
                        required
                    />
                </div>
                <button className={styles.button} type="submit">Save</button>
            </form>
        </div>
    );
}
