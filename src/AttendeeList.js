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
            <thead>
                <tr>
                    <th>
                        <button onClick={() => props.onChangeSortOrder('attendee_id')}>ID</button>
                    </th>
                    <th>
                        <button onClick={() => props.onChangeSortOrder('name')}>Name</button> 
                        <button onClick={() => props.onChangeSortOrder('email')}>Email</button>
                    </th>
                    <th className="uk-visible@m">
                        Product
                    </th>
                    <th>
                        <button onClick={() => props.onChangeSortOrder('present')}>Present</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {attendees.map(attendee => (
                    <tr key={attendee.attendee_id}>
                        <td>
                            {attendee.attendee_id}
                        </td>
                        <td>
                            {attendee.name}<br/>
                            {attendee.email}
                        </td>
                        <td className="uk-visible@m">
                            {attendee.product_name}
                        </td>
                        <td>
                            <Present present={attendee.present} id={attendee.attendee_id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const ATTENDEES_QUERY = gql`
query showAttendees($token: String, $search: String, $productSku: String, $sortOrder: String) {
    attendees(
      token: $token,
      search: $search,
      productFilter: {
        sku: $productSku
      },
      sortOrder: $sortOrder
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

export default graphql(ATTENDEES_QUERY, {
    options: (props) => ({ variables: { 
        search: props.search,
        productSku: props.product,
        sortOrder: props.sortOrder,
        token: 'graphqlrocks'
    }}),
    name: 'attendeesQuery'
})(AttendeeList)
