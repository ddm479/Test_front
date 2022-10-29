import React, { useState } from "react";
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

const address = "https://bitwise.ljlee37.com:8080";

const Wrapper = styled.div``;
function RemoveUser() {
    const user_id = "test";
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const onClickCheckBox = (event) => {
        setChecked(event.target.checked);
    }
    const removeUser = async () => {
        if(checked){
            try {
                // await는 async 함수 안에서만 사용가능
                const response = await axios.delete(address + "/removeAccount",
                    {
                        user_id: user_id,
                    },
                    { withCredentials: true } // 쿠키 cors 통신 설정, 서버도 같이 처리해줘야함
                );
                console.log(response);
                console.log(response.data);
    
                // console.log(response.json());
                const removeSuccess = response.data.removed;
                // if (response.data.description !== undefinded)
                if (removeSuccess) {
                    // alert("로그인 성공");
                    navigate("/");
                }
                else { alert("회원탈퇴 실패(else)"); }
            } catch (error) {
                console.error(error);
                alert("회원탈퇴 실패!(catch)");
            }
        } else{
            alert('회원탈퇴를 하려면 동의를 해야 합니다.')
        }
        
    }
    return (
        <Wrapper>
            <Typography variant="h5" gutterBottom>
                회원탈퇴 페이지
            </Typography>

            <Typography>
                회원탈퇴를 하더라도 bitwise는 이미지를 보관하고 사용한다. 민감한 정보가 포함된 사진은 삭제해주세요 라는 내용
            </Typography>
            <Typography>
                <input type="checkbox" checked={checked}
                    onClick={onClickCheckBox} /> 동의합니다
                {/* <Checkbox checked={checked}
                    onClick={onClickCheckBox} />동의합니다 */}
            </Typography>

            <Button variant="outlined" onClick={removeUser}>회원탈퇴하기</Button>
        </Wrapper>

    );
}
export default RemoveUser;
