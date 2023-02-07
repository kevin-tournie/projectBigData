import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Title = styled.div`
  background-image: linear-gradient(
    90deg,
    rgba(208, 205, 41, 1) 0%,
    rgba(200, 29, 30, 1) 100%
  );
  font-size: 70px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0px 20px 50px 20px;

  text-align: center;
`;

export const WrapperTextFieldsAndButton = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: 300px;
`;

export const WrapperTermsAndConditions = styled.p`
  font-size: 12px;
  color: #3c76d2;
  text-align: center;
`;

export const WrapperNoAccount = styled.div`
  color: #3c76d2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const WrapperLink = styled(Link)`
  text-decoration: none;
  text-decoration-color: none;
  color: #1a4282;
  font-weight: semi;
`;

export const WrapperErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  text-align: center;
`;
