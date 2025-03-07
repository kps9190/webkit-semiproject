import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Autocomplete from '@mui/material/Autocomplete';


const IncomeOutcome = () => {
    const [budget, setBudget] = useState(300000);
    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        // 백엔드에서 데이터를 받아오는 코드 (현재는 예시 데이터를 사용)
        const fetchTransactions = async () => {
            try {
                // 실제 API 요청이 들어갈 자리 (현재는 주석 처리)
                // const response = await fetch("https://your-api.com/transactions");
                // const data = await response.json();

                // 백엔드가 준비되지 않았으므로, 예시 데이터를 대신 사용
                const exampleData = [
                    { id: 1, date: "2022-01-30", type: "지출", category: "교통/차량", description: "버스비", amount: -4000 },
                    { id: 2, date: "2022-01-31", type: "수입", category: "용돈", description: "용돈", amount: 12000 },
                    { id: 3, date: "2022-02-06", type: "지출", category: "문화비", description: "서적구매", amount: -25000 },
                    { id: 4, date: "2022-02-18", type: "지출", category: "식비", description: "외식비", amount: -52000 },
                    { id: 5, date: "2022-02-20", type: "수입", category: "알바", description: "주말 알바", amount: 50000 },
                    { id: 6, date: "2022-03-01", type: "지출", category: "주거비", description: "월세", amount: -400000 },
                    { id: 7, date: "2022-03-03", type: "수입", category: "수당", description: "교통비 수당", amount: 30000 },
                    { id: 8, date: "2022-03-10", type: "지출", category: "식비", description: "편의점", amount: -15000 },
                    { id: 9, date: "2022-03-15", type: "지출", category: "교통/차량", description: "택시비", amount: -8000 },
                    { id: 10, date: "2022-03-18", type: "수입", category: "용돈", description: "용돈", amount: 10000 },
                    { id: 11, date: "2022-04-01", type: "지출", category: "의료비", description: "병원비", amount: -20000 },
                    { id: 12, date: "2022-04-05", type: "지출", category: "문화비", description: "영화 관람", amount: -15000 },
                    { id: 13, date: "2022-04-12", type: "수입", category: "알바", description: "주말 알바", amount: 55000 },
                    { id: 14, date: "2022-04-20", type: "지출", category: "쇼핑", description: "옷 구매", amount: -75000 },
                    { id: 15, date: "2022-04-22", type: "지출", category: "식비", description: "외식비", amount: -35000 },
                    { id: 16, date: "2022-05-02", type: "수입", category: "용돈", description: "용돈", amount: 12000 },
                    { id: 17, date: "2022-05-05", type: "지출", category: "문화비", description: "책 구입", amount: -23000 },
                    { id: 18, date: "2022-05-10", type: "지출", category: "여가/여행", description: "여행 경비", amount: -100000 },
                    { id: 19, date: "2022-05-12", type: "수입", category: "알바", description: "주말 알바", amount: 60000 },
                    { id: 20, date: "2022-05-15", type: "지출", category: "의료비", description: "약 구입", amount: -15000 },
                    { id: 21, date: "2022-06-01", type: "수입", category: "수당", description: "주말 알바", amount: 70000 },
                    { id: 22, date: "2022-06-03", type: "지출", category: "주거비", description: "관리비", amount: -100000 },
                    { id: 23, date: "2022-06-07", type: "지출", category: "교통/차량", description: "자동차 보험", amount: -150000 },
                    { id: 24, date: "2022-06-15", type: "지출", category: "취미/동호회", description: "취미용품 구입", amount: -20000 },
                    { id: 25, date: "2022-06-20", type: "수입", category: "용돈", description: "용돈", amount: 15000 },
                    { id: 26, date: "2022-07-01", type: "지출", category: "식비", description: "점심", amount: -7000 },
                    { id: 27, date: "2022-07-03", type: "수입", category: "용돈", description: "용돈", amount: 13000 },
                    { id: 28, date: "2022-07-10", type: "지출", category: "문화비", description: "영화 관람", amount: -20000 },
                    { id: 29, date: "2022-07-15", type: "지출", category: "쇼핑", description: "전자기기 구매", amount: -120000 },
                    { id: 30, date: "2022-07-20", type: "수입", category: "알바", description: "주말 알바", amount: 50000 },
                    { id: 31, date: "2022-08-01", type: "지출", category: "주거비", description: "월세", amount: -400000 },
                    { id: 32, date: "2022-08-10", type: "수입", category: "수당", description: "교통비 수당", amount: 30000 },
                    { id: 33, date: "2022-08-15", type: "지출", category: "교통/차량", description: "주유비", amount: -50000 },
                    { id: 34, date: "2022-08-20", type: "수입", category: "용돈", description: "용돈", amount: 15000 },
                    { id: 35, date: "2022-09-01", type: "지출", category: "문화비", description: "도서 구입", amount: -10000 },
                    { id: 36, date: "2022-09-10", type: "수입", category: "알바", description: "주말 알바", amount: 55000 },
                    { id: 37, date: "2022-09-15", type: "지출", category: "식비", description: "외식비", amount: -45000 },
                    { id: 38, date: "2022-09-20", type: "지출", category: "의료비", description: "치료비", amount: -30000 },
                    { id: 39, date: "2022-09-25", type: "수입", category: "용돈", description: "용돈", amount: 10000 },
                    { id: 40, date: "2022-10-01", type: "지출", category: "쇼핑", description: "의류 구매", amount: -80000 }
                ];
                setTransactions(exampleData);
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
        };
        fetchTransactions();
    }, []); // 빈 배열을 넣어 처음 마운트될 때만 실행되도록 설정

    const [open, setOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = transactions.filter(t => t.amount < 0).reduce((acc, curr) => acc + curr.amount, 0);
    const remainingBudget = budget + totalIncome + totalExpense;

    const handleBudgetChange = (event) => {
        setBudget(Number(event.target.value));
    };

    const handleAddTransaction = () => {
        if (isEditing) {
            setTransactions(transactions.map(t => t.id === currentTransaction.id ? currentTransaction : t));
        } else {
            setTransactions([...transactions, { ...currentTransaction, id: transactions.length + 1, amount: Number(currentTransaction.amount) }]);
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

    const handleDeleteTransaction = (id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const consumecategories = [
        { category: '교통비' },
        { category: '식비' },
        { category: '문화생활' },
        { category: '주거비' },            // 월세, 관리비, 공과금 등
        { category: '교육비' },            // 학원비, 교재비, 온라인 강의 등
        { category: '의료비' },            // 병원비, 약값, 건강검진 비용 등
        { category: '여가/여행' },         // 여행 경비, 레저 활동 비용 등
        { category: '쇼핑' },              // 의류, 전자기기, 가전제품 등
        { category: '취미/동호회' },       // 악기, 운동, 취미용품 구입 등
        { category: '보험' },              // 건강보험, 자동차보험, 생명보험 등
        { category: '저축/투자' },         // 예금, 주식, 펀드 등
        { category: '통신비' },            // 핸드폰 요금, 인터넷 요금 등
        { category: '반려동물' },          // 사료, 병원비, 용품 등
        { category: '아이들 용품' },       // 유아용품, 교육비 등
        { category: '자동차 유지비' },     // 연료비, 보험, 수리비 등
        { category: '기타' },              // 예기치 않은 비용 등
    ];

    const categoryoptions = {
        options: consumecategories.map((option) => option.category),
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box p={1} sx={{ minHeight: "100vh", minWidth: "100vh", overflow: "auto", position: "relative"}}>
                <Typography variant="h5" mb={2}>사용 내역</Typography>
                <Box mb={3}>
                    <Card sx={{ mb: 2, backgroundColor: "#d1c4e9" }} onClick={() => setIsEditingBudget(true)}>
                        <CardContent>
                            <Typography variant="h6">예산</Typography>
                            {isEditingBudget ? (
                                <TextField value={budget} onChange={handleBudgetChange} onBlur={() => setIsEditingBudget(false)} fullWidth variant="outlined" autoFocus />
                            ) : (
                                <Typography variant="h5">{budget.toLocaleString()}원</Typography>
                            )}
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, backgroundColor: "#bbdefb" }}>
                        <CardContent>
                            <Typography variant="h6">수입</Typography>
                            <Typography variant="h5">{totalIncome.toLocaleString()}원</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, backgroundColor: "#ffcdd2" }}>
                        <CardContent>
                            <Typography variant="h6">지출</Typography>
                            <Typography variant="h5">{Math.abs(totalExpense).toLocaleString()}원</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: "#c8e6c9" }}>
                        <CardContent>
                            <Typography variant="h6">남은 금액</Typography>
                            <Typography variant="h5">{remainingBudget.toLocaleString()}원</Typography>
                        </CardContent>
                    </Card>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">소비내역</Typography>
                    <Button variant="contained" startIcon={<Add />} onClick={() => { setCurrentTransaction({ date: "", type: "지출", category: "", description: "", amount: "" }); setOpen(true); }}>소비내역 추가</Button>
                </Box>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>{isEditing ? "내역 수정" : "내역 추가"}</DialogTitle>
                    <DialogContent>
                        <DatePicker
                            label="날짜"
                            value={currentTransaction?.date ? dayjs(currentTransaction.date) : null}
                            onChange={(newValue) => setCurrentTransaction({ ...currentTransaction, date: newValue ? newValue.format("YYYY-MM-DD") : "" })}
                            renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                        />
                        <Box display="flex" justify-content="space-between" alignItems="center" gap={1}>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    setCurrentTransaction((prev) => ({
                                        ...prev,
                                        amount: Math.abs(prev?.amount || 0), type: ("수입")
                                    }))
                                }
                            >+</Button>
                            <Button
                                variant="outlined"
                                value={currentTransaction?.type || "지출"}
                                onClick={() =>
                                    setCurrentTransaction((prev) => ({
                                        ...prev,
                                        amount: -Math.abs(prev?.amount || 0), type: ("지출")// 음수로 설정
                                    }))
                                }
                            >-</Button>

                            <TextField
                                label="금액"
                                fullWidth
                                margin="dense"
                                type="number"
                                value={currentTransaction?.amount || ""}
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
                            value={currentTransaction?.category || ""} // currentTransaction에서 category 값을 가져옴
                            clearOnEscape
                            onChange={(event, newValue) => {
                                setCurrentTransaction({ ...currentTransaction, category: newValue });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="카테고리"
                                    fullWidth
                                    margin="dense"
                                />
                            )}
                        />
                        <TextField label="설명" fullWidth margin="dense" value={currentTransaction?.description || ""} onChange={(e) => setCurrentTransaction({ ...currentTransaction, description: e.target.value })} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>취소</Button>
                        <Button onClick={handleAddTransaction} variant="contained">{isEditing ? "수정" : "추가"}</Button>
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
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.amount.toLocaleString()}원</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditTransaction(row)}><Edit /></IconButton>
                                        <IconButton onClick={() => handleDeleteTransaction(row.id)}><Delete /></IconButton>
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











