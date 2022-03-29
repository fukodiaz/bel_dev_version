import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';

import ItemDetails from '../item-details';

import styles from './page-details.m.less';

const PageDetails = ({visibleListOffers}) => {

	const {id: idPage} = useParams();
	const [flag, setFlag] = useState(false);

	useEffect(() => {
		const header = document.querySelector('header');
		const heightHeader = window.getComputedStyle(header).height.replace(/[^\d.]/ig, '');
		const boxDetails = document.querySelector('[class^="boxDetails"]');
		const paddingTopBoxDetails = window.getComputedStyle(boxDetails).paddingTop.replace(/[^\d.]/ig, '');
		const motileBox = document.querySelector('[class^="motileBox"]');
		const mainWrapper = document.querySelector('[class^="mainWrapper"]');
		const offset = +heightHeader + +paddingTopBoxDetails;
		
		const onScroll = () => {
			let mainWrapperWidth = window.getComputedStyle(mainWrapper).width.replace(/[^\d.]/ig, '');

			if (window.pageYOffset > offset && +mainWrapperWidth >= 751) {
				setFlag(true);
				if (flag) {
					motileBox.style.top = `${window.pageYOffset - offset}px`;
				}
			} else {
				setFlag((flag) => flag = false);
				motileBox.style.top = 0;
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [flag]);

	return (
		<div className={styles.boxDetails}>
			{
				visibleListOffers.map((data) =>{
					const { id } = data;

					if (idPage === id) {
						return <ItemDetails key={id} {...data} />;
					}

					return null;
				})
			}
		</div>
	);
};

const mapStateToProps = ({ visibleListOffers}) => ({
	visibleListOffers
});

export default connect(mapStateToProps)(PageDetails);