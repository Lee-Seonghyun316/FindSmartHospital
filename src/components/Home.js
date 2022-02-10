import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import HospitalImg from "../img/hospital.png";
import { signInGoogle } from "../service/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const goHospitals = (userId) => {
    navigate(`/hospitals`, { state: { id: userId } });
  };
  const handleSignIn = () => {
    signInGoogle().then((result) => goHospitals(result.user.displayName));
  };

  return (
    <Wrap>
      <Nav>
        <FontAwesomeIcon icon={faHospital} />
        FindSmartHospital
      </Nav>
      <Des>iot 센서를 이용하여 병원별 혼잡도를 측정합니다. </Des>
      <Intro>
        <TextContainer>
          <Title>FindSmartHospital</Title>
          병원 혼잡도 및 코로나 검사 여부 정보까지
          <Button onClick={handleSignIn}>google 로그인</Button>
        </TextContainer>
        <ImgContainer>
          <Img src={HospitalImg} />
        </ImgContainer>
      </Intro>
    </Wrap>
  );
};

export default Home;

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

const Des = styled.div`
  background-color: ${({ theme }) => theme.color.darkOrange};
  color: ${({ theme }) => theme.color.white};
  font-weight: 500;
  padding: 10px;
`;

const Intro = styled.div`
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

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.color.white};
  font-size: 1.5rem;
  font-weight: 600;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.3rem;
  }
`;

const ImgContainer = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const Img = styled.img`
  @media ${({ theme }) => theme.device.tablet} {
    width: 500px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 10px 0;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 2rem;
  }
`;

const Button = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.darkOrange};
  font-size: 1.3rem;
  padding: 1.3rem;
  font-weight: 700;
  border-radius: 10px;
  margin: 40px 0;
  cursor: pointer;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 0.9rem;
    padding: 0.9rem;
  }
`;
