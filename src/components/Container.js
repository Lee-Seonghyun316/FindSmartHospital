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
      <Header>
        <Nav>
          <FontAwesomeIcon icon={faHospital} />
          FindSmartHospital
          {logout && <Button onClick={onLogout}>로그아웃</Button>}
        </Nav>
        <Des>{text}</Des>
      </Header>
      {children}
    </Wrap>
  );
};

export default Container;

const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Header = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.color.white};
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
