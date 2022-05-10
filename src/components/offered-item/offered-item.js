import React from 'react';
import {Link} from 'react-router-dom';

import RatingItem from '../rating-item';

import like from './like_2.svg';
import styles from './offered-item.m.less';

const OfferedItem = (props) => {

	const { imageIntro, price, rating, 
			concept, descriptionShort, id, onPressLike, colorLike} = props;

	return (
		<div className={styles.boxOffer}>
			<Link to={id} className={styles.linkOffer}>
				<img src={imageIntro} alt="photo of the proposed building"
						className={styles.imageOffer} />
			</Link>
			<div className={styles.infoOffer}>
				<button className={styles.buttonLike} type="button"
							onClick={onPressLike}>
					<p className={styles.svgBox} style={colorLike}>
						<svg width="34" height="30">
							<use href={`${like}#like`}></use>
						</svg>
					</p>
				</button>
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