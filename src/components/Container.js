import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { googleSignOut } from "../service/firebase";

const Container = ({ children, text, logout }) => {
  const onLogout = () => {
    googleSignOut();
  };
  return (
    <Wrap>
      <Nav>
        <FontAwesomeIcon icon={faHospital} />
        FindSmartHospital
        {logout && <Button onClick={onLogout}>로그아웃</Button>}
      </Nav>
      <Des>{text}</Des>
      <Content>{children}</Content>
    </Wrap>
  );
};

export default Container;

const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.color.orange};
  font-weight: 700;
  padding: 15px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.color.orange};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 10px;
  padding: 3px 10px;
  position: absolute;
  right: 15px;
`;

const Des = styled.div`
  background-color: ${({ theme }) => theme.color.darkOrange};
  color: ${({ theme }) => theme.color.white};
  font-weight: 500;
  padding: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  background-color: ${({ theme }) => theme.color.lightOrange};
  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 30px;
    overflow: hidden;
  }
`;
