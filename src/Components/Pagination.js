// Pagination.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'; 

function Pagination({ currentPage, totalPages, prevPage, nextPage }) {
  return (
    <div className='page'>
      <Button onClick={prevPage} disabled={currentPage === 1} type='button' className="btn btn-success">Previous Page</Button>
      <span>Page {currentPage} of {totalPages}</span>
      <Button onClick={nextPage} disabled={currentPage === totalPages} type="button" className="btn btn-success">Next Page</Button>
    </div>
  );
}

export default Pagination;


