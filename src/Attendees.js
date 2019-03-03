import React from 'react';
import gql from 'graphql-tag';
import Present from './Attendee/Present';
import { Query } from "react-apollo";

const ATTENDEES_QUERY = gql`
query showAttendees($token: String, $search: String, $productSku: [String], $sortOrder: String) {
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

const Attendees = (props) => {

    let queryVariables = {
        search: props.search,
        productSku: props.product,
        sortOrder: props.sortOrder,
        token: props.token
    }

    return (
        <Query query={ATTENDEES_QUERY} variables={queryVariables}>
            {({ loading, error, data }) => {

                if (loading) return (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <div uk-spinner="ratio: 1"></div>
                    </div>
                );

                if (error) return (
                    <>
                        {error.message.indexOf("Invalid token") &&
                            <>
                                <h3>Enter the security token</h3>
                                <input type="text"
                                    className="uk-input"
                                    value={props.token}
                                    onChange={props.onChangeToken}
                                    placeholder="Security token"
                                />
                            </>

                        }
                        <pre>Error: {error.message}</pre>
                    </>
                );

                let attendees = data.attendees.items;

                if (props.export) {
                    return (
                        <>
                            <pre>
                                {attendees.map(attendee => (
                                    <>{attendee.email}, </>
                                ))}
                            </pre>
                        </>
                    );
                }

                return (
                    <>
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
                                            {attendee.name}<br />
                                            {attendee.email}
                                        </td>
                                        <td className="uk-visible@m">
                                            {attendee.product_name}
                                        </td>
                                        <td>
                                            <Present token={props.token} present={attendee.present} id={attendee.attendee_id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p>Count {attendees.length}</p>
                    </>
                )
            }}
        </Query>
    )
}

export default Attendees;
