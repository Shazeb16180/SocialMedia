import { Route, Routes } from "react-router";
import "./App.css";
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

function App() {
  return (
    <div>
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
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Route>
        <Route path="/mock" element={<MockMan />} />
      </Routes>
    </div>
  );
}

export default App;
