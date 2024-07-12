import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import { SendEmailConfirmRequest, UserLoginRequest } from "../api/authApi";
import checkEmptyString from "@/shared/utils/CheckEmptyString";
import { useSearchParams } from "react-router-dom";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import PositionAwareButton from "@/shared/components/Button/PositionAwareButton";
import { useNavigate } from "react-router-dom";

const Container = styled.form`
  display: flex;
  min-width: 23rem;
  flex-direction: column;
  align-items: center;
  background-color: white;
  gap: 1.2rem;
  padding: 2rem 2.5rem;

  > h3 {
    font-size: 1.3rem;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  > label {
    letter-spacing: 1.5px;
    font-size: 14px;
  }

  & > input {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    height: 2rem;
    padding: 10px;
  }
`;

const RememberMe = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #d59c9c;
  border: 0;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;

  &:active {
    color: yellow;
  }
`;

const ErrorContainer = styled.div`
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  gap: 5px;
  width: 100%;

  > h5 {
    color: red;
    text-align: left;
    font-size: 13px;
  }
`;

const PositionAwareButtonCustom = styled(PositionAwareButton)`
  padding: 5px 0;
  border-radius: 5px;
  font-weight: 500;
`;

const SignUpSuggest = styled.div``;

const EMAIL_REGEX = /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z0-9]+$/;
const PASSWORD_REGEX = /^[A-Za-z0-9]{6,}$/;

export default function SignIn() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [emailConfirmSuccess, setEmailConfirmSuccess] = useState(false);
  const [emailConfirmFailure, setEmailConfirmFailure] = useState(false);

  const loginRequest = UserLoginRequest((response) => {
    if (response.status == 400) {
      setAccountError(true);
    }

    if (response.status == 200) {
      localStorage.setItem("remember", remember);

      if (remember == true) {
        localStorage.setItem("ACCESS_TOKEN", response.data);
        sessionStorage.removeItem("ACCESS_TOKEN");
      } else {
        sessionStorage.setItem("ACCESS_TOKEN", response.data);
        localStorage.removeItem("ACCESS_TOKEN");
      }

      navigate("/chat");
    }
  });

  const confirmRequest = SendEmailConfirmRequest(
    (successStatus) => {
      if (successStatus.status == 200) {
        setEmailConfirmSuccess(true);
        setMessage("Email confirmation success, you can login now");
        localStorage.removeItem("ACCESS_TOKEN");
      }
    },
    () => {
      setEmailConfirmFailure(true);
      setMessage("Failed to confirm your email");
    }
  );

  useEffect(() => {
    if (searchParams.get("token")) {
      localStorage.setItem("ACCESS_TOKEN", searchParams.get("token"));
      confirmRequest.mutate();
    }
  }, []);

  const onLogin = () => {
    if (checkEmptyString(email, password)) {
      setEmptyError(true);
      return;
    } else {
      setEmptyError(false);
    }

    let flag = true;

    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      flag = false;
    } else {
      setEmailError(false);
    }

    if (!PASSWORD_REGEX.test(password)) {
      setPasswordError(true);
      flag = false;
    } else {
      setPasswordError(false);
    }

    if (!flag) return;

    const data = new FormData();

    data.append("email", email);
    data.append("password", password);

    loginRequest.mutate(data);
  };

  return (
    <Container>
      {accountError && (
        <ErrorPopUp
          header={"Something went wrong"}
          message={"Wrong email or password"}
          action={() => setAccountError(false)}
        />
      )}
      {emailConfirmSuccess && (
        <SuccessPopUp
          header={"Congratulation"}
          message={message}
          action={() => setEmailConfirmSuccess(false)}
        />
      )}
      {emailConfirmFailure && (
        <ErrorPopUp
          header={"Sorry"}
          message={message}
          action={() => setEmailConfirmFailure(false)}
        />
      )}
      <h3>Sign in to your account</h3>
      <FormField>
        <label>Email</label>
        <input onChange={(ev) => setEmail(ev.target.value)} />
      </FormField>
      <FormField>
        <label>Password</label>
        <input onChange={(ev) => setPassword(ev.target.value)} type="password" />
      </FormField>
      <RememberMe>
        <input checked={remember} onChange={() => setRemember((prev) => !prev)} type="checkbox" />
        <span>Remember me</span>
      </RememberMe>
      <PositionAwareButtonCustom content={"Login"} action={onLogin} />
      <ErrorContainer>
        {emailError && <h5>Wrong email format</h5>}
        {passwordError && <h5>Password must be at least 6 characters</h5>}
        {emptyError && <h5>Please fill in all the field</h5>}
      </ErrorContainer>
      <SignUpSuggest>
        <span>New User?</span> <Link to={"/sign-up"}>Register</Link>{" "}
      </SignUpSuggest>
    </Container>
  );
}
