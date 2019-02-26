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
        this.state = {present: props.present};
    }

    componentDidUpdate(previousProps) {
        if (previousProps.present !== this.props.present) {
          this.setState({present: this.props.present});
        }
    }

    togglePresence(id, currentPresence, client) {
        console.log(id, currentPresence)
        let newPresence = !currentPresence;
        this.setState({present: newPresence});
        client.mutate({
            mutation: UPDATE_ATTENDEE,
            variables: {
                token: 'graphqlrocks',
                attendeeId: id,
                presence: newPresence
            }
        });
    }

    render() {
        return (
            <ApolloConsumer>
            {client => (
                <Button 
                    onChange={(id, present) => this.togglePresence(id, present, client)} 
                    id={this.props.id} 
                    present={this.state.present} 
                />
            )}
            </ApolloConsumer>
        )
    }
}

export default Present;