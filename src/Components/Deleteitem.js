import React from 'react';
import axios from 'axios';

const Deleteitem = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Send DELETE request to delete the data with the specified id
      await axios.delete('https://jsonplaceholder.typicode.com/users/${id}');
      // Call the onDelete function to update the UI
      onDelete(id);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default Deleteitem;
