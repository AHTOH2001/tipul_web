import * as React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '../components/Typography'
import durableImage from '../../../images/sales/Baum-lineart.svg'
import sophisticatedImage from '../../../images/sales/mono-favorites.svg'

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
}

function ProductValues() {
    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                overflow: 'hidden',
                bgcolor: 'secondary.light',
            }}
        >
            <Container
                sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}
            >
                <Box
                    component="img"
                    src="https://mui.com/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -180,
                    }}
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src="https://mui.com/static/themes/onepirate/productValues1.svg"
                                alt="comfort"
                                sx={{ height: 55 }}
                            />
                            <Typography variant="h6" sx={{ my: 5 }}>
                                Удобство
                            </Typography>
                            <Typography variant="h5">
                                {
                                    'Все наши приложения удобны и просты в использовании'
                                }
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={durableImage}
                                alt="durable"
                                sx={{ height: 55 }}
                            />
                            <Typography variant="h6" sx={{ my: 5 }}>
                                Надёжность
                            </Typography>
                            <Typography variant="h5">
                                {
                                    'Ваши данные надёжно шифруются и хранятся на отдельных серверах'
                                }
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={sophisticatedImage}
                                alt="sophisticated"
                                sx={{ height: 55 }}
                            />
                            <Typography variant="h6" sx={{ my: 5 }}>
                                Продуманность
                            </Typography>
                            <Typography variant="h5">
                                {
                                    'Продуманный интерфейс, адаптированный под ваши нужды'
                                }
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default ProductValues
