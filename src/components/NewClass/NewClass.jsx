import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewClass extends Component {

    state ={
        name: ''
    }
    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit = () => {
        this.props.dispatch({ type: 'ADD_CLASS', payload: this.state })
        this.setState({
            name: ''
        })
    }
    render() {
        return (
            <div>
                <h3>Add New Animal Class:</h3>
                <input
                    type="text"
                    placeholder='Class'
                    onChange={this.handleChange}
                    value={this.state.name}
                />
                <button onClick={this.handleSubmit}>Add New Class</button>
            </div>
        )
    }
}

export default connect()(NewClass);