import React from 'react';
import {Link} from 'react-router-dom';

import RatingItem from '../rating-item';

import styles from './offered-item.m.less';

const OfferedItem = (props) => {

	const { imageIntro, price, rating, 
			concept, descriptionShort, id } = props;

	return (
		<div className={styles.boxOffer}>
			<Link to={id} className={styles.linkOffer}>
				<img src={imageIntro} alt="photo of the proposed building"
						className={styles.imageOffer} />
			</Link>
			<div className={styles.infoOffer}>
				<p className={styles.priceOffer}>
					<b>&#8364;{price}</b>
					<span>/</span>night
				</p>
				<RatingItem rating={rating} />
				<p className={styles.descrOffer}>
					{descriptionShort}
				</p>
				<p className={styles.conceptOffer}>
					{concept}
				</p>
			</div>
		</div>
	);
};

export default OfferedItem;