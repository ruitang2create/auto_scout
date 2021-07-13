import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { Form, Button } from "react-bootstrap";

export default function Home(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Layout title="Home Page">
      <div
        className={styles.heroBg}
        style={{
          backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url("/assets/images/cars_inventory.jpg")`,
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
