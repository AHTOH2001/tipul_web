import * as React from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '../components/Button'
import Typography from '../components/Typography'
import webImage from '../../../images/sales/mono_terminals_section.svg'
import mobileImage from '../../../images/sales/Smartphone-openslipart-ciubotaru.svg'

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
}

const number = {
    fontSize: 24,
    fontFamily: 'default',
    color: 'secondary.main',
    fontWeight: 'medium',
}

const image = {
    height: 55,
    my: 4,
}

function ProductHowItWorks() {
    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                bgcolor: 'secondary.light',
                overflow: 'hidden',
            }}
        >
            <Container
                sx={{
                    mt: 10,
                    mb: 15,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="img"
                    src="https://mui.com/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -180,
                        opacity: 0.7,
                    }}
                />
                <Typography
                    variant="h4"
                    marked="center"
                    component="h2"
                    sx={{ mb: 14 }}
                >
                    Как это работает
                </Typography>
                <div>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>1.</Box>
                                <Box
                                    component="img"
                                    src={mobileImage}
                                    alt="mobile"
                                    sx={image}
                                />
                                <Typography variant="h5" align="center" style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'start' }}>
                                    Мобильное приложение
                                </Typography>
                                <Typography variant="h5" align="center" style={{ fontSize: 20, textAlign: 'start' }}>
                                    Позволяет вашим подопечным вести учёт приёма лекарств, врачей и визиты к ним самостоятельно.
                                    Разработан удобный и простой интерфейс, подходящий для слабовидящих людей.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2.</Box>
                                <Box
                                    component="img"
                                    src={webImage}
                                    alt="web"
                                    sx={image}
                                />
                                <Typography variant="h5" align="center" style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'start' }}>
                                    Веб-приложение
                                </Typography>
                                <Typography variant="h5" align="center" style={{ fontSize: 20, textAlign: 'start' }}>
                                    Позволяет Вам как опекуну контролировать процесс приёма лекарств и корректировать его.
                                    Вы сможете получать подробные отчёты о деятельности вашего подопечного.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3.</Box>
                                <Box
                                    component="img"
                                    // src="https://mui.com/static/themes/onepirate/productHowItWorks3.svg"
                                    src="https://mui.com/static/themes/onepirate/productValues3.svg"
                                    alt="money"
                                    sx={image}
                                />
                                <Typography variant="h5" align="center" style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'start' }}>
                                    Тарифы
                                </Typography>
                                <Typography variant="h5" align="center" style={{ fontSize: 20, textAlign: 'start' }}>
                                    Годовая подписка 32 рубля на веб-приложение.
                                </Typography>
                                <Typography variant="h5" align="center" style={{ fontSize: 20, textAlign: 'start' }}>
                                    Годовая подписка 31 рубль на мобильное приложение.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    component="a"
                    href="/sign-up"
                    sx={{ mt: 8 }}
                >
                    И это ещё не всё
                </Button>
            </Container>
        </Box>
    )
}

export default ProductHowItWorks
