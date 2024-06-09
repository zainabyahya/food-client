import FoodCard from "./components/FoodCard";
import FoodDetails from "./components/FoodDetails";
import Footer from "./components/Footer";
import PostCard from "./components/PostCard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PostDetails from "./components/PostDetails";
import Signup from "./components/Signup";
import AuthPage from "./pages/AuthPage";


function App() {
  return (
    <div >
      <Navbar />
      {/* <PostDetails />
      {/* <FoodDetails /> */}
      <Login />
      {/* <Signup /> */}
      {/* <FoodCard />
      <ImagePostCard />  */}
      <Footer />
    </div>
  );
}

export default App;
