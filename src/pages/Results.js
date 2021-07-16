import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Layout from '../components/Layout';
import ResultItem from '../components/ResultItem';
import styles from '../styles/Results.module.css';

export default function Results(props) {
    const [modelsList, setModelsList] = useState([]);

    const getModels = async () => {
        let apiUrl = '';
        console.log('Fetching models...');
        if (props.searchCriteria.make !== '' && props.searchCriteria.type !== '' && props.searchCriteria.year !== '') {
            apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${props.searchCriteria.make}/modelyear/${props.searchCriteria.year}/vehicleType/${props.searchCriteria.type}?format=json`;
        }
        try {
            const res = await axios.get(apiUrl);
            setModelsList(res.data.Results);
        } catch (err) {
            console.error(err);
        }
    }

    const renderResults = () => {
        return (
            modelsList.map((model, index) => {
                model = {
                    ...model,
                    year: props.searchCriteria.year,
                }
                return (
                    <ResultItem itemData={model} key={index} />
                );
            })
        );
    }

    useEffect(() => {
        getModels(); // eslint-disable-next-line
    }, [props.searchCriteria]);

    return (
        <Layout title='Results Page'>
            <div className={styles.resultsTitle} style={{ textAlign: 'center' }}>
                {`All matches for ${props.searchCriteria.year} ${props.searchCriteria.make} ${props.searchCriteria.type}`}
            </div>
            <div className={styles.resultsContainer}>
                <div className={styles.resultsTableHead}>
                    <div>Year</div>
                    <div>Make</div>
                    <div>Model</div>
                    <div>Type</div>
                </div>
                {
                    modelsList.length > 0 ? renderResults() : <Spinner animation='grow' />
                }
            </div>
        </Layout>
    );
}