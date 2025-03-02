import { Routes, Route } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/Home';
import ReadStatusPage from './pages/statusPage/ReadStatusPage';
import SeriesPage from './pages/seriesPage/SeriesPage';
import Header from './components/header/header';
import BookPage from './pages/bookPage/BookPage';
import LoginPage from './pages/login/LoginPage';
import EditBookPage from './pages/editBook/EditBookPage';
import AddBook from './pages/addBook/addBook';
import NotPubished from './pages/notPublished/notPublished';
import NotFound from './components/404/NotFound';

function App() {
  const location = useLocation();

  const getBackgroundColor = () => {
    switch (location.pathname) {
      case "/":
        return "#f0bad1"; // Home
      case "/books/status/wantToRead":
        return "#a5cacc"; // Want to read
      case "/books/status/currentlyReading":
        return "#c3719b"; // Currently reading
      case "/books/status/read":
        return "#c8d6c5"; // Read
      case "/books/not-published":
        return "#fddd74";
      default:
        return "#fdf9f6"; // Default color
    }
  };

  const backgroundColor = getBackgroundColor();

      const navigate = useNavigate();
  
      function addBookPage() {
          navigate("/addBook");
      }
  

  return (
    <>
    <div>
       <div className={"titleContainer"}>
                
                <h1>Booktracker</h1>
                <button className={"addBookBtn"} onClick={addBookPage}>
                     Add Book
                </button>
        </div>
    </div>
      <Header />
      <div className='pageContainer' style={{ backgroundColor }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/books/not-published" element={<NotPubished />} />
          <Route path="/books/:id" element={<BookPage />} />
          <Route path="/books/edit/:id" element={<EditBookPage />} />
          <Route path="/books/status/:status" element={<ReadStatusPage />} />
          <Route path="/series/:id" element={<SeriesPage />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes> 
      </div>
    </>
  )
}

export default App
