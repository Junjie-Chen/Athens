import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import query from '../queries/currentUser';

class RequireAuth extends Component {
  componentWillUpdate(nextProps) {
    if (!nextProps.data.loading && !nextProps.data.user) {
      hashHistory.push('/login');
    }
  }

  render() {
    return <div>Require Authentication</div>;
  }
}

export default graphql(query)(RequireAuth);
