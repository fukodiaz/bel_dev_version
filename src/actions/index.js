const offersRequested = () => ({type: 'FETCH_OFFERS_REQUEST'});

const offersLoaded = (payload) => ({
		type: 'FETCH_OFFERS_SUCCESS',
		payload
});

const offersError = (payload) => ({
	type: 'FETCH_OFFERS_FAILURE',
	payload
});

const fetchOffers = (methodService, dispatch) => () => {
	dispatch(offersRequested());
	methodService()
		.then(data => dispatch(offersLoaded(data)))
		.catch(error => dispatch(offersError(error)));
};

//dataCities

const dataCitiesRequested = () => ({type: 'FETCH_DATA_CITIES_REQUEST'});

const dataCitiesLoaded = (payload) => ({
		type: 'FETCH_DATA_CITIES_SUCCESS',
		payload
});

const dataCitiesError = (payload) => ({
	type: 'FETCH_DATA_CITIES_FAILURE',
	payload
});

const fetchDataCities = (methodService, dispatch) => () => {
	dispatch(dataCitiesRequested());
	methodService()
		.then(data => dispatch(dataCitiesLoaded(data)))
		.catch(error => dispatch(dataCitiesError(error)));
};


const changeFilterCities = (payload) => ({
	type: 'CHANGE_FILTER_CITIES',
	payload
});

const changeFilterCategory = (payload) => ({
	type: 'CHANGE_FILTER_CATEGORY',
	payload
});


// post dataForm

const dataFormSending = () => ({type: 'DATA_FORM_SENDING'});

const dataFormSuccess = (payload) => ({
		type: 'DATA_FORM_SUCCESS',
		payload
});

const dataFormError = (payload) => ({
	type: 'DATA_FORM_ERROR',
	payload
});


// const sendDataForm = (methodService, dispatch) => (form) => {
// 	dispatch(dataFormSending());
// 	methodService(form)
// 		.then(data => {dispatch(dataFormSuccess(data));})
// 		.catch(error => dispatch(dataFormError(error)));
// };


// Likes
const pressLike = (payload) => ({
	type: 'PRESS_LIKE',
	payload
});



export {
	fetchOffers,
	changeFilterCities,
	changeFilterCategory,
	fetchDataCities,
	//sendDataForm,
	dataFormSending,
	dataFormSuccess,
	dataFormError,
	pressLike
};