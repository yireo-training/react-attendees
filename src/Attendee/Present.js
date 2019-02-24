import React from 'react';
import './Present.css';

class Present extends React.Component {
    render() {
        let present = this.props.present;

        if (present === 1 || present === "1" || present === true) {
            return (
                <button uk-icon="icon: check"
                    className="Present uk-icon-button uk-text-large uk-check"
                ></button>
            );
        }

        return (
            <button uk-icon="icon: close"
                className="Present uk-icon-button uk-text-large uk-close"></button>
        );
    }
}

export default Present;