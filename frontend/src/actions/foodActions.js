import axios from 'axios'

import { ALL_FOODS_REQUEST, ALL_FOODS_SUCCESS, ALL_FOODS_FAIL, CLEAR_ERRORS } from '../constants/foodConstants'

export const getFoods = () => async (dispatch) => {
    try{

        dispatch({ type: ALL_FOODS_REQUEST})

        const {data} = await axios.get('/api/v1/foods')
        
        dispatch({
            type: ALL_FOODS_SUCCESS,
            payload: data
        })

    } catch (error){
        dispatch({
            type: ALL_FOODS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear Errors

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}