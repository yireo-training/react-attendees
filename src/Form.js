import React from 'react';
import Product from './Form/Product';

class Form extends React.Component {
    render() {
        return (
            <>
                <input type="text"
                    className="uk-input"
                    value={this.props.search}
                    onChange={this.props.onChangeSearch}
                    placeholder="Search for a name or email"
                />
                <Product
                    value={this.props.product}
                    onChange={this.props.onChangeProduct}
                />
                <input type="checkbox"
                    className="uk-checkbox"
                    checked={this.props.export}
                    onChange={this.props.onChangeExport}
                />
            </>
        );
    }
}

export default Form;