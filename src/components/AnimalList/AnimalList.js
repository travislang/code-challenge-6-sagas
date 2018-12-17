import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnimalListItem from '../AnimalListItem/AnimalListItem';

// DO NOT MODIFY THIS FILE FOR BASE MODE!

class AnimalList extends Component {

    componentDidMount() {
        const action = {type: 'GET_ZOO_ANIMALS'};
        this.props.dispatch(action);
        this.props.dispatch({ type: 'GET_ANIMAL_CLASSES'})
    }

    // Renders the list of animals
    render() {
        return (
            <table className="AnimalList">
                <thead>
                    <tr>
                        <th>Species</th>
                        <th>Class</th>
                        <th>Transfer</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render each item from the zooAnimal reducer */}
                    {this.props.reduxState.zooAnimals.map((classData, i) => {
                        return (<AnimalListItem key={i} classData={classData} />);
                    })}
                </tbody>
            </table>
        );
    }
}

// Makes our reducers available in our component
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AnimalList);
