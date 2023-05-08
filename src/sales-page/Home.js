import * as React from 'react'
import ProductCategories from './modules/views/ProductCategories'
import ProductSmokingHero from './modules/views/ProductSmokingHero'
import ProductHero from './modules/views/ProductHero'
import ProductValues from './modules/views/ProductValues'
import ProductHowItWorks from './modules/views/ProductHowItWorks'
import ProductCTA from './modules/views/ProductCTA'
import withRoot from './modules/withRoot'

function HomeSales() {
    return (
        <>
            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <ProductHowItWorks />
            <ProductCTA />
            <ProductSmokingHero />
        </>
    )
}

export default withRoot(HomeSales)
