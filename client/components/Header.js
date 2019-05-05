import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/currentUser';

class Header extends Component {
  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) {
      return;
    }

    if (user) {
      return <div>Logout</div>;
    } else {
      return <div>Signup or Login</div>;
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">Home</Link>
          {this.renderButtons()}
        </div>
      </nav>
    );
  }
}

export default graphql(query)(Header);
