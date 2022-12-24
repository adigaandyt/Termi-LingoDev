

import React, { useState, useEffect } from 'react';

function TestComponent() {
    return (
        <>
      <h1 className="display-4 text-primary">Professional Elements</h1>
      <button className="btn btn-primary mr-2">Primary Button</button>
      <button className="btn btn-secondary">Secondary Button</button>
      <hr />
      <form>
        <div className="form-group">
          <label htmlfor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlfor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
      <hr />
      <div className="alert alert-warning">Warning Alert</div>
      <div className="alert alert-danger">Danger Alert</div>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>50%</div>
      </div>
    </>
  );
};
    


export default TestComponent;
