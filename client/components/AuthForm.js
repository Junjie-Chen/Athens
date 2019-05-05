import React, { Component } from 'react';

class AuthForm extends Component {
  render() {
    return (
      <div className="row">
        <form className="col s6">
          <div className="input-field">
            <input placeholder="Email" />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
            />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
