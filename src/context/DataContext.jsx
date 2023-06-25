import { useReducer } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { dataReducer, initalState } from "../reducer/DataReducer";
import { AuthContext } from "./AuthContext";
import { useState } from "react";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [state, dispatch] = useReducer(dataReducer, initalState);
  const [loader, setLoader] = useState(false);
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
  }, [token]);
  return (
    <DataContext.Provider value={{ state, dispatch, loader, setLoader }}>
      {children}
    </DataContext.Provider>
  );
}
