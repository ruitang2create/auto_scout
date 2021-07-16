import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Offcanvas, FormControl, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import ResultItem from '../components/ResultItem';
import styles from '../styles/Results.module.css';
import { BsCaretRightFill } from 'react-icons/bs';

export default function Results(props) {
    const [modelsList, setModelsList] = useState([]);
    const [sidebarShow, setSidebarShow] = useState(false);

    const closeSidebar = () => setSidebarShow(false);
    const openSidebar = () => setSidebarShow(true);

    const setMakeHandler = (event) => {
        const makeName = event.target.value;
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
        props.searchSetter({
            ...props.searchCriteria,
            type: typeName,
        });
    };

    const yearValidator = (event) => {
        const year = event.target.value;
        if (year !== '' && (year < props.yearLimit.MIN || year > props.yearLimit.MAX)) {
            event.target.value = '';
        } else {
            props.searchSetter({
                ...props.searchCriteria,
                year: event.target.value,
            });
        }
    };

    const getModels = async () => {
        let apiUrl = '';
        console.log('Fetching models...');
        if (props.searchCriteria.make !== '' && props.searchCriteria.type !== '' && props.searchCriteria.year !== '') {
            apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${props.searchCriteria.make}/modelyear/${props.searchCriteria.year}/vehicleType/${props.searchCriteria.type}?format=json`;
        } else if (props.searchCriteria.make !== '' && props.searchCriteria.type === '' && props.searchCriteria.year !== '') {
            apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${props.searchCriteria.make}/modelyear/${props.searchCriteria.year}?format=json`;
        } else if (props.searchCriteria.make !== '' && props.searchCriteria.type !== '' && props.searchCriteria.year === '') {
            apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${props.searchCriteria.make}/vehicleType/${props.searchCriteria.type}?format=json`;
        } else if (props.searchCriteria.make !== '' && props.searchCriteria.type === '' && props.searchCriteria.year === '') {
            apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${props.searchCriteria.make}?format=json`;
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
            <div className={styles.sidebarSwitch} onClick={() => openSidebar()}>
                <BsCaretRightFill color='white' />
            </div>
            <Offcanvas show={sidebarShow} onHide={closeSidebar}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={styles.sideFilterContainer}>
                        <div className={styles.inputWrapper}>
                            <FormControl as="select" onChange={setMakeHandler} defaultValue={props.searchCriteria.make}>
                                <option value="">Car Make</option>
                                {props.allMakes.length > 0 &&
                                    props.allMakes.map((make, index) => {
                                        return (
                                            <option key={index} value={make.Make_Name}>
                                                {make.Make_Name}
                                            </option>
                                        );
                                    })}
                            </FormControl>
                        </div>
                        <div className={styles.inputWrapper}>
                            <FormControl as="select" onChange={setTypeHandler} defaultValue={props.searchCriteria.type}>
                                <option value="">
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
                            </FormControl>
                        </div>
                        <div className={styles.inputWrapper}>
                            <FormControl placeholder="Car Year" onBlur={yearValidator} defaultValue={props.searchCriteria.year} />
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </Layout>
    );
}