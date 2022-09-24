import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link} from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';

const initialState= {
    name: "",
    email: "",
    title: "",
    message: ""
}

const Contact = () => {
  const [state, setState] = useState(initialState);
  const {name, email, title, message} = state;
  const { user } = useSelector(state => state.auth);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:4000/api/v1/contact/post", {
        name, email, title, message
    }).then(() => {
        setState ({name: "", email: "", title: "", message: ""})
    })
    setTimeout(() => {
        history.push("/")
    }, 500)
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
  }

  return (
    <div className='container p-5'>
        <h2>Got Feedback? Leave us a message below!</h2>
        <hr />
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label> <br />
                <input className="form-control" type="text" id="name" name="name" placeholder="Name..." value={name} onChange={handleInputChange} required/>
            </div>

            <div className="form-group">
                <label htmlFor="name">Email</label> <br />
                <input className="form-control" type="text" id="email" name="email" placeholder="Email..." value={email} onChange={handleInputChange} required/>
            </div>

            <div className="form-group">
                <label htmlFor="name">Title</label> <br />
                <input className="form-control" type="text" id="title" name="title" placeholder="Title..." value={title} onChange={handleInputChange} required/>
            </div>

            <div className="form-group">
                <label htmlFor="name">Message</label> <br />
                <textarea className="form-control" rows="4" type="text" id="message" name="message" placeholder="Message..." value={message} onChange={handleInputChange} required></textarea>
            </div>
            
            <div className="d-flex justify-content-between">
                <input type="submit" className="btn btn-primary" value="Submit Message" />
                <Link to="/">
                    <input type="button" className="btn btn-secondary" value="Go Back" />
                </Link>
            </div>
            
        </form>
        


    </div>
  )
}

export default Contact