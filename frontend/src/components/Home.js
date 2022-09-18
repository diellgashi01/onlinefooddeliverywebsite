import React, { Fragment, useEffect } from 'react'
import MetaData from './layout/MetaData'
import Food from './food/Food'

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
        {loading ? <h1>Loading...</h1> : (
            <Fragment>
                <MetaData title={'Order'}/>
                <h1 id="foods_heading">Latest Food Products</h1>

                <section id="foods" className="container mt-5">
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