import React from 'react';

import styles from './rating-item.m.less';

const RatingItem = ({ rating }) => {
	const ratingActiveWidth = {width: `${rating / 0.05}%`}; 
	
	return (
		<div className={styles.rating}>
			<div className={styles.ratingContainer}>
				<div className={styles.ratingActive}
						style={ratingActiveWidth}></div>
				<div className={styles.ratingItems}> 
					<input type='radio' className={styles.ratingItem} value='1' name='rating' />
					<input type='radio' className={styles.ratingItem} value='2' name='rating' />
					<input type='radio' className={styles.ratingItem} value='3' name='rating' />
					<input type='radio' className={styles.ratingItem} value='4' name='rating' />
					<input type='radio' className={styles.ratingItem} value='5' name='rating' />
				</div>
			</div>
			<div className={styles.ratingValue}>({rating})</div>	
		</div>
	);
};

export default RatingItem;

