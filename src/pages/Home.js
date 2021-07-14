import React from "react";
import { withRouter } from 'react-router-dom';
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { Form, Button } from "react-bootstrap";

function Home(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.history.push("/results");
  };
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
          <Form.Control as="select">
            <option>Car Make</option>
            <option>Audi</option>
            <option>Benz</option>
            <option>Ferrari</option>
            <option>Toyota</option>
          </Form.Control>
        </div>
        <div className={styles.inputWrapper}>
          <Form.Control as="select">
            <option>Car Model</option>
          </Form.Control>
        </div>
        <div className={styles.inputWrapper}>
          <Form.Control placeholder="Car Year" />
        </div>
        <Button type="submit">Search</Button>
      </Form>
    </Layout>
  );
}

export default withRouter(Home);