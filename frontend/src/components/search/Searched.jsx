import { useState, useEffect, useRef } from "react";
import { useBookStore } from "../../store/useBookStore";
import styles from "./searched.module.css";
import { useNavigate, Link } from "react-router-dom";

export default function Search() {
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);

    const searchInputRef = useRef(null);
    const searchDropdownRef = useRef(null);
    const { getAllBooks, searchBooks, books } = useBookStore();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                searchDropdownRef.current &&
                !searchDropdownRef.current.contains(e.target) &&
                !searchInputRef.current.contains(e.target)
            ) {
                setSearchOpen(false);  // Close the search dropdown
                setFilteredBooks([]);  // Clear the filtered books
                setSearchText("")
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getAllBooks();
    }, []);

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchText(value);

        if (value.trim()) {
            const results = books.length ? searchBooks(value) : [];
            const sortedResults = results.sort((a, b) => a.title.localeCompare(b.title));
            setSearchOpen(true);
            setFilteredBooks(sortedResults);
        } else {
            setFilteredBooks([]);
            setSearchOpen(false);
        }
    };

    const navigate = useNavigate();

    function addBookPage() {
        navigate("/addBook");
    }

    return (
        <div className={styles.searchWrapper} ref={searchDropdownRef}>
            <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchInput}
                className={styles.searchInput}
                ref={searchInputRef}
            />
            {isSearchOpen && (
                <div >
                    {filteredBooks.length > 0 ? (
                        <ul className={styles.bookList}>
                            {filteredBooks.map((book) => (
                                <Link to={`/books/${book._id}`} key={book._id} className={styles.book}>
                                    <div className={styles.bookImgContainer}>
                                        <img className={styles.bookImg} src={book.coverImage} alt={book.title} />
                                    </div>
                                    <div>
                                        <h1 className={styles.bookTitle}>{book.title}</h1>
                                        {book.seriesName && <p className={styles.bookSeries}>Series: {book.seriesName}</p>}
                                        <p className={styles.bookAuthors}>By: {book.author}</p>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    ) : (
                        <button className={styles.addBookBtn} onClick={addBookPage}>
                            Add Book
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
