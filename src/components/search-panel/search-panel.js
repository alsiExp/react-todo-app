import React, {Component} from "react";

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        search: ''
    };

    onChangeSearch = (e) => {
        const search = e.target.value;
        this.setState({search: search});
        this.props.onSearch(search);
    };


    render() {
        return (

            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   onChange={this.onChangeSearch}
                   />
        );
    }
};

