import React, { Component } from 'react'

const Pagination = (props) => {
    
    return (
        <div className="d-flex justify-content-between container">
            <button disabled={props.page<=1} type="button" className="btn btn-dark" onclick={props.setPagination(-1)}>Previous</button>
            <button type="button" className="btn btn-dark" onclick={props.setPagination(1)}>Next</button>
        </div>
    ) 
  
}

export default Pagination
