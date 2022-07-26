import React, { useEffect } from 'react'
import { useGlobalState } from '../../StateProvider'
import { Link } from 'react-router-dom'

function EventsTable() {
    const { eventList, fetchData, setIsEditing, setData } = useGlobalState();

    useEffect(() => {
        fetchData();
    }, [fetchData])

    const update = (id)=>{
        const updateEvent = eventList.find((event)=> event._id === id )
        setData(updateEvent);
        setIsEditing(true);
    }


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
                    {eventList.length === 0 ? (
                        <tr>There is no event Please create one!</tr>
                    ) : (
                        eventList.map(({ eventName, eventDescription, eventDate, eventType, _id }, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{eventName}</td>
                                <td>{eventDescription}</td>
                                <td>{eventDate}</td>
                                <td>{eventType}</td>
                                <td><Link to='/addevent' className='btn btn-primary me-1' onClick={()=>update(_id)}>Edit</Link>
                                <Link to='/' className='btn btn-danger'>Delete</Link></td>
                            </tr>

                        ))
                    )
                    }
                </tbody>
            </table>
            <Link to={'/addevent'} className='btn btn-primary'>Create Event</Link>
        </div>
    )
}

export default EventsTable