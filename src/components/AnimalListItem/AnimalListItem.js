import React, { Component } from 'react';
import { connect } from 'react-redux';

// DO NOT MODIFY THIS FILE FOR BASE MODE!



class AnimalListItem extends Component {

    //dispatch to saga to handle async delete from db
    handleDelete = id => e => {
        this.props.dispatch({type: 'DELETE_ANIMAL', payload: id})
    }
    // Renders the list of animals
    render() {
        return (
            <tr>
                <td>{this.props.classData.species_name}</td>
                <td>{this.props.classData.class_name}</td>
                <td><button onClick={this.handleDelete(this.props.classData.id)}>Remove From List</button></td>
            </tr>
        );
    }
}

export default connect()(AnimalListItem);
