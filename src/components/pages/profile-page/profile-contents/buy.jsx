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
import web_1 from '../../../../images/sales/web_1.png'
import web_2 from '../../../../images/sales/web_2.png'
import web_3 from '../../../../images/sales/web_3.png'
import web_4 from '../../../../images/sales/web_4.png'
import web_5 from '../../../../images/sales/web_5.png'
import web_6 from '../../../../images/sales/web_6.png'
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
            text: 'Персонализированный настройки',
            image: web_1,
        },
        {
            key: 2,
            text: 'Медикаменты и визиты опекуемых на сегодняшний день',
            image: web_2,
        },
        {
            key: 3,
            text: 'Редактирование медикаментов опекуемых',
            image: web_3,
        },
        {
            key: 4,
            text: 'Добавление до 3 опекуемых на один аккаунт',
            image: web_4,
        },
        {
            key: 5,
            text: 'Удаление и добавление медикаментов для опекуемого',
            image: web_5,
        },
        {
            key: 6,
            text: 'Удаление и добавление врачей и визитов к ним для опекуемого',
            image: web_6,
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
                    'Приложение было успешно куплено! Мы рады Вам помогать!',
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
                    title="Регистрация"
                    description="Вы уже зарегистрировались"
                    icon={<UserOutlined />}
                />
                <Step
                    title="Верификация"
                    description="Вы уже подтвердили свою почту"
                    icon={<SolutionOutlined />}
                />
                <Step
                    title="Оплата"
                    description="Вам нужно оплатить, чтобы продолжить пользоваться нашим приложением"
                    icon={<LoadingOutlined />}
                />
                <Step
                    title="Готово"
                    description="После оплаты у вас будет полный доступ к веб-приложению Типуль"
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
                    style={{marginBottom: 20}}
                >
                    Купить - 31 руб.
                </Button>
            </Col>
        </div>
    )
}

export default Buy
