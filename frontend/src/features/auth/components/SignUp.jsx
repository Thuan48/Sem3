import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import checkEmptyString from "@/shared/utils/CheckEmptyString";
import { RegisterRequest } from "../api/accountApi";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import PositionAwareButton from "@/shared/components/Button/PositionAwareButton";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { Navigate } from "react-router-dom";

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
  min-height: 2rem;
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

const SignInSuggest = styled.div``;

const EMAIL_REGEX = /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z0-9]+$/;
const PASSWORD_REGEX = /^[A-Za-z0-9]{6,}$/;
const PHONE_REGEX = /^[0-9]{7,}$/;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);

  const [accountError, setAccountError] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const registerRequest = RegisterRequest((response) => {
    if (response.status == 400) {
      setMessage(response.message);
      setAccountError(true);
    }

    if (response.status == 200) {
      setMessage(response.message);
      setAccountSuccess(true);
    }
  });

  const onClickRegister = () => {
    if (checkEmptyString(email, password, confirm, phone, dob)) {
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

    if (password !== confirm) {
      setPasswordConfirmError(true);
      flag = false;
    } else {
      setPasswordConfirmError(false);
    }

    if (!PHONE_REGEX.test(phone)) {
      setPhoneError(true);
      flag = false;
    } else {
      setPhoneError(false);
    }

    if (new Date(dob) >= Date.now()) {
      setDobError(true);
      flag = false;
    } else {
      setDobError(false);
    }

    if (flag == true) {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("PhoneNumber", phone);
      formData.append("DOBString", dob);

      registerRequest.mutate(formData);
    }
  };

  return (
    <Container>
      {registerRequest.isPending && <WaitingPopUp />}
      {accountError && <ErrorPopUp header={"Opps"} message={message} action={() => setAccountError(false)} />}
      {accountSuccess && (
        <SuccessPopUp
          header={"Congratulation! Please check your email for confirmation"}
          message={message}
          action={() => setAccountSuccess(false)}
        />
      )}
      <h3>Sign Up New Account</h3>
      <FormField>
        <label>Email</label>
        <input value={email} onChange={(ev) => setEmail(ev.target.value)} />
      </FormField>
      <FormField>
        <label>Password</label>
        <input value={password} onChange={(ev) => setPassword(ev.target.value)} type="password" />
      </FormField>
      <FormField>
        <label>Password Confirm</label>
        <input value={confirm} onChange={(ev) => setConfirm(ev.target.value)} type="password" />
      </FormField>
      <FormField>
        <label>Phone Number</label>
        <input value={phone} onChange={(ev) => setPhone(ev.target.value)} />
      </FormField>
      <FormField>
        <label>Date Of Birth</label>
        <input value={dob} onChange={(ev) => setDob(ev.target.value)} type="date" />
      </FormField>
      <PositionAwareButtonCustom content={"Sign Up"} action={onClickRegister} />
      <ErrorContainer>
        {emptyError && <h5>Please fill in all the value</h5>}
        {emailError && <h5>Wrong email format</h5>}
        {passwordError && <h5>Wrong password format</h5>}
        {passwordConfirmError && <h5>Wrong password confirm</h5>}
        {phoneError && <h5>Wrong phone format</h5>}
        {dobError && <h5>Date of birth shouldn't be in the future</h5>}
      </ErrorContainer>
      <SignInSuggest>
        <span>Already a user?</span> <Link to={"/sign-in"}>Sign in</Link>
      </SignInSuggest>
    </Container>
  );
}
