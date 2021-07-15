import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { Form, Button, Overlay, Tooltip } from "react-bootstrap";

function Home(props) {
  const [allMakes, setAllMakes] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeUnset, setTypeUnset] = useState(true);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const invalidYearMsg = `Set year between ${props.yearLimit.MIN}-${props.yearLimit.MAX}!`;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      props.searchAttributes.make !== "" &&
      props.searchAttributes.type !== "" &&
      props.searchAttributes.year !== ""
    ) {
      props.history.push("/results");
    }
  };

  const setMakeHandler = (event) => {
    // alert("Setting make to: " + event.target.value);
    const makeName = event.target.value;
    setTypeUnset(true);
    props.searchSetter({
      ...props.searchAttributes,
      make: makeName,
      type: "",
    });
    if (makeName !== "") {
      getAllTypes(makeName);
    }
  };

  const setTypeHandler = (event) => {
    const typeName = event.target.value;
    setTypeUnset(false);
    props.searchSetter({
      ...props.searchAttributes,
      type: typeName,
    });
  };

  const yearValidator = (event) => {
    const year = event.target.value;
    if (year < props.yearLimit.MIN || year > props.yearLimit.MAX) {
      setShow(true);
      setTimeout( () => setShow(false), 2000);
      // alert(
      //   `Set a valid year between ${props.yearLimit.MIN}-${props.yearLimit.MAX}!`
      // );
      event.target.value = "";
    } else {
      props.searchSetter({
        ...props.searchAttributes,
        year: event.target.value,
      });
    }
  };

  const getAllMakes = async () => {
    try {
      let apiUrl =
        "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json";
      console.log("getting all car makers...");
      const res = await axios.get(apiUrl);
      setAllMakes(res.data.Results);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllTypes = async (make) => {
    try {
      let apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${make}?format=json`;
      console.log(`getting all car types from ${make}...`);
      const res = await axios.get(apiUrl);
      setTypes(res.data.Results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    props.searchSetter({
      type: "",
      make: "",
      year: "",
    });
    getAllMakes();
  }, []);

  return (
    <Layout title="Home Page">
      <div
        className={styles.heroBg}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 0.9) 100%), url("/assets/images/cars_museum.jpg")`,
        }}
      />
      <Form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <Form.Control as="select" onChange={setMakeHandler}>
            <option value="">Car Make</option>
            {allMakes.length > 0 &&
              allMakes.map((make, index) => {
                return (
                  <option key={index} value={make.Make_Name}>
                    {make.Make_Name}
                  </option>
                );
              })}
          </Form.Control>
        </div>
        <div className={styles.inputWrapper}>
          <Form.Control as="select" onChange={setTypeHandler}>
            <option value="" selected={typeUnset}>
              Car Type
            </option>
            {types.length > 0 &&
              types.map((type, index) => {
                return (
                  <option key={index} value={type.VehicleTypeName}>
                    {type.VehicleTypeName}
                  </option>
                );
              })}
          </Form.Control>
        </div>
        <div className={styles.inputWrapper}>
          <Form.Control ref={target} placeholder="Car Year" onBlur={yearValidator} />
        </div>
        <Button type="submit" variant='danger'>Search</Button>
        <Overlay target={target.current} show={show} onHide={() => setShow(false)} placement="top" >
          {(props) => (
            <Tooltip id="invalidYearAlert" {...props}>
              {invalidYearMsg}
            </Tooltip>
          )}
        </Overlay>
      </Form>
    </Layout>
  );
}

export default withRouter(Home);
