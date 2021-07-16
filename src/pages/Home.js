import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { Form, Button, Overlay, Tooltip } from "react-bootstrap";

function Home(props) {
  const [typeUnset, setTypeUnset] = useState(true);
  const [showYearAlert, setShowYearAlert] = useState(false);
  const [showTypeAlert, setShowTypeAlert] = useState(false);
  const [showMakeAlert, setShowMakeAlert] = useState(false);
  const yearTarget = useRef(null);
  const typeTarget = useRef(null);
  const makeTarget = useRef(null);

  const invalidYearMsg = `Number between ${props.yearLimit.MIN}-${props.yearLimit.MAX}`;
  const invalidMakeMsg = `Select a car make`;
  const invalidTypeMsg = `Select a car type`;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.searchCriteria.make === "") {
      showAlert(setShowMakeAlert);
    } else {
      props.history.push("/results");
    }
  };

  const setMakeHandler = (event) => {
    const makeName = event.target.value;
    setTypeUnset(true);
    props.searchSetter({
      ...props.searchCriteria,
      make: makeName,
      type: "",
    });
    if (makeName !== "") {
      props.getAllTypes(makeName);
    }
  };

  const setTypeHandler = (event) => {
    const typeName = event.target.value;
    setTypeUnset(false);
    props.searchSetter({
      ...props.searchCriteria,
      type: typeName,
    });
  };

  const yearValidator = (event) => {
    const year = event.target.value;
    if (year !== '' && (year < props.yearLimit.MIN || year > props.yearLimit.MAX)) {
      showAlert(setShowYearAlert);
      event.target.value = '';
    } else {
      props.searchSetter({
        ...props.searchCriteria,
        year: event.target.value,
      });
    }
  };

  const showAlert = (setShow) => {
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  }

  useEffect(() => {
    props.searchSetter({
      type: "",
      make: "",
      year: "",
    });
    props.getAllMakes();// eslint-disable-next-line
  }, []);

  return (
    <Layout title="Home Page" height='100vh'>
      <div
        className={styles.heroBg}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 0.9) 100%), url("/assets/images/cars_museum.jpg")`,
        }}
      />
      <Form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <Form.Control ref={makeTarget} as="select" onChange={setMakeHandler}>
            <option value="">Car Make</option>
            {props.allMakes.length > 0 &&
              props.allMakes.map((make, index) => {
                return (
                  <option key={index} value={make.Make_Name}>
                    {make.Make_Name}
                  </option>
                );
              })}
          </Form.Control>
        </div>
        <div className={styles.inputWrapper}>
          <Form.Control ref={typeTarget} as="select" onChange={setTypeHandler}>
            <option value="" selected={typeUnset}>
              Car Type
            </option>
            {props.types.length > 0 &&
              props.types.map((type, index) => {
                return (
                  <option key={index} value={type.VehicleTypeName}>
                    {type.VehicleTypeName}
                  </option>
                );
              })}
          </Form.Control>
        </div>
        <div className={styles.inputWrapper}>
          <Form.Control ref={yearTarget} placeholder="Car Year" onBlur={yearValidator} />
        </div>
        <Button type="submit" variant='danger'>Search</Button>
        <Overlay target={yearTarget.current} show={showYearAlert} onHide={() => setShowYearAlert(false)} placement="top" >
          {(props) => (
            <Tooltip id="invalidYearAlert" {...props}>
              {invalidYearMsg}
            </Tooltip>
          )}
        </Overlay>
        <Overlay target={typeTarget.current} show={showTypeAlert} onHide={() => setShowTypeAlert(false)} placement="top" >
          {(props) => (
            <Tooltip id="invalidTypeAlert" {...props}>
              {invalidTypeMsg}
            </Tooltip>
          )}
        </Overlay>
        <Overlay target={makeTarget.current} show={showMakeAlert} onHide={() => setShowMakeAlert(false)} placement="top" >
          {(props) => (
            <Tooltip id="invalidMakeAlert" {...props}>
              {invalidMakeMsg}
            </Tooltip>
          )}
        </Overlay>
      </Form>
    </Layout>
  );
}

export default withRouter(Home);
