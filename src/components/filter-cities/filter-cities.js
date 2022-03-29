import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {compose} from '../hoc';
import { withBelgoService } from '../hoc';
import {fetchDataCities, changeFilterCities} from '../../actions';

import styles from './filter-cities.m.less';

class FilterCities extends Component {
	cities = [
		{ id: 'antwerp', label: 'Antwerp' },
		{ id: 'bruges', label: 'Bruges' },
		{ id: 'charleroi', label: 'Charleroi' },
		{ id: 'liege', label: 'Liege' }
	];

	componentDidMount() {
		this.props.fetchDataCities();
	}

	render() {
		const {onChangeFilterCities, isActiveFilter} = this.props;
		return (
			<ul className={styles.navigation}>
				{
					this.cities.map(({id, label}) => {
						let classLink = isActiveFilter === label ? 'isActiveLink' : 'linkCity';
						return (
							<li key={id}>
								<Link to="" className={styles[classLink]}
										onClick={() => { onChangeFilterCities(label) }}>
									{label}
								</Link>
							</li>
						);
					})
				}
			</ul>
		);
	}
}

const mapMethodsToProps = (belgoService) => ({
	getDataCities: belgoService.getDataCities
});

const mapStateToProps = ({filterCities}) => ({
	isActiveFilter: filterCities
});

const mapDispatchToProps = (dispatch, {getDataCities}) => ({
	onChangeFilterCities: (filter) => dispatch(changeFilterCities(filter)),
	fetchDataCities: fetchDataCities(getDataCities, dispatch)
});

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(FilterCities);