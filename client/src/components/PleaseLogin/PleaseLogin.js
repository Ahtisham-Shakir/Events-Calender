import React from 'react'
import {Link} from 'react-router-dom'

function PleaseLogin() {
  return (
    <div className='container text-center'>
        <h3 className='my-3'>To add your events please login</h3>
        <Link to='/login' className='btn btn-primary'>Login</Link>
    </div>
  )
}

export default PleaseLogin