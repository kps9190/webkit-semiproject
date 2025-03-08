import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Layout, Badge, Calendar } from 'antd';
import { Pie } from '@ant-design/plots';
import { AuthContext } from './member/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const DashboardContent = () => {
    const budget = 300000;
    const [transactions, setTransactions] = useState([]);
    const { user, loginAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const exampleData = [
                    {
                        id: 1,
                        date: '2022-01-30',
                        type: '지출',
                        category: '교통/차량',
                        description: '버스비',
                        amount: -4000,
                    },
                    { id: 2, date: '2022-01-31', type: '수입', category: '용돈', description: '용돈', amount: 12000 },
                    {
                        id: 3,
                        date: '2022-02-06',
                        type: '지출',
                        category: '문화비',
                        description: '서적구매',
                        amount: -25000,
                    },
                    {
                        id: 4,
                        date: '2022-02-18',
                        type: '지출',
                        category: '식비',
                        description: '외식비',
                        amount: -52000,
                    },
                    {
                        id: 5,
                        date: '2022-02-20',
                        type: '수입',
                        category: '알바',
                        description: '주말 알바',
                        amount: 50000,
                    },
                    {
                        id: 6,
                        date: '2022-03-01',
                        type: '지출',
                        category: '주거비',
                        description: '월세',
                        amount: -400000,
                    },
                    {
                        id: 7,
                        date: '2022-03-03',
                        type: '수입',
                        category: '수당',
                        description: '교통비 수당',
                        amount: 30000,
                    },
                    {
                        id: 8,
                        date: '2022-03-10',
                        type: '지출',
                        category: '식비',
                        description: '편의점',
                        amount: -15000,
                    },
                    {
                        id: 9,
                        date: '2022-03-15',
                        type: '지출',
                        category: '교통/차량',
                        description: '택시비',
                        amount: -8000,
                    },
                    { id: 10, date: '2022-03-18', type: '수입', category: '용돈', description: '용돈', amount: 10000 },
                    {
                        id: 11,
                        date: '2022-04-01',
                        type: '지출',
                        category: '의료비',
                        description: '병원비',
                        amount: -20000,
                    },
                    {
                        id: 12,
                        date: '2022-04-05',
                        type: '지출',
                        category: '문화비',
                        description: '영화 관람',
                        amount: -15000,
                    },
                    {
                        id: 13,
                        date: '2022-04-12',
                        type: '수입',
                        category: '알바',
                        description: '주말 알바',
                        amount: 55000,
                    },
                    {
                        id: 14,
                        date: '2022-04-20',
                        type: '지출',
                        category: '쇼핑',
                        description: '옷 구매',
                        amount: -75000,
                    },
                    {
                        id: 15,
                        date: '2022-04-22',
                        type: '지출',
                        category: '식비',
                        description: '외식비',
                        amount: -35000,
                    },
                    { id: 16, date: '2022-05-02', type: '수입', category: '용돈', description: '용돈', amount: 12000 },
                    {
                        id: 17,
                        date: '2022-05-05',
                        type: '지출',
                        category: '문화비',
                        description: '책 구입',
                        amount: -23000,
                    },
                    {
                        id: 18,
                        date: '2022-05-10',
                        type: '지출',
                        category: '여가/여행',
                        description: '여행 경비',
                        amount: -100000,
                    },
                    {
                        id: 19,
                        date: '2022-05-12',
                        type: '수입',
                        category: '알바',
                        description: '주말 알바',
                        amount: 60000,
                    },
                    {
                        id: 20,
                        date: '2022-05-15',
                        type: '지출',
                        category: '의료비',
                        description: '약 구입',
                        amount: -15000,
                    },
                    {
                        id: 21,
                        date: '2022-06-01',
                        type: '수입',
                        category: '수당',
                        description: '주말 알바',
                        amount: 70000,
                    },
                    {
                        id: 22,
                        date: '2022-06-03',
                        type: '지출',
                        category: '주거비',
                        description: '관리비',
                        amount: -100000,
                    },
                    {
                        id: 23,
                        date: '2022-06-07',
                        type: '지출',
                        category: '교통/차량',
                        description: '자동차 보험',
                        amount: -150000,
                    },
                    {
                        id: 24,
                        date: '2022-06-15',
                        type: '지출',
                        category: '취미/동호회',
                        description: '취미용품 구입',
                        amount: -20000,
                    },
                    { id: 25, date: '2022-06-20', type: '수입', category: '용돈', description: '용돈', amount: 15000 },
                    { id: 26, date: '2022-07-01', type: '지출', category: '식비', description: '점심', amount: -7000 },
                    { id: 27, date: '2022-07-03', type: '수입', category: '용돈', description: '용돈', amount: 13000 },
                    {
                        id: 28,
                        date: '2022-07-10',
                        type: '지출',
                        category: '문화비',
                        description: '영화 관람',
                        amount: -20000,
                    },
                    {
                        id: 29,
                        date: '2022-07-15',
                        type: '지출',
                        category: '쇼핑',
                        description: '전자기기 구매',
                        amount: -120000,
                    },
                    {
                        id: 30,
                        date: '2022-07-20',
                        type: '수입',
                        category: '알바',
                        description: '주말 알바',
                        amount: 50000,
                    },
                    {
                        id: 31,
                        date: '2022-08-01',
                        type: '지출',
                        category: '주거비',
                        description: '월세',
                        amount: -400000,
                    },
                    {
                        id: 32,
                        date: '2022-08-10',
                        type: '수입',
                        category: '수당',
                        description: '교통비 수당',
                        amount: 30000,
                    },
                    {
                        id: 33,
                        date: '2022-08-15',
                        type: '지출',
                        category: '교통/차량',
                        description: '주유비',
                        amount: -50000,
                    },
                    { id: 34, date: '2022-08-20', type: '수입', category: '용돈', description: '용돈', amount: 15000 },
                    {
                        id: 35,
                        date: '2022-09-01',
                        type: '지출',
                        category: '문화비',
                        description: '도서 구입',
                        amount: -10000,
                    },
                    {
                        id: 36,
                        date: '2022-09-10',
                        type: '수입',
                        category: '알바',
                        description: '주말 알바',
                        amount: 55000,
                    },
                    {
                        id: 37,
                        date: '2022-09-15',
                        type: '지출',
                        category: '식비',
                        description: '외식비',
                        amount: -45000,
                    },
                    {
                        id: 38,
                        date: '2022-09-20',
                        type: '지출',
                        category: '의료비',
                        description: '치료비',
                        amount: -30000,
                    },
                    { id: 39, date: '2022-09-25', type: '수입', category: '용돈', description: '용돈', amount: 10000 },
                    {
                        id: 40,
                        date: '2022-10-01',
                        type: '지출',
                        category: '쇼핑',
                        description: '의류 구매',
                        amount: -80000,
                    },
                ];
                setTransactions(exampleData);
            } catch (error) {
                console.error('데이터를 불러오는 중 오류 발생:', error);
            }
        };
        fetchTransactions();
    }, []);

    const income =
        transactions.length > 0
            ? transactions.filter((t) => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0)
            : 0;
    const outcome =
        transactions.length > 0
            ? transactions.filter((t) => t.amount < 0).reduce((acc, curr) => acc + curr.amount, 0)
            : 0;
    const remains = budget + income + outcome;

    const getListData = (value) => {
        let listData = []; // Specify the type of listData
        switch (value.date()) {
            case 8:
                listData = [
                    {
                        type: 'warning',
                        content: 'This is warning event.',
                    },
                    {
                        type: 'success',
                        content: 'This is usual event.',
                    },
                ];
                break;
            case 10:
                listData = [
                    {
                        type: 'warning',
                        content: 'This is warning event.',
                    },
                    {
                        type: 'success',
                        content: 'This is usual event.',
                    },
                    {
                        type: 'error',
                        content: 'This is error event.',
                    },
                ];
                break;
            case 15:
                listData = [
                    {
                        type: 'warning',
                        content: 'This is warning event',
                    },
                    {
                        type: 'success',
                        content: 'This is very long usual event......',
                    },
                    {
                        type: 'error',
                        content: 'This is error event 1.',
                    },
                    {
                        type: 'error',
                        content: 'This is error event 2.',
                    },
                    {
                        type: 'error',
                        content: 'This is error event 3.',
                    },
                    {
                        type: 'error',
                        content: 'This is error event 4.',
                    },
                ];
                break;
            default:
        }
        return listData || [];
    };
    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const OutcomePie = () => {
        const config = {
            data: [
                { category: '分类一', amount: 27 },
                { category: '分类二', amount: 25 },
                { category: '分类三', amount: 18 },
                { category: '分类四', amount: 15 },
                { category: '分类五', amount: 10 },
                { category: '其他', amount: 5 },
            ],
            angleField: 'amount',
            colorField: 'category',
            innerRadius: 0.6,
            label: {
                text: 'amount',
                style: {
                    fontWeight: 'bold',
                },
            },
            legend: {
                color: {
                    title: false,
                    position: 'right',
                    rowPadding: 5,
                },
            },
            annotations: [
                {
                    type: 'text',
                    style: {
                        text: '지출액\n' + outcome.toLocaleString() + '원',
                        x: '50%',
                        y: '50%',
                        textAlign: 'center',
                        fontSize: 40,
                        fontStyle: 'bold',
                    },
                },
            ],
        };
        return <Pie {...config} />;
    };

    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge
                            status={item.type}
                            text={item.content}
                        />
                    </li>
                ))}
            </ul>
        );
    };
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    if (!user) {
        return (
            <Box
                p={1}
                sx={{ minHeight: '100vh', minWidth: '100vh', overflow: 'auto', position: 'relative' }}
            >
                <Typography
                    variant="h5"
                    mb={2}
                >
                    로그인 후 사용 가능합니다.
                </Typography>
                {/* 로그인 페이지로 이동하는 버튼 */}
                <Button
                    variant="contained"
                    onClick={() => navigate('/Login')}
                    sx={{ marginTop: 2 }}
                >
                    로그인
                </Button>
            </Box>
        );
    }

    return (
        <Layout style={{ height: '100%', width: '100%' }}>
            <>
                <Layout.Header style={{ color: 'white', textAlign: 'left', fontSize: '1.5rem' }}>
                    Dashboard
                </Layout.Header>
                <Layout.Content>
                    <span>{user.name}님 안녕하세요!</span>
                    <Row
                        justify="space-evenly"
                        align="middle"
                        gutter={[16, 16]}
                        style={{ width: '100%', marginTop: '30px' }}
                    >
                        <Col flex={1}>
                            <Card
                                style={{ background: '#0092ff', color: 'white', textAlign: 'center' }}
                                title="수입"
                            >
                                {income.toLocaleString()}원
                            </Card>
                        </Col>
                        <Col flex={1}>
                            <Card
                                style={{ background: '#ffc107', color: 'black', textAlign: 'center' }}
                                title="지출"
                            >
                                {outcome.toLocaleString()}원
                            </Card>
                        </Col>
                        <Col flex={1}>
                            <Card
                                style={{ background: '#e78493', color: 'white', textAlign: 'center' }}
                                title="총 예산"
                            >
                                {remains.toLocaleString()}원
                            </Card>
                        </Col>
                    </Row>
                    <Row
                        justify="center"
                        align="middle"
                        gutter={[16, 16]}
                        wrap={false}
                        style={{ width: '100%', marginTop: '30px' }}
                    >
                        <Col flex="1 1 50%">
                            <Card
                                title="카테고리별 지출 내역"
                                style={{ textAlign: 'center' }}
                            >
                                <OutcomePie />
                            </Card>
                        </Col>
                        <Col flex="1 1 50%">
                            <Card
                                title="일자별 지출 내역"
                                style={{ textAlign: 'center' }}
                            >
                                <Calendar cellRender={cellRender} />
                            </Card>
                        </Col>
                    </Row>
                </Layout.Content>
            </>
        </Layout>
    );
};

export default DashboardContent;
