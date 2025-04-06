import React, { useState, useEffect } from 'react';
import { useAuthorStore } from '../../store/useAuthorStore';
import ReactSelect from 'react-select';
import { useBookStore } from '../../store/useBookStore';
import styles from './addBook.module.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

export default function AddBook() {
    const { saveBookToDatabase, isBookLoading, error } = useBookStore();
    const { getAllAuthors, allAuthors } = useAuthorStore();
    const [formData, setFormData] = useState({
        title: "",
        author: [],
        readStatus: "",
        seriesName: "",
        coverImage: "",
        blurb: "",
        genre: "",
        pageCount: 0,
        publishDate: new Date()
    });

    useEffect(() => {
        getAllAuthors(); // Get authors when component mounts
    }, [getAllAuthors]);

    const handleDateChange = (date) => setFormData({ ...formData, publishDate: date });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleQuillChange = (value) => setFormData({ ...formData, blurb: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookData = {
                ...formData,
                publishDate: formData.publishDate.toISOString()
            };
            await saveBookToDatabase(bookData);

            // Reset form after submission
            setFormData({
                title: "",
                author: [],
                readStatus: "",
                seriesName: "",
                coverImage: "",
                blurb: "",
                genre: "",
                pageCount: 0,
                publishDate: new Date()
            });
        } catch (err) {
            console.error("Failed to create book:", err);
        }
    };

    // Multi-select change handler
    const handleAuthorChange = (selectedAuthors) => {
        setFormData({ ...formData, author: selectedAuthors });
    };

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
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.inlineItem}>
                        <label className={styles.label} htmlFor="read-status-dropdown">Read Status:</label>
                        <select
                            id="read-status-dropdown"
                            className={styles.input}
                            value={formData.readStatus}
                            onChange={(e) => setFormData({ ...formData, readStatus: e.target.value })}
                            required
                        >
                            <option value="none">None</option>
                            <option value="wantToRead">Want To Read</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                    <div className={styles.inlineItem}>
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
                        <label className={styles.label} htmlFor="genre">Genre:</label>
                        <select
                            className={styles.input}
                            id="genre"
                            name="genre"
                            value={formData.genre}
                            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                            required
                        >
                            <option value="">Choose Genre</option>
                            <option value="romance">Romance</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="sci-fi">Sci-Fi</option>
                            <option value="classic">Classic</option>
                            <option value="children">Children</option>
                            <option value="ya">Young Adult(YA)</option>
                            <option value="mystery-crime">Mystery & Crime</option>
                            <option value="graphic-novels-manga">Graphic Novels & Manga</option>
                            <option value="non-fiction">Non-Fiction</option>
                        </select>
                    </div>
                    <div className={styles.inlineItem}>
                        <label className={styles.label} htmlFor="author">Author(s):</label>
                        <ReactSelect
                            isMulti
                            options={allAuthors.map(author => ({ label: author.name, value: author._id }))}
                            value={formData.author}
                            onChange={handleAuthorChange}
                            getOptionLabel={(e) => e.label}
                            placeholder="Search and select authors"
                        />
                    </div>
                </div>



                <div className={`${styles.formGroup} ${styles.inlineGroup}`}>
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
                    <div className={styles.inlineItem}>
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

