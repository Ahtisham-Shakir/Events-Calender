import React, { createContext, useContext, useState } from "react";
import axios from './axios'
import { toast } from 'react-toastify';


const stateContext = createContext();

const StateProvider = ({ children }) => {

    // State to get values from user
    const [data, setData] = useState({
        eventName: '',
        eventDescription: '',
        eventType: 'public',
        privateUsers: []
    })

    const [eventList, setEventList] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [search, setSearch] = useState('')


    // Function to show toast
    const showToast = (type, message) => {
        if (type === 'error') {
            return toast.error(`${message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            return toast.success(`${message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


    // Function to validate data
    const validate = (data) => {
        if (data.eventType === 'public') {
            for (const key in data) {
                if (data[key] === '') {
                    showToast('error', 'Please fill all the fields!')
                    return false
                }
            }
            return true
        }

        else if (data.eventType === 'private') {
            for (const key in data) {
                if (data[key] === '' || data.privateUsers.length === 0) {
                    showToast('error', 'Please fill all the fields!')
                    return false
                }
            }
            return true
        }
    }


    // Function to fetch data from database
    const fetchData = async () => {
        const response = await axios.get('/');
        setEventList(response.data);
    }


    // Function to submit data into the database
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Updating event
        if (validate(data) && isEditing) {
            axios.put('/update', data).then(() => {
                showToast('success', 'Event Updated Successfully!');
                setIsEditing(false);
                setData({
                    eventName: '',
                    eventDescription: '',
                    eventType: 'public',
                    privateUsers: []
                })
                fetchData();
            }).catch(() => {
                showToast('error', 'Getting Server Error Try Again later!')
            })
        }


        // Adding new Event
        else if (validate(data)) {
            const date = new Date();
            const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            const newData = {
                ...data,
                eventDate: dateStr
            }
            axios.post('/addevent', newData).then((res) => {
                showToast('success', 'Event has been created successfully!');
                setData({
                    eventName: '',
                    eventDescription: '',
                    eventType: 'public',
                    privateUsers: []
                })
                fetchData();
            }).catch((err) => {
                showToast('error', 'There is some issue try again later!')
            })
        }
    }


    return <stateContext.Provider value={{
        data, setData,
        validate, handleSubmit,
        eventList, setEventList, fetchData,
        isEditing, setIsEditing,
        showToast,
        search, setSearch
    }}>
        {children}
    </stateContext.Provider>
}

// Custom Hook
export const useGlobalState = () => useContext(stateContext);

export default StateProvider;