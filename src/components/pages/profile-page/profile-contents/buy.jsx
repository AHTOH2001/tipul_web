import { CheckOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Carousel, Col, Divider, Image, Row, Steps, Typography } from 'antd'
import React from 'react'
import screen_test from '../../../../images/slider/screen_test.png'
import settings_test from '../../../../images/slider/settings_test.png'
import './buy.css'

const contentStyle = {
    height: '520px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
}

const { Step } = Steps
const Buy = () => {
    // Просмотр таблеток опекуемых
    // Редактирование таблеток опекуемых
    // Просмотр посещений к варачам опекуемых
    // Редактирование посещений к варачам опекуемых
    // Просмотр статистики о принятых / непринятых таблеток
    // Графическая визуализация приёма лекарств
    // Защита данных
    // Выбор языка
    // Выбор темы интерфейса
    let data = [
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
    return (
        <div>
            <Typography.Title className='center' style={{ fontSize: 100 }}>
                Tipul
            </Typography.Title>
            <Typography className='center' style={{ fontSize: 20, paddingBottom: 20 }}>
                С заботой о ваших родных и близких
            </Typography>
            <Steps current={2}>
                <Step title='Register' description='Вы уже зарегистрировались' icon={<UserOutlined />} />
                <Step title='Verification' description='Вы уже подтвердили свою почту' icon={<SolutionOutlined />} />
                <Step title='Pay' description='You need to pay, to continue using our app' icon={<LoadingOutlined />} />
                <Step title='Done' description='После оплаты у вас будет полный доступ к приложению Типуль' icon={<SmileOutlined />} />
            </Steps>
            <Divider plain />
            <Typography.Title className='center' style={{ fontSize: 30 }}>
                Возможности после покупки приложения
            </Typography.Title>
            <Image.PreviewGroup>
                <Carousel autoplay className='center blue'>
                    {data.map(({ key, text, image }) => (
                        <Row key={key}>
                            <Col className='center'>
                                <Image
                                    height={contentStyle.height}
                                    src={image}
                                />
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
            <Col className='center'>
                <Button type='default' shape='round' icon={<CheckOutlined />} size={'large'} >
                    Proceed buying 31 руб.
                </Button>
            </Col>
        </div>
    )
}


export default Buy
