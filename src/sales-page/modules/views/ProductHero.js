import * as React from 'react'
import Button from '../components/Button'
import Typography from '../components/Typography'
import ProductHeroLayout from './ProductHeroLayout'
import backgroundImage from '../../../images/sales/babulya.jpg'



export default function ProductHero() {
    return (
        <ProductHeroLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center',
            }}
        >
            {/* Increase the network loading priority of the background image. */}
            <img
                style={{ display: 'none' }}
                src={backgroundImage}
                alt="increase priority"
            />
            <Typography
                color="inherit"
                align="center"
                variant="h2"
                marked="center"
            >
                ТИПУЛЬ
            </Typography>
            <Typography
                color="inherit"
                align="center"
                variant="h5"
                sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
            >
                С ЗАБОТОЙ О ВАШИХ РОДНЫХ И БЛИЗКИХ
            </Typography>
            <Button
                color="secondary"
                variant="contained"
                size="large"
                component="a"
                href="/sign-up"
                sx={{ minWidth: 200 }}
            >
                Регистрация
            </Button>
        </ProductHeroLayout>
    )
}
