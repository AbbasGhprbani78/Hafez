import React, { useEffect, useState } from "react";
import styles from "./TtypeOfService.module.css";
import { Col } from "react-bootstrap";
import axios from "axios";
import InputCheckBox from "../InputChekBox/InputCheckBox";
export default function TypeOfService({ handleServiceChange, selectedServices }) {
  const [services, setServices] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getService = async () => {
      try {
        const res = await axios.get(`${apiUrl}/app/get-service-type/`);
        if (res.status === 200) {
          setServices(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getService();
  }, []);

  return (
    <>
      <p className={`${styles.title_item_form} mb-3`}>نوع خدمات </p>
      <div className={styles.options_services_wrappper}>
        {services?.map((service) => (
          <Col md={4} key={service.id}>
            <InputCheckBox
              value={service.id}
              text={service.name}
              onChange={() => handleServiceChange(service.id)}
              checked={selectedServices.includes(service.id)}
            />
          </Col>
        ))}
      </div>
    </>
  );
}
