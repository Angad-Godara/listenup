import Navigation from "./Navbar/Navigation";
import Auth from "./Navbar/Auth";
import { Route, Routes, useMatch } from "react-router-dom";
import Search from "./Navbar/Search";
import { BrowserRouter as Router } from "react-router-dom"

function Navbar() {

	const searchRoute = useMatch('/search')

	return (
		<nav className="h-[3.75rem] flex items-center justify-between px-8 relative z-10">
			<Navigation />

			{searchRoute && <Search />}
			<Auth />
		</nav >
	)
}

export default Navbar
