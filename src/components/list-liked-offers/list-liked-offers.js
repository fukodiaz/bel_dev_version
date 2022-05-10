import React, {Component} from 'react';
import {connect} from 'react-redux';

import OfferedItem from '../offered-item';
import {pressLike} from '../../actions';

import styles from './list-liked-offers.m.less';

class ListLikedOffers extends Component {

	createListItems = (data) => {
		const {id} = data;
		return (
			<li key={id} className={styles.itemOffered}>
				<OfferedItem {...data} 
									onPressLike={() => this.props.onPressLike(id)}
									colorLike={{color: 'rgba(230,57,5, 1)'}} />
			</li>
		);
	}
	render() {
		const {listLikedOffers} = this.props;

		return (
			<div>
				<h2 className={styles.headerListLikes}>
					My list of favorite offers (
						<span>{listLikedOffers.length}</span>
						)
				</h2>
				<ul className={styles.listOffers}>
					{listLikedOffers.map(this.createListItems)}
				</ul>
			</div>
		);
	}
}


const mapStateToProps = ({listLikedOffers}) => ({
	listLikedOffers
});

const mapDispatchToProps = (dispatch) => {
	return {
		onPressLike: (id) => dispatch(pressLike(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListLikedOffers);