import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewAnimal extends Component {

    state = {
        name: '',
        class: 1
    }
    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    handleSubmit = () => {
        this.props.dispatch({type: 'ADD_ANIMAL', payload: this.state})
        this.setState({
            name: '',
            class: ''
        })
    }


    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder='Name'
                    onChange={this.handleChange('name')}
                    value={this.state.name}
                />
                <select required onChange={ this.handleChange('class')}>
                {this.props.reduxStore.animalClasses.map(animal => {
                        return (<option key={animal.id} value={animal.id}>{animal.class_name}</option>)
                    })}
                </select>
                <button onClick={this.handleSubmit}>Add New Animal</button>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapReduxStateToProps)(NewAnimal);