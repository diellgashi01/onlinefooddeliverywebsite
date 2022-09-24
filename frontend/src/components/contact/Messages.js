import React, {useState, useEffect, Fragment } from 'react'
import axios from "axios";
import Sidebar from '../admin/Sidebar';

const Messages = () => {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:4000/api/v1/contact/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if(window.confirm("Are you sure that you want to delete this message?")){
      axios.delete(`http://localhost:4000/api/v1/contact/remove/${id}`)
      alert('Message deleted!');
      setTimeout(() => loadData(), 500);
    }
  }
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
                        <Sidebar />
        </div>
        <div className="col-12 col-md-10 pt-3">
            <h2>List of Messages</h2>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{index+1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.title}</td>
                      <td>{item.message}</td>
                      <td>
                          <button className="btn btn-danger" onClick={() => deleteContact(item.id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>
      </div>
    </Fragment>
  )
}

export default Messages;