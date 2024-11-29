import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styles from './styles.module.css'

const Layout = () => {
	return (
		<div className={styles.layout}>
			<nav>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/photos'>Photos</NavLink>
				<NavLink to='/comments'>Comments</NavLink>
				<NavLink to='/countries'>Countries</NavLink>
			</nav>

			<Outlet />
		</div>
	)
}

export default Layout
