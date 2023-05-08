import * as React from 'react'
import ProductCategories from './modules/views/ProductCategories'
import ProductHero from './modules/views/ProductHero'
import ProductHowItWorks from './modules/views/ProductHowItWorks'
import ProductValues from './modules/views/ProductValues'
import withRoot from './modules/withRoot'

function HomeSales() {
    return (
        <>
            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <ProductHowItWorks />
        </>
    )
}

export default withRoot(HomeSales)
