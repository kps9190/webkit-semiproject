import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box p={1} sx={{ minHeight: "80vh", minWidth: "80vh" }}>
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
                        <TextField label="유형" fullWidth margin="dense" value={currentTransaction?.type || ""} onChange={(e) => setCurrentTransaction({ ...currentTransaction, type: e.target.value })} />
                        <TextField label="카테고리" fullWidth margin="dense" value={currentTransaction?.category || ""} onChange={(e) => setCurrentTransaction({ ...currentTransaction, category: e.target.value })} />
                        <TextField label="설명" fullWidth margin="dense" value={currentTransaction?.description || ""} onChange={(e) => setCurrentTransaction({ ...currentTransaction, description: e.target.value })} />
                        <TextField label="금액" fullWidth margin="dense" type="number" value={currentTransaction?.amount || ""} onChange={(e) => setCurrentTransaction({ ...currentTransaction, amount: Number(e.target.value) })} />
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











