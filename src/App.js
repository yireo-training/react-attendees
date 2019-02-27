import React, { Component } from 'react';
import './App.css';
import AttendeeList from './AttendeeList';
import Form from './Form';

class App extends Component {
  componentWillMount() {
    this.setState({
      token: localStorage.getItem('token'),
      search: localStorage.getItem('search'),
      product: localStorage.getItem('product')
    })
  }

  validateToken(token) {
    if (token !== 'graphqlrocks') {
      return false;
    }

    return true;
  }

  onChangeToken = (event) => {
    let token = event.target.value;
    this.setState({ token: token });
    localStorage.setItem('token', token);
  }

  onChangeSearch = (event) => {
    let search = event.target.value;
    this.setState({ search: search });
    localStorage.setItem('search', search);
  }

  onChangeProduct = (event) => {
    let productSku = event.target.value;
    this.setState({ product: productSku });
    localStorage.setItem('product', productSku);
  }

  onChangeSortOrder = (sortOrder) => {
    this.setState({ sortOrder: sortOrder });
    localStorage.setItem('sortOrder', sortOrder);
  }

  render() {
    if (!this.validateToken(this.state.token)) {
      return (
        <div className="App">
          <input type="text"
            className="uk-input"
            value={this.state.token}
            onChange={this.onChangeToken}
            placeholder="Security token"
          />
          Invalid token: {this.state.token}
        </div>
      )
    }

    return (
      <div className="App">
        <h2>MageTestFest Attendees</h2>
        <Form
          token={this.state.token}
          onChangeSearch={this.onChangeSearch.bind(this)}
          search={this.state.search}
          onChangeProduct={this.onChangeProduct.bind(this)}
          product={this.state.product}
        />
        <AttendeeList
          token={this.state.token}
          search={this.state.search}
          product={this.state.product}
          sortOrder={this.state.sortOrder}
          onChangeSortOrder={this.onChangeSortOrder.bind(this)}
        />
      </div>
    );
  }
}

export default App;
