import React from 'react'
import { Link } from 'react-router-dom'

const Food = ({ food }) => {
    return (
        <div key={food._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
                    <div className="card p-3 rounded">
                        <img
                        className="card-img-top mx-auto"
                        src={food.images[0].url}
                        />
                        <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                            <Link to={`/food/${food._id}`}>{food.name}</Link>
                        </h5>
                        <div className="ratings mt-auto">
                            <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(food.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({food.numOfReviews} Reviews)</span>
                        </div>
                        <p className="card-text">${food.price}</p>
                        <Link to={`/food/${food._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                        </div>
                    </div>
                </div>
    )
}

export default Food;