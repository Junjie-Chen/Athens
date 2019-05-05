import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import query from '../queries/currentUser';
import mutation from '../mutations/signup';

class SignupForm extends Component {
  onSubmit({ email, password }) {
    this.props.mutate({
      variables: {
        email,
        password
      },
      refetchQueries: [
        { query }
      ]
    })
    .catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
    });
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(mutation)(SignupForm);
