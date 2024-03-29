import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section>

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/reviews">View Books</Link></p>

            <p><Link to="/dash/users">View User Settings</Link></p>

        </section>
    )

    return content
}
