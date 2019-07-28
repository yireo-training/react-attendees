import React from 'react';
import Product from './Form/Product';

class Form extends React.Component {
    render() {
        let currentSearch = this.props.search.toString();

        return (
            <div style={{padding:"5px"}}>
                <input type="text"
                    className="uk-input"
                    value={currentSearch}
                    onChange={this.props.onChangeSearch}
                    placeholder="Search for a name or email"
                />
                <Product
                    value={this.props.product}
                    onChange={this.props.onChangeProduct}
                />
                <input type="checkbox"
                    className="uk-checkbox"
                    checked={!!this.props.export}
                    onChange={this.props.onChangeExport}
                />
                <label>Export to CSV</label>
            </div>
        );
    }
}

export default Form;