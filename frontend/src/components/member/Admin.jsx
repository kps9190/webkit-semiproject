import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
export default function Admin() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        let url = 'http://localhost:7777/api/users';
        try {
            const response = await axios.get(url);
            // console.log(response.data);
            setUsers(response.data);
        } catch (err) {
            console.log(err);
            alert('에러가 발생했습니다. ' + err);
        }
    };

    const deleteUser = async (id) => {
        const confiremd = window.confirm('정말로 삭제하시겠습니까?');
        if (!confiremd) return;

        let url = `http://localhost:7777/api/users/${id}`;
        try {
            await axios.delete(url);
            getUsers();
        } catch (err) {
            alert('에러 발생 ', err);
        }
    };

    const updateUser = async (id, name, email) => {
        const newName = window.prompt('수정할 Name을 입력해주세요', `${name}`);
        if (newName === null) return;
        const newEmail = window.prompt('수정할 Email을 입력해주세요', `${email}`);
        if (newEmail === null) return;
        try {
            const check_response = await axios.post('http://localhost:7777/api/users/duplex', {
                email: newEmail,
            });
            const data = check_response.data;
            console.log(data);
            if (data.result === 'no') {
                alert('중복된 Email입니다');
                return;
            }
            const update_response = await axios.put(`http://localhost:7777/api/users/${id}`, {
                name: newName,
                email: newEmail,
            });
            alert('수정되었습니다');
            getUsers();
        } catch (error) {
            alert('에러 ', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <h1>회원관리</h1>
            <Table
                striped
                bordred
                hover
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button
                                    className="btn btn-warning"
                                    onClick={() => updateUser(user.id, user.name, user.email)}
                                >
                                    수정
                                </Button>
                            </td>
                            <td>
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    삭제
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
