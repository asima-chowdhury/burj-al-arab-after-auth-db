import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data));
    }, [])
    return (
        <div>
            <h3>You Have :{bookings.length}</h3>
            {
                bookings.map(book => <li key={book._id}>
                    {book.name} from:{(new Date(book.checkIn).toDateString('dd/MM/YYYY'))}  to:{(new Date(book.checkOut).toDateString('dd/MM/YYYY'))} </li>)
            }
        </div>
    );
};

export default Bookings;