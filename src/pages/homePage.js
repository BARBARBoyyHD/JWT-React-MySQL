import React from 'react'
import NavBar from '../components/layout/navBar'
import styles from './homePage.module.css'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
        <NavBar />
        <section className={styles.section}>
            <div className={styles.box1}>
                <h1>Welcome To My Tutorial</h1>
                <p>Learning JWT auth with MERN stack : MySQL Express React Node.js</p>
                <button><Link to="/login" className={styles.link}>Get Started</Link></button>
            </div>
            <div className={styles.box2}></div>
        </section>
    </div>
  )
}

export default Homepage
