import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, FormHelperText } from "@mui/material/";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import crypto from 'crypto';

const theme = createTheme();
const address = "https://bitwise.ljlee37.com:8080";

export default function SignUp() {
  const navigate = useNavigate();
  // 입력 값 state변수에 
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 에러 메세지
  const [idError, setIdError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 유효성 체크
  const [valId, setValId] = useState(false);
  const [valNick, setValNick] = useState(false);
  const [valEmail, setValEmail] = useState(false);
  const [valPasswd, setValPasswd] = useState(false);

  // state값 변경
  const onChangeId = (event) => { setId(event.target.value); }
  const onChangeNick = (event) => { setNickname(event.target.value); }
  const onChangeEmail = (event) => { setEmail(event.target.value); }
  const onChangePassword = (event) => { setPassword(event.target.value); }
  const onClickShowPasswd = () => { setShowPassword(!showPassword); }

  // id 유효성 검사
  useEffect(() => {
    const idReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;
    if (!idReg.test(id)) {
      setIdError("숫자, 영문자를 모두 사용해서 8-16글자의 아이디를 만드세요!");
      setValId(false);
    } else {
      setIdError("");
      setValId(true);
    }
  }, [id]);

  // 닉네임 유효성 검사
  useEffect(() => {
    if (nickname.length < 2 || nickname.length > 16) {
      setNicknameError(`닉네임은 2글자 이상 16글자 이하여야 합니다. 현재 글자 수: ${nickname.length}`);
      setValNick(false);
    } else {
      setNicknameError("");
      setValNick(true);
    }
  }, [nickname]);

  // 이메일 유효성 검사
  useEffect(() => {
    // ex) naver.com
    const emailReg1 =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{3}$/;

    const emailReg2 =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,2}[.]{1}[A-Za-z]{2}$/; // ex) seoul.ac.kr

    if (!emailReg1.test(email) && !emailReg2.test(email)) {
      setEmailError("ex) bitwise123@naver.com 또는 react123@bitwise.ac.kr");
      setValEmail(false);
    } else {
      setEmailError("");
      setValEmail(true);
    }
  }, [email]);

  // 비번 유효성 검사
  useEffect(() => {
    const passwordReg =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*?+=-])(?=.*[0-9]).{10,16}$/;
    if (!passwordReg.test(password)) {
      setPasswordError(
        "숫자, 영문자, 특수문자를 모두 사용해서 10~16글자의 비밀번호를 만드세요!"
      );
      setValPasswd(false);
    } else {
      setPasswordError("");
      setValPasswd(true);
    }
  }, [password]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 입력 값 사라지는거 방지
    if (valId && valNick && valEmail && valPasswd) {
      const hashpasswd = crypto.createHash('sha256').update(password).digest('base64');
      console.log(hashpasswd);
      try {
        // db에 있는 데이터와 중복체크 먼저
        const responseEmail = await axios.post(address + "/checkDuplicated/email",
          {
            email: email,
          }
        );
        console.log(responseEmail, responseEmail.data, "isDuplicatedEmail");
        const uniqueEmail = !responseEmail.data.isDuplicated;
        if (!uniqueEmail) {
          // alert(`중복된 이메일`);
          setEmailError("중복된 이메일입니다. 새로운 이메일을 입력해주세요!");
          setValEmail(false);
        }

        const responseNick = await axios.post(address + "/checkDuplicated/nickname",
          {
            nickname: nickname,
          }
        );
        console.log(responseNick, responseNick.data, "isDuplicatedNick");
        const uniqueNick = !responseNick.data.isDuplicated;
        if (!uniqueNick) {
          setNicknameError("중복된 닉네임입니다!");
          setValNick(false);
        }

        const responseId = await axios.post(address + "/checkDuplicated/user_id",
          {
            user_id: id,
          }
        );
        console.log(responseId, responseId.data, "isDuplicatedId");
        const uniqueId = !responseId.data.isDuplicated;
        if (!uniqueId) {
          setIdError("중복된 아이디입니다!");
          setValId(false);
        }

        // db에 중복된 데이터가 없으면 db에 가입정보 전송
        if (uniqueEmail && uniqueNick && uniqueId) {
          const response = await axios.post(address + "/register",
            {
              user_id: id,
              nickname: nickname,
              email: email,
              password: hashpasswd,
            }
          );
          console.log(response, "가입성공");
          navigate("/");
        } else {
          alert("이미 있는 계정의 정보입니다. ");
          console.log("이미 있는 계정의 정보입니다.");
        }

      } catch (error) {
        console.error("console.error(error);", error);
        console.log("console.log(error)", error);
        alert(error, "에러 발생!");

      }
    } else { alert(`규격에 맞게 작성해주세요!`); }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Bitwise
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} /*레이아웃을 결정하는 property*/>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-id"
                  name="ID"
                  required // 필수
                  fullWidth
                  id="id"
                  label="ID" // 버튼 위에 뜨는 내용
                  helperText={idError} // 버튼 밑에 뜨는 내용
                  error={!valId}
                  value={id}
                  onChange={onChangeId}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-nickname"
                  name="nickname"
                  required // 필수
                  fullWidth
                  id="nickname"
                  label="Nick Name" // 버튼 위에 뜨는 내용
                  helperText={nicknameError} // 버튼 밑에 뜨는 내용
                  error={!valNick} // true일 때 빨간색
                  value={nickname}
                  onChange={onChangeNick}

                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  helperText={emailError}
                  name="email"
                  // error={emailError !== "" || false}
                  error={!valEmail}
                  autoComplete="email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField // input에 해당함
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  helperText={passwordError} // 버튼 밑에 뜨는 내용
                  error={!valPasswd}
                  onChange={onChangePassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={onClickShowPasswd}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid xs={12}>
                <Link
                  href="/Agree"></Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={onSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              가입하기
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/signin"
                  variant="body2"
                /* onClick={() => {
                  navigate("/SignIn");
                }} */
                >
                  계정이 있으신가요? 로그인 하러가기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
}
