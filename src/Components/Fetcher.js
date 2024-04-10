import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Deleteitem from './Deleteitem';
import Edititem from './Edititem';
import Pagination from './Pagination';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Fetcher = () => {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [itemsPerPage] = useState(5);


  const handleDelete = (id) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  const handleEdit = async (id, newData) => {
    // Update the data in the state with the edited data
    setData(prevData => prevData.map(item => (item.id === id ? newData : item)));
    // Clear the editedData state
    setEditedData({});
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    // Update the editedData state with the edited name
    setEditedData(prevData => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [name]: value
      }
    }));
  };

  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };
const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='table'>
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
  {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(item => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>
        {editedData[item.id] ? (
          <input
            type="text"
            name="name"
            value={editedData[item.id].name}
            onChange={(e) => handleInputChange(e, item.id)}
          />
        ) : (
          item.name
        )}
      </td>
      <td>
        {editedData[item.id] ? (
            
          <button onClick={() => handleEdit(item.id, editedData[item.id])}>Save</button>
        ) : (
          <Edititem
            id={item.id}
            newData={{ ...item }}
            onEdit={handleEdit}
            onInputChange={handleInputChange}
          />
        )}
      </td>
      <td>
        <Deleteitem id={item.id} onDelete={handleDelete} />
      </td>
    </tr>
  ))}
</tbody>
</table>
      <Pagination currentPage={currentPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
};

export default Fetcher;
