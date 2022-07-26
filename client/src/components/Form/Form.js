import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { useGlobalState } from '../../StateProvider';

const Form = () => {
    const optionsData = [{ name: 'option 1', id: 1 }, { name: 'option 2', id: 2 }];
    const [options] = useState(optionsData);

    const { data, setData, handleSubmit, isEditing } = useGlobalState();

    const handleChange = (e) => {
        setData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    // Whenever user select some value
    const onSelect = (usersList) => {
        setData(state => ({
            ...state,
            privateUsers: usersList
        }))
    }

    // Whenever user DeSelect some value
    const onRemove = (usersList) => {
        setData(state => ({
            ...state,
            privateUsers: usersList
        }))
    }


    return (
        <>
            <h2 className='text-center my-5'> Add Your Events</h2>
            <div className='container w-50 box'>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="eventName" className="form-label">Event Name</label>
                        <input type="text" className="form-control" id="eventName" value={data.eventName} name='eventName' onChange={handleChange} />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="description" className="form-label">Event Description</label>
                        <input type="text" className="form-control" id="description" value={data.eventDescription} name='eventDescription' onChange={handleChange} />
                    </div>



                    <div className="col-md-6">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="eventType" id="flexRadioDefault1" value='public' checked={data.eventType === 'public'} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Public Event
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="eventType" id="flexRadioDefault2" value='private' checked={data.eventType === 'private'} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Private Events
                            </label>
                        </div>
                    </div>

                    {/* Conditionally redering select users */}
                    {
                        data.eventType === 'private'
                        &&
                        <div className='col-md-6'>
                            <Multiselect options={options} displayValue="name" onSelect={onSelect} onRemove={onRemove} className='bg-light' />
                        </div>
                    }



                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary">{isEditing? 'update Event':'Add Event'}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form