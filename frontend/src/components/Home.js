import React, { Fragment, useEffect } from 'react'
import MetaData from './layout/MetaData'
import Food from './food/Food'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getFoods } from '../actions/foodActions'

const Home = () => {

    const dispatch = useDispatch();

    const { loading, foods, error, foodsCount } = useSelector(state => state.foods)
    
    useEffect(() => {
        dispatch(getFoods());
    }, [dispatch])

  return (
    <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title={'Order'}/>
                <h1 id="products_heading">Latest Food Products</h1>

                <section id="products" className="container mt-5">
                <div className="row">
                    {foods && foods.map(food => (
                        <Food key={food._id} food={food} />
                    ))}
                    
                </div>
                </section>
            </Fragment>
        )}
        

    </Fragment>
  )
}

export default Home