import React, {Component} from 'react';
import {connect} from 'react-redux';

import {changeFilterCategory} from '../../actions';

import styles from './filter-category.m.less';

class FilterCategory extends Component {

	filterButtons = [
		{name: 'all', label: 'All'},
		{ name: 'popular', label: 'Popular'},
		{ name: 'priceIncr', label: 'Price: low to high'},
		{ name: 'priceDecr', label: 'Price: high to low'},
		{ name: 'rating', label: 'Top rated first'}
	];

	createListButtons = ({name, label}) => {
		const {onFilterCategory, isActiveFilter} = this.props;
		const stylesButtonCategory = isActiveFilter === name ? 'isActiveButton'
												: 'buttonCategory';

		return (
			<li key={name}>
				<button 	type='button' 
							className={styles[stylesButtonCategory]}
							onClick={() => onFilterCategory(name)}>
					{label}
				</button>
			</li>
		);
	}

	render() {

		return (
			<ul className={styles.listFiltersCateg}>
				{
					this.filterButtons.map(this.createListButtons)
				}
			</ul>
		);
	}
}

const mapStateToProps = ({filterCategory}) => ({
	isActiveFilter: filterCategory
});

const mapDispatchToProps = (dispatch) => ({
	onFilterCategory: (filter) => dispatch(changeFilterCategory(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategory);