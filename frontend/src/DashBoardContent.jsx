import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Layout, Badge, Calendar } from 'antd';
import { Pie } from '@ant-design/plots';
import axiosInstance from './axiosInstance';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardContent = () => {
    const budget = 300000;
    const [transactions, setTransactions] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axiosInstance.get(`/transaction`);
                console.log('가져온 데이터:', response.data);

                // 배열인지 확인 후 설정
                if (response.data && Array.isArray(response.data.ret)) {
                    setTransactions(response.data.ret);
                } else {
                    console.error('예상과 다른 응답 형식:', response.data);
                    setTransactions([]); // 안전하게 빈 배열 설정
                }
            } catch (error) {
                console.error('데이터를 불러오는 중 오류 발생:', error);
                setTransactions([]); // 오류 발생 시에도 빈 배열로 설정
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
    console.log(income, outcome, remains);

    const getListData = (value) => {
        const dateStr = value.format('YYYY-MM-DD'); // 현재 렌더링하는 날짜
        const listData = transactions
            .filter((t) => t.date.startsWith(dateStr)) // 해당 날짜의 거래 내역 필터링
            .map((t) => ({
                type: t.amount < 0 ? 'error' : 'success', // 지출(red) / 수입(green)
                content: `${t.category}: ${Math.abs(t.amount).toLocaleString()}원`,
            }));

        return listData;
    };
    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const OutcomePie = () => {
        const [data, setData] = useState([]);

        useEffect(() => {
            const fetchCategoryData = async () => {
                try {
                    const response = await axiosInstance.get(`/transaction/expense`);
                    console.log('카테고리별 지출 데이터:', response.data);

                    // API 응답 데이터를 Pie 차트 형식으로 변환
                    const formattedData = response.data.ret.map((item) => ({
                        category: item.category,
                        amount: Math.abs(item.amount), // 지출이므로 절댓값 사용
                    }));

                    setData(formattedData);
                } catch (error) {
                    console.error('지출 데이터 가져오기 실패:', error);
                }
            };

            fetchCategoryData();
        }, []);

        const config = {
            data, // API에서 받아온 데이터 반영
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
                        text: `총 지출\n${data.reduce((acc, cur) => acc + cur.amount, 0).toLocaleString()}원`,
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
            <ul className="events" style={{ padding: 0 }}>
                {listData.map((item, index) => (
                    <li key={index} style={{ listStyle: 'none' }}>
                        <Badge status={item.type} text={item.content} />
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

    return user && Object.keys(user).length !== 0 ? (
        <Layout style={{ height: '100%', width: '100%' }}>
            <Layout.Header style={{ color: 'white', textAlign: 'left', fontSize: '1.5rem' }}>Dashboard</Layout.Header>
            <Layout.Content>
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
                            varient={'bordered'}
                        >
                            {income.toLocaleString()}원
                        </Card>
                    </Col>
                    <Col flex={1}>
                        <Card
                            style={{ background: '#ffc107', color: 'black', textAlign: 'center' }}
                            title="지출"
                            variant="filled"
                        >
                            {outcome.toLocaleString()}원
                        </Card>
                    </Col>
                    <Col flex={1}>
                        <Card
                            style={{ background: '#e78493', color: 'white', textAlign: 'center' }}
                            title="총 예산"
                            variant="outlined"
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
                        <Card title="카테고리별 지출 내역" variant="outlined" style={{ textAlign: 'center' }}>
                            <OutcomePie />
                        </Card>
                    </Col>
                    <Col flex="1 1 50%">
                        <Card title="일자별 지출 내역" variant="outlined" style={{ textAlign: 'center' }}>
                            <Calendar cellRender={cellRender} />;
                        </Card>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    ) : (
        (navigate('/login'), null)
    ); // navigate 실행 후 null 반환
};

export default DashboardContent;
