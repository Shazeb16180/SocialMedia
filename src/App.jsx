import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router";
import MockMan from "mockman-js";
import { Login } from "./pages/Login/Login";
import { SignUp } from "./pages/SignUp/SignUp";
import { Home } from "./pages/Home/Home";
import { Post } from "./pages/Post/Post";
import { NewPost } from "./components/NewPost/NewPost";
import { Profile } from "./pages/Profile/Profile";
import { Protection } from "./components/Protection/Protection";
import { Skeleton } from "./components/Skeleton/Skeleton";
import { BookMarks } from "./pages/Bookmarks/BookMarks";
import { Slide, ToastContainer } from "react-toastify";
import { Loader } from "./components/Loader/Loader";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";

function App() {
  const { loader } = useContext(DataContext);
  return (
    <div>
      {loader && <Loader />}
      <ToastContainer
        position="bottom-center"
        autoClose="1000"
        hideProgressBar="false"
        closeOnClick="true"
        pauseOnHover="true"
        draggable="true"
        transition={Slide}
        style={{ fontWeight: "500", fontSize: "1rem" }}
      />
      <NewPost />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <Protection>
              <Skeleton />
            </Protection>
          }
        >
          <Route index element={<Home />} />
          <Route path="/explore" element={<Home />} />
          <Route
            path="/post/:postId"
            element={
              <Protection>
                <Post />
              </Protection>
            }
          />
          <Route path="/bookmarks" element={<Protection><BookMarks /></Protection>} />
          <Route path="/profile/:username" element={<Protection><Profile /></Protection>} />
        </Route>
        <Route path="/mock" element={<MockMan />} />
      </Routes>
    </div>
  );
}

export default App;
