import styled from "styled-components";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography"; // 텍스트 font를 지정할수 있게함
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import crypto from 'crypto';
import { useCookies } from 'react-cookie';



const theme = createTheme();

function SignIn() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user_id']); // 쿠키 훅 
  const address = "https://bitwise.ljlee37.com:8080"; // "https://bitwise.ljlee37.com:8080"
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget); 
    const hashpasswd = crypto.createHash('sha256').update(data.get("password")).digest('base64');
    console.log({
      id: data.get("id"),
      password: data.get("password"),
    });
    try {
      // await는 async 함수 안에서만 사용가능
      const response = await axios.post(address + "/login",
        {
          user_id: data.get("id"),
          password: hashpasswd,
        },
        {withCredentials: true} // 쿠키 cors 통신 설정, 서버도 같이 처리해줘야함
      );
      console.log(response);
      console.log(response.data);
      console.log(cookies);
      console.log(cookies.id);
      console.log(cookies.user_id);
      console.log("!undefined", !undefined);
      // setCookie('user_id', cookies.id);// 쿠키에 토큰 저장
      // console.log(cookies);
      // console.log(response.json());
      const isLogin = response.data.loginSuccess;
      // if (response.data.description !== undefinded)
      if(isLogin){ 
        // alert("로그인 성공");
        alert(document.cookie);
        console.log(document.cookie);
        navigate("/images");
      }
      else{alert("로그인 실패");}
    } catch (error) {
      console.error(error);
      alert("로그인 실패!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box // div 같은 느낌
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
            }} /* 구글 우상단에 있는 profile 사진같은 css 효과를 줄 수 있는 컴포넌트*/
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5" /* h1 태그로 감싼다 디자인은 h5 태그, 텍스트 설정을 해줄 수 있는 컴포넌트 */
          >
            Bitwise
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required // 필수 입력
              fullWidth
              id="id"
              label="ID" // 보이는 내용
              name="id"
              autoComplete="id"
              autoFocus // 처음에 자동으로 커서 이동
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained" // 모양 결정, 색이꽉찬
              sx={{ mt: 3, mb: 2 }} // 간단한 css, margintop, bottom
            >
              로그인
            </Button>

            <Grid container /* container가 있는게 행*/>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                /* onClick={() => {
                  navigate("/");
                }} */
                >
                  {"계정이 없으신가요? 회원가입 하러 가기"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;


