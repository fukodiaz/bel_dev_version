import styles from './utils.m.less';

const openModal = (modalSelector) => {
	const modal = document.querySelector(modalSelector);

	modal.style.display = 'block';
	// modal.classList.add(`${styles.modalShow}`);
	// modal.classList.remove(`${styles.modalHide}`);
	document.body.style.overflow = 'hidden';
};

function hideModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.style.display = 'none';
	// modal.classList.add(`${styles.modalHide}`);
	// modal.classList.remove(`${styles.modalShow}`);
	document.body.style.overflow = '';
}

const onClickModalBox = (modalSelector, e) => {
	const modal = document.querySelector(modalSelector);

	if (e.target == modal) {
		hideModal(modalSelector);
	}
};

export {
	openModal,
	hideModal,
	onClickModalBox
};