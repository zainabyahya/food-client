import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { checkForToken } from './slices/authSlice';
import FoodDetails from "./components/FoodDetails";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import BlogPostPage from "./pages/BlogPostPage";
import Signup from "./components/Signup";
import AuthPage from "./pages/AuthPage";
import Community from "./pages/Community";
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import Profile from './components/Profile';
import Bookmarks from './components/Bookmarks';
import { loadInitialLocation } from './slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentToken);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const token = localStorage.getItem("token");
      const userInfo = checkForToken(token)
      dispatch({ type: "auth/getUser", payload: userInfo })
    }
    dispatch(loadInitialLocation());
  }, [dispatch]);


  return (
    <div >
      <Navbar user={user} />
      <div className='min-h-[70vh]'>
        <Routes>
          < Route path="/auth" element={<AuthPage />} />
          < Route path="/" element={<HomePage />} />
          < Route path="/bookmarks" element={<Bookmarks />} />
          < Route path="/login" element={<Login />} />
          < Route path="/signup" element={<Signup />} />
          < Route path="/community" element={<Community />} />
          < Route path={`/community/:postId`} element={< BlogPostPage />} />
          < Route path={`/food/:foodPostId`} element={< FoodDetails />} />
          <Route path="/chats/*" element={<ChatPage />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div >
  );
}

export default App;
