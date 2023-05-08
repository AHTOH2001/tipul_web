import {
    CheckOutlined,
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons'
import {
    Button,
    Carousel,
    Col,
    Divider,
    Image,
    message,
    Row,
    Steps,
    Typography,
} from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import screen_test from '../../../../images/slider/screen_test.png'
import settings_test from '../../../../images/slider/settings_test.png'
import { setRefresh } from '../../../../redux/refresh/refresh.actions.js'
import { SmartRequest } from '../../../../utils/utils'
import './buy.css'

const { Step } = Steps

const Buy = () => {
    const dispatch = useDispatch()
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    // TODO тект на слайдере
    // Работа с несколькими пациентами
    // Просмотр таблеток опекуемых
    // Редактирование таблеток опекуемых
    // Просмотр посещений к варачам опекуемых
    // Редактирование посещений к варачам опекуемых
    // Просмотр статистики о принятых / непринятых таблеток
    // Графическая визуализация приёма лекарств
    // Защита данных
    // Выбор языка
    // Выбор темы интерфейса
    let slider_data = [
        {
            key: 1,
            text: 'Просмотр таблеток опекуемых',
            image: screen_test,
        },
        {
            key: 2,
            text: 'Редактирование таблеток опекуемых',
            image: settings_test,
        },
    ]

    const handleOnSubmit = () => {
        setIsButtonLoading(true)
        SmartRequest.post('managment/buy/', {
            token: 'wd342342hf34hv2g34h23v4n2bv3n42v34g2vb3bw',
        })
            .then(() => {
                dispatch(setRefresh())
                message.success(
                    'Application was successfully bought! We glad to help you!',
                    5
                )
            })
            .catch((error) => {
                if (error.response.data && error.response.data.detail) {
                    message.error(error.response.data.detail)
                } else {
                    console.error('catch on buy: ', error)
                }
            })
    }

    return (
        <div>
            <Typography.Title className="center" style={{ fontSize: 50 }}>
                Tipul
            </Typography.Title>
            <Typography
                className="center"
                style={{ fontSize: 20, paddingBottom: 20 }}
            >
                С заботой о ваших родных и близких
            </Typography>
            <Steps current={2}>
                <Step
                    title="Register"
                    description="Вы уже зарегистрировались"
                    icon={<UserOutlined />}
                />
                <Step
                    title="Verification"
                    description="Вы уже подтвердили свою почту"
                    icon={<SolutionOutlined />}
                />
                <Step
                    title="Pay"
                    description="You need to pay, to continue using our app"
                    icon={<LoadingOutlined />}
                />
                <Step
                    title="Done"
                    description="После оплаты у вас будет полный доступ к приложению Типуль"
                    icon={<SmileOutlined />}
                />
            </Steps>
            <Divider plain />
            <Typography.Title className="center" style={{ fontSize: 30 }}>
                Возможности после покупки приложения
            </Typography.Title>
            <Image.PreviewGroup>
                <Carousel autoplay className="center blue">
                    {slider_data.map(({ key, text, image }) => (
                        <Row key={key}>
                            <Col className="center">
                                <Image height="520px" src={image} />
                            </Col>
                            <Col>
                                <Typography.Title style={{ color: 'white' }}>
                                    {text}
                                </Typography.Title>
                            </Col>
                            <Divider plain />
                        </Row>
                    ))}
                </Carousel>
            </Image.PreviewGroup>
            <Divider plain />
            <Col className="center">
                <Button
                    type="default"
                    shape="round"
                    icon={<CheckOutlined />}
                    size={'large'}
                    onClick={handleOnSubmit}
                    loading={isButtonLoading}
                >
                    Proceed buying 31 руб.
                </Button>
            </Col>
        </div>
    )
}

export default Buy
