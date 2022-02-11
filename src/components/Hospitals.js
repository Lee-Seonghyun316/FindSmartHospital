import React, { useCallback, useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import { onAuthChange } from "../service/firebase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimneyMedical } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const desText = "병원정보를 확인하세요. ";

const Hospitals = () => {
  const navigate = useNavigate();
  const historyState = navigate?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [hospitals, setHospitals] = useState();
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState("");

  useEffect(() => {
    onAuthChange((user) => {
      if (user) {
        setUserId(user.displayName);
      } else {
        navigate("/");
      }
    });
  });

  const myHeaders = new Headers();
  myHeaders.append("Origin", "");
  myHeaders.append("X-Requested-With", "");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/B551182/rprtHospService/getRprtHospService?serviceKey=KFpltfvLCQrqqBhzue4pwPwMO3F75DdoemMKE0Oaqibiq1Ejx0FFTxaTiPtdfQ0zsze30RtPqon1pKifxQzEUw%3D%3D&pageNo=1&numOfRows=10",
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setHospitals(parseStr(data));
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const parseStr = (dataSet) => {
    const dataArr = new XMLParser().parseFromString(dataSet).children[1]
      .children[0].children;
    console.log(dataArr);
    if (dataArr) {
      return dataArr;
    } else return null;
  };

  const makeTable = useCallback(() => {
    console.log(hospitals[0].children[0].value, "hospitals");
    return (
      <HospitalsContainer>
        {hospitals.map(({ children }) => (
          <Hospital key={children[0].value}>
            <Hospital>
              <Title>
                <FontAwesomeIcon icon={faHouseChimneyMedical} />
                {children.length === 11
                  ? children[9].value
                  : children.length === 13
                  ? children[11].value
                  : children[13].value}
              </Title>
              PCR 검사여부:
              {children[2].value}
              <br />
              신속항원검사여부:
              {children[3].value}
              <Address>주소: {children[0].value}</Address>
              <Congestion>대기실 인원 : {`${10}명`}</Congestion>
            </Hospital>
          </Hospital>
        ))}
      </HospitalsContainer>
    );
  }, [hospitals]);
  return (
    <Container text={desText} logout={true}>
      <Wrap>
        <Reservation>
          <Des>
            <DesTitle>
              <FontAwesomeIcon icon={faLightbulb} />
              안내
            </DesTitle>
            동국대학교 스마트테스트베드 시스템에서 대기실의 인원을 iot 센서를
            이용해 측정중입니다.
          </Des>
          <Title>{userId}님의 예약내역</Title>
          {reservation === "" ? "예약 내역 없음" : reservation}
        </Reservation>
        {loading ? "loading..." : makeTable()}
      </Wrap>
    </Container>
  );
};

export default Hospitals;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
  }
`;

const Reservation = styled.div`
  margin: 40px;
`;

const Des = styled.div`
  gap: 10px;
  flex-direction: column;
  background-color: #f0eeee;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  color: grey;
  font-size: 15px;
  margin-bottom: 40px;
`;

const DesTitle = styled.div`
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.color.black};
  font-size: 16px;
  font-weight: 600;
`;

const HospitalsContainer = styled.div``;

const Hospital = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 20px;
`;
const Title = styled.h1`
  display: flex;
  gap: 10px;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Address = styled.p`
  color: grey;
`;
const Congestion = styled.div`
  background-color: ${({ theme }) => theme.color.lightGray};
  border-radius: 10px;
  padding: 8px;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
`;
