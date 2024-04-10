import React, { useState } from 'react';
import axios from 'axios';

const Edititem = ({ id, newData, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(newData.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Send a PUT request to update the data with the specified id
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, { name: editedName });
      // Call the onEdit function to update the UI with the edited data
      onEdit(id, { ...newData, name: editedName });
      // Reset state after saving
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={editedName} 
            onChange={(e) => setEditedName(e.target.value)} 
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default Edititem;
