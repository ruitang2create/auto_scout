import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../styles/Layout.module.css';

const TopNav = () => {
    return (
        <Navbar bg='dark' variant='dark' className={styles.topNavContainer}>
            <Navbar.Brand href='/'>Auto Scout</Navbar.Brand>
            <Nav className={styles.topNav}>
                <Link className={styles.topNavItem} to='/'>Home</Link>
            </Nav>
        </Navbar>
    );
}

export default TopNav;