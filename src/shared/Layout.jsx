import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<>
			<h2>Our company</h2>
			<h3>Our services</h3>

			<nav>
				<NavLink style={{ fontSize: '1.1em', margin: '10px' }} to='/cars'>
					Car list
				</NavLink>
				<NavLink style={{ fontSize: '1.1em', margin: '10px' }} to='/clothes'>
					Clothes list
				</NavLink>
				<NavLink style={{ fontSize: '1.1em', margin: '10px' }} to='/photos'>
					Photos list
				</NavLink>
			</nav>

			<Outlet />

			<footer>
				<h3>Footer</h3>
			</footer>
		</>
	)
}

export default Layout
