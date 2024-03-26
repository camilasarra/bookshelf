import { Link } from 'react-router-dom'

import React from 'react'

export default function Public() {
    const content = (
        <section className="public">
            <header>
                <h1>BookLovers Bookshelf</h1>
            </header>
            <main className="public__main">
                <p></p>
               
                
                <p>Made by: Camila Sarra</p>
            </main>
            <footer>
                <Link to="/login">Login</Link>
            </footer>
        </section>

    )
    return content
}
