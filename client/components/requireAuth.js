import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/currentUser';

class RequireAuth extends Component {
  render() {
    return <div>Require Authentication</div>;
  }
}

export default graphql(query)(RequireAuth);
