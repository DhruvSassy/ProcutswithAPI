import {combineReducers} from 'redux';

import { productRdeucers } from './ProductsReducer';

const reducers = combineReducers({
    allProducts:productRdeucers,
});

export default reducers;