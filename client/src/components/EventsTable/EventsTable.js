import React from 'react'

function EventsTable() {
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
                    <tr>
                        <td>1</td>
                        <td>Hackathon</td>
                        <td>Description of this event</td>
                        <td>7/28/2022</td>
                        <td>Public</td>
                        <td>Edit, Delete</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Birthday</td>
                        <td>Description of this event</td>
                        <td>7/30/2022</td>
                        <td>Private</td>
                        <td>Edit, Delete</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default EventsTable