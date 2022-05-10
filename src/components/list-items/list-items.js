import React, {Component} from 'react';
import {connect} from 'react-redux';

import OfferedItem from '../offered-item';
import {compose} from '../hoc';
import { withBelgoService } from '../hoc';
import {fetchOffers, pressLike} from '../../actions';
import ErrorIndicator from '../error-indicator';

import styles from './list-items.m.less';

class ListItems extends Component {

	componentDidMount() {
		this.props.fetchOffers();
	}

	createListItems = (data) => {
		const {id} = data;
		const idOffer = id;
		const flagLikedOffer = this.props.listLikedOffers.some(({id}) => id === idOffer);
		const colorLike = flagLikedOffer ? {color: 'rgba(230,57,5, 1)'} : {color: 'rgba(190,190,190, 0.3)'};

		return (
			<li key={id} className={styles.itemOffered}>
				<OfferedItem {...data} 
									onPressLike={() => this.props.onPressLike(id)}
									colorLike={colorLike} />
			</li>
		);
	}
	render() {
		const {visibleListOffers, loading, error, listLikedOffers} = this.props;
	
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

const mapStateToProps = ({visibleListOffers, error, loading, listLikedOffers}) => ({
	visibleListOffers, error, loading, listLikedOffers
});

const mapDispatchToProps = (dispatch, {getListOffers}) => {
	return {
		fetchOffers: fetchOffers(getListOffers, dispatch),
		onPressLike: (id) => dispatch(pressLike(id))
	};
};

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ListItems);


