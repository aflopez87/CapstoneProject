// TODO: Directs to User page to select verified devices
// GET (Verified Devices) retrieves all verified devices and lists them in a list
// GET (User Devices) retrieves all user devices added to the user
// POST post a form per devices when selected to update the usage in hours and freqency in text. Add a submit button.
// (Stretch Goal) Add Custom device form with the following fields: Name, wattage, type, and a submit button

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

export default function AllBooks() {
    const [books, setBooks]=useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const getBooks = async ()=>{
            const response= await axios("https://@localhost:3000/meec_db/user/devices")
            console.log(response.data)
            setBooks(response.data)
        }
        getBooks()
    }, [])

    return (
    <>
    <div className="allbooks">
        {books.map(book=><div className="book"  key={book.id} onClick={()=>navigate(`/books/${book.id}`)}>
            <h3>{book.title}</h3>
            <img src={book.coverimage} alt={book.title}/>
        </div>)}
    </div>
    </>
    )
};