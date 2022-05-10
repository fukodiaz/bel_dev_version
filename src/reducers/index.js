const initialState = {
	listOffers: [],
	error: false,
	loading: true,

	filterCities: 'Antwerp',
	visibleListOffers: [],

	filterCategory: 'all',

	dataCities: [],
	dataCitiesError: false,
	dataCitiesLoading: true,

	dataFormPosted: JSON.parse(window.localStorage.getItem('dataForm')) || {},
	dataFormSending:  window.localStorage.getItem('loadingDataForm') || false,
	dataFormError:  JSON.parse(window.localStorage.getItem('errorDataForm')) || false,
	resultPostRequest: window.localStorage.getItem('resultPostRequest') || null,

	listLikedOffers: JSON.parse(window.localStorage.getItem('listLikedOffers')) || [],
	//listLikedOffers: []

};

const filterCity = (offers, filter) => {
	return offers.filter( offer => offer.city === filter);
};

const sortOffers = (prop) => (prev, next) => +prev[prop] - +next[prop];

const filterCateg = (filter, offers) => {
	switch(filter) {
		case 'all':
			return offers;
		case 'popular':
			return offers.filter(offer => +offer.rating >= 4.5);
		case 'priceIncr': 
			return offers.sort(sortOffers('price'));
		case 'priceDecr':
			return offers.sort(sortOffers('price')).reverse();
		case 'rating':
			return offers.sort(sortOffers('rating')).reverse();
	}
};


const createListLikedOffers = (state, idOffer) => {
	const {listOffers, listLikedOffers} = state;
	const offer = listOffers.find(({id}) => id === idOffer);
	const itemIndex = listLikedOffers.findIndex(({id}) => id === idOffer);
	let newListLikedOffers = [];

	if (itemIndex < 0) {
		const newItemLiked = {...offer, like: true};
		newListLikedOffers = [...listLikedOffers, newItemLiked];
		window.localStorage.setItem('listLikedOffers', JSON.stringify(newListLikedOffers));

		return newListLikedOffers;
	} else {
		newListLikedOffers =  [...listLikedOffers.slice(0, itemIndex), 
									...listLikedOffers.slice(itemIndex + 1)];
		window.localStorage.setItem('listLikedOffers', JSON.stringify(newListLikedOffers));
		
		return newListLikedOffers;
	}
};


const reducer = (state = initialState, action) => {

	switch (action.type) {
		case 'DATA_FORM_SENDING':
			return {
				...state,
				dataFormPosted: {},
				dataFormSending: true,
				dataFormError: false,
				resultPostRequest: null
			}

		case 'DATA_FORM_SUCCESS':
			return {
				...state,
				dataFormPosted: action.payload,
				dataFormSending: false,
				dataFormError: false,
				resultPostRequest: "isSuccess"
			}

		case 'DATA_FORM_ERROR':
			return {
				...state,
				dataFormPosted: {},
				dataFormSending: false,
				dataFormError: action.payload,
				resultPostRequest: "isError"
			}
		//

		case 'FETCH_OFFERS_REQUEST':
			return {
				...state,
				listOffers: [],
				error: false,
				loading: true
			}

		case 'FETCH_OFFERS_SUCCESS':
			const visibleListOffers = filterCateg(
				state.filterCategory,
				filterCity(action.payload, state.filterCities));
			return {
				...state,
				listOffers: action.payload,
				loading: false,
				error: false,
				visibleListOffers: visibleListOffers
			}
		
		case 'FETCH_OFFERS_FAILURE':
			return {
				...state,
				loading: false,
				listOffers: [],
				error: action.payload
			}

		//Likes

		case 'PRESS_LIKE':
			return {
				...state,
				listLikedOffers: createListLikedOffers(state, action.payload)
			}

		case 'FETCH_DATA_CITIES_REQUEST': 
			return {
				...state,
				dataCities: [],
				dataCitiesError: false,
				dataCitiesLoading: true
			}	

		case 'FETCH_DATA_CITIES_SUCCESS':
			return {
				...state,
				dataCities: action.payload,
				dataCitiesError: false,
				dataCitiesLoading: false
			}

		case 'FETCH_DATA_CITIES_FAILURE':
			return {
				...state,
				dataCities: [],
				dataCitiesError: action.payload,
				dataCitiesLoading: false
			}


		case 'CHANGE_FILTER_CITIES':
			const newVisibleListOffers = filterCity(state.listOffers, action.payload);

			return {
				...state,
				filterCities: action.payload,
				visibleListOffers: newVisibleListOffers,
				filterCategory: 'all'
			}

		case 'CHANGE_FILTER_CATEGORY':
			const nVisibleListOffers = filterCateg(action.payload, 
				filterCity(state.listOffers, state.filterCities));
				
		return {
			...state,
			filterCategory: action.payload,
			visibleListOffers: nVisibleListOffers
		}

		default: 
			return state;
	}
};

export default reducer;