import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './slices/authSlice';
import FoodCard from "./components/FoodCard";
import FoodDetails from "./components/FoodDetails";
import Footer from "./components/Footer";
import PostCard from "./components/PostCard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import BlogPostPage from "./pages/BlogPostPage";
import Signup from "./components/Signup";
import AuthPage from "./pages/AuthPage";
import Community from "./pages/Community";
import Location from './components/Location';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
  }, [])

  return (
    <div >
      <Navbar user={user} />
      <div className='min-h-[70vh]'>
        <Routes>
          < Route path="/auth" element={<AuthPage />} />
          < Route path="/login" element={<Login />} />
          < Route path="/signup" element={<Signup />} />
          < Route path="/community" element={<Community />} />
          < Route path={`/community/:postId`} element={< BlogPostPage />} />
        </Routes>
      </div>
      <Footer />
    </div >
  );
}

export default App;
