import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import axiosInstance from './axiosInstance';

const IncomeOutcome = () => {
    const [budget, setBudget] = useState(300000);
    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [transactions, setTransactions] = useState([]);
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

    const [open, setOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const totalIncome = transactions.filter((t) => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = transactions.filter((t) => t.amount < 0).reduce((acc, curr) => acc + curr.amount, 0);
    const remainingBudget = budget + totalIncome + totalExpense;

    const handleBudgetChange = (event) => {
        setBudget(Number(event.target.value));
    };

    const handleAddTransaction = async () => {
        if (isEditing) {
            try {
                // 기존 거래 수정 (PUT 요청)
                // db에 맞는 형식으로 수정
                const formattedDate = dayjs(currentTransaction.date).format('YYYY-MM-DD HH:mm:ss');

                const response = await axiosInstance.put(`/transaction/${currentTransaction.id}`, {
                    type: currentTransaction.type,
                    amount: Number(currentTransaction.amount),
                    category: currentTransaction.category,
                    description: currentTransaction.description,
                    date: formattedDate, //  변환된 날짜 적용
                });

                console.log('거래 수정 성공:', response.data);

                // UI에서도 수정 반영
                setTransactions(
                    transactions.map((t) =>
                        t.id === currentTransaction.id
                            ? { ...currentTransaction, amount: Number(currentTransaction.amount) }
                            : t
                    )
                );
            } catch (error) {
                console.error('거래 수정 실패:', error);
                alert('거래 수정에 실패했습니다.');
            }
        } else {
            try {
                const response = await axiosInstance.post('/transaction', {
                    type: currentTransaction.type,
                    amount: Number(currentTransaction.amount),
                    category: currentTransaction.category,
                    description: currentTransaction.description,
                    date: currentTransaction.date,
                });

                console.log('거래 추가 성공:', response.data);

                // 백엔드에서 받은 transactionId를 UI에도 반영
                const newTransaction = {
                    ...currentTransaction,
                    id: response.data.transactionId, // 백엔드에서 받은 ID
                    amount: Number(currentTransaction.amount),
                };

                // UI에도 새 거래 내역 추가
                setTransactions([...transactions, newTransaction]);

                // 입력 필드 초기화
                setCurrentTransaction(null);
                setOpen(false);
            } catch (error) {
                console.error('거래 추가 실패:', error);
            }
        }
        setOpen(false);
        setIsEditing(false);
        setCurrentTransaction(null);
    };

    const handleEditTransaction = (transaction) => {
        setCurrentTransaction(transaction);
        setIsEditing(true);
        setOpen(true);
    };

    const handleDeleteTransaction = async (id) => {
        try {
            const response = await axiosInstance.delete(`/transaction/${id}`);

            console.log('거래 삭제 성공:', response.data);

            // UI에서도 삭제 반영
            setTransactions(transactions.filter((t) => t.id !== id));
        } catch (error) {
            console.error('거래 삭제 실패:', error.response?.data?.message || error.message);
            alert('거래 내역 삭제에 실패했습니다.');
        }
    };

    const consumecategories = [
        { category: '교통비' },
        { category: '식비' },
        { category: '취미' },
        { category: '요금' },
        { category: '기타' },
        // { category: '문화생활' },
        // { category: '주거비' }, // 월세, 관리비, 공과금 등
        // { category: '교육비' }, // 학원비, 교재비, 온라인 강의 등
        // { category: '의료비' }, // 병원비, 약값, 건강검진 비용 등
        // { category: '여가/여행' }, // 여행 경비, 레저 활동 비용 등
        // { category: '쇼핑' }, // 의류, 전자기기, 가전제품 등
        // { category: '보험' }, // 건강보험, 자동차보험, 생명보험 등
        // { category: '저축/투자' }, // 예금, 주식, 펀드 등
        // { category: '통신비' }, // 핸드폰 요금, 인터넷 요금 등
        // { category: '반려동물' }, // 사료, 병원비, 용품 등
        // { category: '아이들 용품' }, // 유아용품, 교육비 등
        // { category: '자동차 유지비' }, // 연료비, 보험, 수리비 등
        // { category: '기타' }, // 예기치 않은 비용 등
    ];

    const categoryoptions = {
        options: consumecategories.map((option) => option.category),
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box p={1} sx={{ minHeight: '100vh', minWidth: '100vh', overflow: 'auto', position: 'relative' }}>
                <Typography variant="h5" mb={2}>
                    사용 내역
                </Typography>
                <Box mb={3}>
                    <Card sx={{ mb: 2, backgroundColor: '#d1c4e9' }} onClick={() => setIsEditingBudget(true)}>
                        <CardContent>
                            <Typography variant="h6">예산</Typography>
                            {isEditingBudget ? (
                                <TextField
                                    value={budget}
                                    onChange={handleBudgetChange}
                                    onBlur={() => setIsEditingBudget(false)}
                                    fullWidth
                                    variant="outlined"
                                    autoFocus
                                />
                            ) : (
                                <Typography variant="h5">{budget.toLocaleString()}원</Typography>
                            )}
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, backgroundColor: '#bbdefb' }}>
                        <CardContent>
                            <Typography variant="h6">수입</Typography>
                            <Typography variant="h5">{totalIncome.toLocaleString()}원</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, backgroundColor: '#ffcdd2' }}>
                        <CardContent>
                            <Typography variant="h6">지출</Typography>
                            <Typography variant="h5">{Math.abs(totalExpense).toLocaleString()}원</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: '#c8e6c9' }}>
                        <CardContent>
                            <Typography variant="h6">남은 금액</Typography>
                            <Typography variant="h5">{remainingBudget.toLocaleString()}원</Typography>
                        </CardContent>
                    </Card>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">소비내역</Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => {
                            setCurrentTransaction({
                                date: '',
                                type: '지출',
                                category: '',
                                description: '',
                                amount: '',
                            });
                            setOpen(true);
                        }}
                    >
                        소비내역 추가
                    </Button>
                </Box>
                <Dialog
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setCurrentTransaction(null);
                    }}
                >
                    <DialogTitle>{isEditing ? '내역 수정' : '내역 추가'}</DialogTitle>
                    <DialogContent>
                        <DatePicker
                            label="날짜"
                            value={currentTransaction?.date ? dayjs(currentTransaction.date) : null}
                            onChange={(newValue) =>
                                setCurrentTransaction({
                                    ...currentTransaction,
                                    date: newValue ? newValue.format('YYYY-MM-DD') : '',
                                })
                            }
                            renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                        />
                        <Box display="flex" justify-content="space-between" alignItems="center" gap={1}>
                            <Button
                                variant={currentTransaction?.type === '수입' ? 'contained' : 'outlined'}
                                color="primary"
                                onClick={() =>
                                    setCurrentTransaction({
                                        ...currentTransaction,
                                        amount: Math.abs(currentTransaction?.amount ?? 0), // ✅ 수입은 항상 양수
                                        type: '수입',
                                    })
                                }
                            >
                                +
                            </Button>
                            <Button
                                variant={currentTransaction?.type === '지출' ? 'contained' : 'outlined'}
                                color="secondary"
                                onClick={() =>
                                    setCurrentTransaction({
                                        ...currentTransaction,
                                        amount: -Math.abs(currentTransaction?.amount ?? 0), // ✅ 지출은 항상 음수
                                        type: '지출',
                                    })
                                }
                            >
                                -
                            </Button>
                            <TextField
                                label="금액"
                                fullWidth
                                margin="dense"
                                type="number"
                                value={currentTransaction?.amount || ''}
                                onChange={(e) =>
                                    setCurrentTransaction({
                                        ...currentTransaction,
                                        amount: Number(e.target.value),
                                    })
                                }
                            />
                        </Box>
                        <Autocomplete
                            {...categoryoptions}
                            id="Categories"
                            value={currentTransaction?.category || ''} // currentTransaction에서 category 값을 가져옴
                            clearOnEscape
                            onChange={(event, newValue) => {
                                setCurrentTransaction({ ...currentTransaction, category: newValue });
                            }}
                            renderInput={(params) => (
                                <TextField {...params} variant="standard" label="카테고리" fullWidth margin="dense" />
                            )}
                        />
                        <TextField
                            label="설명"
                            fullWidth
                            margin="dense"
                            value={currentTransaction?.description || ''}
                            onChange={(e) =>
                                setCurrentTransaction({ ...currentTransaction, description: e.target.value })
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>취소</Button>
                        <Button onClick={handleAddTransaction} variant="contained">
                            {isEditing ? '수정' : '추가'}
                        </Button>
                    </DialogActions>
                </Dialog>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>날짜</TableCell>
                                <TableCell>유형</TableCell>
                                <TableCell>카테고리</TableCell>
                                <TableCell>설명</TableCell>
                                <TableCell>금액</TableCell>
                                <TableCell>편집</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{dayjs(row.date).format('YYYY-MM-DD')}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.amount.toLocaleString()}원</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditTransaction(row)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteTransaction(row.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </LocalizationProvider>
    );
};

export default IncomeOutcome;
