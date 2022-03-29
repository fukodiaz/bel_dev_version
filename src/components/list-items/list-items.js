import React, {Component} from 'react';
import {connect} from 'react-redux';

import OfferedItem from '../offered-item';
import {compose} from '../hoc';
import { withBelgoService } from '../hoc';
import {fetchOffers} from '../../actions';
import ErrorIndicator from '../error-indicator';

import styles from './list-items.m.less';

class ListItems extends Component {

	componentDidMount() {
		this.props.fetchOffers();
	}

	createListItems = (data) => {
		return (
			<li key={data.id} className={styles.itemOffered}>
				<OfferedItem {...data} />
			</li>
		);
	}
	render() {
		const {visibleListOffers, loading, error} = this.props;
	
		if (loading) {
			return <p>Loading...</p>;
		}

		if (error) {
			return <ErrorIndicator />;
		}

		return (
			<ul className={styles.listOffers}>
				{visibleListOffers.map(this.createListItems)}
			</ul>
		);
	}
}


const mapMethodsToProps = (belgoService) => ({
	getListOffers: belgoService.getListOffers
});

const mapStateToProps = ({visibleListOffers, error, loading}) => ({
	visibleListOffers, error, loading
});

const mapDispatchToProps = (dispatch, {getListOffers}) => {
	return {
		fetchOffers: fetchOffers(getListOffers, dispatch)
	};
};

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ListItems);


