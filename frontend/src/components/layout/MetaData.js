import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - Food Delivery`}</title>
        </Helmet>
    )
}

export default MetaData
