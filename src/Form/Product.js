import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Product extends React.Component {
    render() {
        if (!this.props.productsQuery) {
            return (
                <div>Products query failed</div>
            )
        }
    
        if (!this.props.productsQuery.products) {
            return (
                <div>No products found</div>
            )
        }
    
        let products = this.props.productsQuery.products.items;
    
        return (
            <select
                className="uk-select"
                value={this.props.value}
                onChange={this.props.onChange}
                multiple={true}
            >
            <option key="none" value="none">-- Choose a product --</option>
            {products.map(product => (
                <option key={product.sku} value={product.sku}>{product.name}</option>
            ))}
            </select>
        )
    }
}

const PRODUCTS_QUERY = gql`
{
    products(filter: {
      category_id: {
        eq: "8"
      }
    }) {
      items {
        sku
        name
      }
    }
  }  
`

export default graphql(PRODUCTS_QUERY, {
    name: 'productsQuery'
})(Product)