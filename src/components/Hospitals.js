import React, { useEffect, useState } from "react";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import { onAuthChange } from "../service/firebase";

const desText = "지역별 병원정보를 확인하세요. ";

const Hospitals = (props) => {
  const navigate = useNavigate();
  const historyState = navigate?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);

  useEffect(() => {
    onAuthChange((user) => {
      if (user) {
        setUserId(user.displayName);
      } else {
        navigate("/");
      }
    });
  });

  return (
    <Container text={desText} logout={true}>
      regionalHospitals
    </Container>
  );
};

export default Hospitals;
