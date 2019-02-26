import React, { Component } from 'react';
import './App.css';
import AttendeeList from './AttendeeList';
import Form from './Form';

class App extends Component {
  componentWillMount() {
    this.setState({
      search: localStorage.getItem('search'),
      product: localStorage.getItem('product')
    })
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
    return (
      <div className="App">
        <h2>MageTestFest Attendees</h2>
        <Form
          onChangeSearch={this.onChangeSearch.bind(this)}
          search={this.state.search}
          onChangeProduct={this.onChangeProduct.bind(this)}
          product={this.state.product}
        />
        <AttendeeList
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
