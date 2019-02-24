import React from 'react';

class Form extends React.Component
{
    state = {
        search: ""
    }

    onChange = (event) => {
        this.setState({search: event.target.value});
    }

    render() {
        return (
            <input type="text" 
                className="uk-input" 
                value={this.state.search} 
                onChange={this.onChange.bind(this)}
            />
        );
    }
}

export default Form;