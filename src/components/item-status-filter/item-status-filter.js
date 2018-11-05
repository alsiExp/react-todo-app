import React, {Component} from 'react';

import './item-status-filter.css';


export default class ItemStatusFilter  extends Component {

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'}
    ];

    state = {
        mode: this.props.mode
    };


    render() {

        const { mode, onDisplayModeChange } = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = (mode === name);
            let className = isActive ? "btn-info" : "btn-outline-secondary";

            return (
                <button key={name} type="button"
                        className={`btn ${className}`}
                        onClick={() => {onDisplayModeChange(name)}}>
                        {label}
                </button>
            )
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}
