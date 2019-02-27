import React from 'react';
import './Present.css';
import Button from './Present/Button';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_ATTENDEE = gql`
mutation UpdateAttendee($token: String, $attendeeId: Int, $presence: Boolean) {
    updateAttendee(
      token: $token, 
      attendee_id: $attendeeId, 
      present: $presence) {
      attendee_id
      name
      email
      product_id
      present
    }
  }
`

class Present extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            present: props.present,
            loading: false
        };
    }

    componentDidUpdate(previousProps) {
        if (previousProps.present !== this.props.present) {
          this.setState({present: this.props.present});
        }
    }

    togglePresence(id, currentPresence, client) {
        let newPresence = !currentPresence;
        this.setState({loading: true});
        client.mutate({
            mutation: UPDATE_ATTENDEE,
            variables: {
                token: this.props.token,
                attendeeId: id,
                presence: newPresence
            }
        }).then(this.renderPresence.bind(this, newPresence));
    }

    renderPresence(newPresence) {
        this.setState({loading: false, present: newPresence});
    }

    render() {
        return (
            <ApolloConsumer>
            {client => (
                <Button 
                    onChange={(id, present) => this.togglePresence(id, present, client)} 
                    id={this.props.id} 
                    present={this.state.present}
                    loading={this.state.loading}
                />
            )}
            </ApolloConsumer>
        )
    }
}

export default Present;