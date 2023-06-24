import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { NavBar } from "../NavBar/NavBar";

export function Skeleton() {
  return (
    <div className=" flex flex-col">
      <Header />
      <div className="flex">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}
