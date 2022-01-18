import React from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const history = useHistory()
    const token = localStorage.getItem('token');

    if (!token) {
        history.push('/');
    }

    return <div>Congrats you are logged in!</div>
}

export default Home
