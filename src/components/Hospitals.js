import {
  getDatabase,
  ref,
  set,
  remove,
  onValue,
  off,
  get,
} from "firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import { onAuthChange } from "../service/firebase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimneyMedical } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import ScaleLoader from "react-spinners/ScaleLoader";
const desText = "병원정보를 확인하세요. ";

const Hospitals = () => {
  const navigate = useNavigate();
  const historyState = navigate?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [hospitals, setHospitals] = useState();
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState("");
  // const [cnt, setCnt] = useState(0);
  let countPeople = 0;

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
    console.log(new XMLParser().parseFromString(dataSet));
    if (dataArr) {
      return dataArr;
    } else return null;
  };

  useEffect(() => {
    const db = getDatabase();
    const hospital_code =
      "JDQ4MTAxMiM1MSMkMiMkMCMkMDAkNDgxOTYxIzMxIyQxIyQzIyQxMyQyNjEwMDIjNjEjJDEjJDgjJDgz";

    const dbref = ref(db, `hospital_code/${hospital_code}`);
    get(dbref).then((snap) => {
      const counts = [];
      for (const i in snap.val()) {
        counts.push(snap.val()[i].count);
      }
      countPeople = counts[counts.length - 1];
    });
  });

  const makeTable = useCallback(() => {
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
                <Button
                  onClick={() => {
                    alert(
                      "해당 병원으로 예약되었습니다. (1개의 병원만 예약가능)"
                    );
                    setReservation(
                      children.length === 11
                        ? children[9].value
                        : children.length === 13
                        ? children[11].value
                        : children[13].value
                    );
                  }}
                >
                  예약하기
                </Button>
              </Title>
              PCR 검사여부:
              {children[2].value}
              <br />
              신속항원검사여부:
              {children[3].value}
              <Address>주소: {children[0].value}</Address>
              <Congestion>대기실 인원 : {`${countPeople++}명`}</Congestion>
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
        {loading ? (
          <LoadingContainer>
            loading...
            <br />
            <ScaleLoader height="160" width="32" color="#f27119" radius="8" />
          </LoadingContainer>
        ) : (
          makeTable()
        )}
      </Wrap>
    </Container>
  );
};

export default Hospitals;

const LoadingContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.orange};
  font-weight: 600;
  font-size: 2rem;
  padding: 40px 0;
`;

const Wrap = styled.div`
  position: relative;
  margin-top: 100px;
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Reservation = styled.div`
  position: fixed;
  top: 120px;
  right: 30px;
  padding: 20px;
  width: 450px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  background-color: ${({ theme }) => theme.color.white};
  @media ${({ theme }) => theme.device.tablet} {
    position: initial;
    width: 90%;
  }
`;

const Des = styled.div`
  gap: 10px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.lightGray};
  border-radius: 10px;
  padding: 20px;
  display: flex;
  color: gray;
  font-size: 15px;
  margin-bottom: 40px;
`;

const DesTitle = styled.div`
  display: flex;
  gap: 10px;
  font-size: 17px;
  font-weight: 700;
  color: black;
`;

const HospitalsContainer = styled.div`
  width: 50%;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const Hospital = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 20px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.color.darkOrange};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 10px;
  padding: 3px 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  display: flex;
  gap: 10px;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
  align-items: center;
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
