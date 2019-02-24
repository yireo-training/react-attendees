import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Present from './Attendee/Present';

const AttendeeList = (props) => {
    if (!props.attendeesQuery) {
        return (
            <div>Attendees query failed</div>
        )
    }

    if (!props.attendeesQuery.attendees) {
        return (
            <div>No attendees found</div>
        )
    }

    let attendees = props.attendeesQuery.attendees.items;

    return (
        <table className="uk-table uk-table-striped uk-table-small">
            <caption></caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th className="uk-visible@m">Product</th>
                    <th>Present</th>
                </tr>
            </thead>
            <tbody>
                {attendees.map(attendee => (
                    <tr key={attendee.attendee_id}>
                        <td>
                            {attendee.name}<br/>
                            {attendee.email}
                        </td>
                        <td className="uk-visible@m">{attendee.product_name}</td>
                        <td><Present present={attendee.present} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const ATTENDEES_QUERY = gql`
query {
    attendees(
      token:"graphqlrocks",
      productFilter: {
        sku: "mtf2-conference-regular"
      }
    ) {
      items {
        attendee_id
        name
        email
        product_name
        present
      }
    }
  }
`
export default graphql(ATTENDEES_QUERY, { name: 'attendeesQuery' })(AttendeeList)