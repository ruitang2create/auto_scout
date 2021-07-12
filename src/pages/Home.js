import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { Form, Button, Dropdown, Col } from 'react-bootstrap';

export default function Home(props) {
    return (
        <Layout title='Home Page'>
            <h1 className={styles.title}>Auto Scout</h1>
            <Form className='SearchForm'>
                <Form.Row>
                    <Col>
                        <Form.Control as='select'>
                            <option>Car Make</option>
                            <option>Audi</option>
                            <option>Benz</option>
                            <option>Ferrari</option>
                            <option>Toyota</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control as='select'>
                            <option>Car Model</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control placeholder="Car Year" />
                    </Col>
                </Form.Row>
            </Form>
        </Layout>
    );
}