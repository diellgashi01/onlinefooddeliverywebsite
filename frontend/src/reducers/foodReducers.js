import { ALL_FOODS_REQUEST, ALL_FOODS_SUCCESS, ALL_FOODS_FAIL, FOOD_DETAILS_REQUEST, FOOD_DETAILS_SUCCESS, FOOD_DETAILS_FAIL, CLEAR_ERRORS } from '../constants/foodConstants'

export const foodsReducer = (state = { foods:[] }, action) => {
    switch(action.type){
        case ALL_FOODS_REQUEST:
            return {
                loading: true,
                foods: []
            }
        
        
        case ALL_FOODS_SUCCESS:
            return {
                loading: false,
                foods: action.payload.foods,
                foodsCount: action.payload.foodsCount
            }

        case ALL_FOODS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        
        default:
            return state;
    }
}

export const foodDetailsReducer = (state = { foods: {} }, action ) => {
    switch(action.type){
        case FOOD_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FOOD_DETAILS_SUCCESS:
            return {
                ...state,
                loading: action.payload
            }

        case FOOD_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }    
        
        default:
            return state
    }
}