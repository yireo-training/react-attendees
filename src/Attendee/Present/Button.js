import React from 'react';

const Button = (props) => {
    let present = props.present;

    if (present === 1 || present === "1" || present === true) {
        return (
            <button 
                uk-icon="icon: check"
                onClick={() => {props.onChange(props.id, props.present)}}
                className="Present uk-icon-button uk-text-large uk-check"
            ></button>
        );
    }

    return (
        <button 
            uk-icon="icon: close"
            onClick={() => {props.onChange(props.id, props.present)}}
            className="Present uk-icon-button uk-text-large uk-close"
        ></button>
    );
}

export default Button;