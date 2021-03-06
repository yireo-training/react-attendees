import React, { Component } from 'react';
import './App.css';
import Attendees from './Attendees';
import Form from './Form';

class App extends Component {
  state = {
    token: '',
    tokenIsValid: false,
    search: '',
    product: [],
    export: false
  }

  componentWillMount() {
    let token = localStorage.getItem('token') || "";
    let search = localStorage.getItem('search') || "";
    let product = localStorage.getItem('product') || "";

    this.setState({
      token: token,
      tokenIsValid: localStorage.getItem('tokenIsValid'),
      search: search,
      product: product.split(','),
      export: (parseInt(localStorage.getItem('export')) === 1) ? true : false,
    })
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
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    this.setState({ product: value });
    localStorage.setItem('product', value);
  }

  onChangeExport = (event) => {
    let exportValue = (event.target.checked) ? 1 : 0;
    this.setState({ export: exportValue });
    localStorage.setItem('export', exportValue);
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
          token={this.state.token}
          onChangeSearch={this.onChangeSearch.bind(this)}
          search={this.state.search}
          onChangeProduct={this.onChangeProduct.bind(this)}
          product={this.state.product}
          onChangeExport={this.onChangeExport.bind(this)}
          export={this.state.export}
        />
        <Attendees
          token={this.state.token}
          onChangeToken={this.onChangeToken.bind(this)}
          search={this.state.search}
          product={this.state.product}
          export={this.state.export}
          sortOrder={this.state.sortOrder}
          onChangeSortOrder={this.onChangeSortOrder.bind(this)}
        />
      </div>
    );
  }
}

export default App;
