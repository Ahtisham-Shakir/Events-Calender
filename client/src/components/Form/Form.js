import React from 'react';

const Form = () => {


    return (
        <div className='container w-50 box my-5'>
            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="eventName" className="form-label">Event Name</label>
                    <input type="text" className="form-control" id="eventName" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="description" className="form-label">Event Description</label>
                    <input type="text" className="form-control" id="description" />
                </div>



                <div className="col-md-6">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="eventType" id="flexRadioDefault1" />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Public Event
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="eventType" id="flexRadioDefault2" />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Private Events
                        </label>
                    </div>
                </div>

                <div className='col-md-6'>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Select Users</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form