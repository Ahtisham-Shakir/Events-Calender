import React, { useEffect } from 'react'
import { useGlobalState } from '../../StateProvider'
import { Link } from 'react-router-dom'
import axios from '../../axios'

function EventsTable() {
    const { eventList, fetchData, setIsEditing, setData, showToast, search } = useGlobalState();

    useEffect(() => {
        fetchData();
    }, [fetchData])

    // useEffect(()=>{
    //     console.log('render')
    // }, [eventList])

    const update = (id) => {
        const updateEvent = eventList.find((event) => event._id === id)
        setData(updateEvent);
        setIsEditing(true);
    }

    const deleteEvent = (id) => {
        axios.delete(`/delete/${id}`).then(() => {
            showToast('success', 'Event Deleted Successfully!')
            fetchData()
        }).catch(() => {
            showToast('error', 'Getting internal issue Try Again later!')
        })
    }

    // Filtering list according to the searched text
    const filteredList = eventList.filter(({ eventName, eventDate }) => eventName.toLowerCase().includes(search.toLowerCase()) || eventDate.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='container box w-75 my-5'>
            <h2 className='text-center'>Events List</h2>
            <table className="table table-striped">
                <thead>
                    <th>Sr</th>
                    <th>Event Name</th>
                    <th>Event Description</th>
                    <th>Event Date</th>
                    <th>Event Type</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {filteredList.length === 0 ? (
                        <tr>There is no event Please create one!</tr>
                    ) : (
                        filteredList.map(({ eventName, eventDescription, eventDate, eventType, _id }, i) => (
                            <tr key={_id}>
                                <td>{i + 1}</td>
                                <td>{eventName}</td>
                                <td>{eventDescription}</td>
                                <td>{eventDate}</td>
                                <td>{eventType}</td>
                                <td><Link to='/addevent' className='btn btn-primary me-1' onClick={() => update(_id)}>Edit</Link>
                                    <Link to='/' className='btn btn-danger' onClick={() => deleteEvent(_id)}>Delete</Link></td>
                            </tr>

                        ))
                    )
                    }
                </tbody>
            </table>
            <div className='d-flex justify-content-between'>
                <Link to={'/addevent'} className='btn btn-primary'>Create Event</Link>
                <Link to={'/login'} className='btn btn-primary'>Login</Link>
            </div>
        </div>
    )
}

export default EventsTable