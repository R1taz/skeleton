import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styles from './styles.module.css'

const Layout = () => {
	return (
		<div className={styles.layout}>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/virtual'>Virtual scroll</NavLink>
			<NavLink to='/comments'>Comments</NavLink>
			<NavLink to='/countries'>Countries</NavLink>

			<Outlet />
		</div>
	)
}

export default Layout
