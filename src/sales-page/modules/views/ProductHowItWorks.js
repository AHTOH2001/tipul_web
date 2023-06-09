import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import mobileImage from '../../../images/sales/Smartphone-openslipart-ciubotaru.svg'
import webImage from '../../../images/sales/mono_terminals_section.svg'
import { SmartRequest } from '../../../utils/utils'
import Button from '../components/Button'
import Typography from '../components/Typography'

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

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match

        })
    }
}

function ProductHowItWorks() {

    useEffect(() => {
        SmartRequest.get('managment/tariff/')
            .then(resp => {
                setTariffs(resp.data)
                console.log('HERE', resp.data)
            })
    }, [])

    const [tariffs, setTariffs] = useState([])

    return (
        <Box
            component='section'
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
                    component='img'
                    src='https://mui.com/static/themes/onepirate/productCurvyLines.png'
                    alt='curvy lines'
                    sx={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -180,
                        opacity: 0.7,
                    }}
                />
                <Typography
                    variant='h4'
                    marked='center'
                    component='h2'
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
                                    component='img'
                                    src={mobileImage}
                                    alt='mobile'
                                    sx={image}
                                />
                                <Typography variant='h5' align='center' style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'start' }}>
                                    Мобильное приложение
                                </Typography>
                                <Typography variant='h5' align='center' style={{ fontSize: 20, textAlign: 'start' }}>
                                    Позволяет вашим подопечным вести учёт приёма лекарств, врачей и визиты к ним самостоятельно.
                                    Разработан удобный и простой интерфейс, подходящий для слабовидящих людей.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2.</Box>
                                <Box
                                    component='img'
                                    src={webImage}
                                    alt='web'
                                    sx={image}
                                />
                                <Typography variant='h5' align='center' style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'start' }}>
                                    Веб-приложение
                                </Typography>
                                <Typography variant='h5' align='center' style={{ fontSize: 20, textAlign: 'start' }}>
                                    Позволяет Вам как опекуну контролировать процесс приёма лекарств и корректировать его.
                                    Вы сможете получать подробные отчёты о деятельности вашего подопечного.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3.</Box>
                                <Box
                                    component='img'
                                    // src='https://mui.com/static/themes/onepirate/productHowItWorks3.svg'
                                    src='https://mui.com/static/themes/onepirate/productValues3.svg'
                                    alt='money'
                                    sx={image}
                                />
                                <Typography variant='h5' align='center' style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'start' }}>
                                    Тарифы
                                </Typography>
                                {
                                    tariffs.map(tariff => (
                                        <Typography key={tariff.id} variant='h5' align='center' style={{ fontSize: 20, textAlign: 'start' }}>
                                            {tariff.title.format(tariff.price.toString().slice(0, 2))}
                                        </Typography>
                                    ))
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                <Button
                    color='secondary'
                    size='large'
                    variant='contained'
                    component='a'
                    href='/sign-up'
                    sx={{ mt: 8 }}
                >
                    И это ещё не всё
                </Button>
            </Container>
        </Box>
    )
}

export default ProductHowItWorks
