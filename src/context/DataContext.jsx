import { useReducer } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { dataReducer, initalState } from "../reducer/DataReducer";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [state, dispatch] = useReducer(dataReducer, initalState);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/posts");
        if (response.status === 200) {
          const { posts } = await response.json();
          dispatch({ type: "POSTS", payload: posts });
        } else throw new Error("Error In Getting Posts");
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      console.log("usss");
      try {
        const response = await fetch("/api/users/bookmark", {
          method: "POST",
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          const { users } = await response.json();
          dispatch({ type: "BOOKMARKS", payload: users });
        } else throw new Error("Error in Getting Users");
      } catch (error) {
        console.error(error);
      }
    })();
  }, [token]);
  console.log(state.posts);
  console.log(state.users);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}
