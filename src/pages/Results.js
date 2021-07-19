import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Offcanvas, FormControl, Form, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import ResultItem from '../components/ResultItem';
import styles from '../styles/Results.module.css';
import { BsCaretRightFill } from 'react-icons/bs';
import { BiChevronsLeft, BiChevronsRight, BiChevronLeft, BiChevronRight } from 'react-icons/bi';

export default function Results(props) {
    const [modelsList, setModelsList] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [sidebarShow, setSidebarShow] = useState(false);
    const [typeUnset, setTypeUnset] = useState(true);
    const [itemsPerPage, setItemsPerpage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [currFirstItem, setCurrFirstItem] = useState(1);
    const MAX_ITEMS = 5; // max number of pagination items that are shown at a time

    const closeSidebar = () => setSidebarShow(false);
    const openSidebar = () => setSidebarShow(true);

    const setMakeHandler = (event) => {
        const makeName = event.target.value;
        setTypeUnset(true);
        setCurrentPage(1);
        if (makeName !== '') {
            props.searchSetter({
                ...props.searchCriteria,
                make: makeName,
                type: "",
            });
            props.getAllTypes(makeName);
        }
    };

    const setTypeHandler = (event) => {
        const typeName = event.target.value;
        setTypeUnset(false);
        setCurrentPage(1);
        props.searchSetter({
            ...props.searchCriteria,
            type: typeName,
        });
    };

    const setYearHandler = (event) => {
        setCurrentPage(1);
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
        const make = props.searchCriteria.make.trim();
        const type = props.searchCriteria.type.trim();
        const year = props.searchCriteria.year;
        if (make !== '' && type !== '' && year !== '') {
            apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${make}/modelyear/${year}/vehicleType/${type}?format=json`;
        } else if (make !== '' && type === '' && year !== '') {
            apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${make}/modelyear/${year}?format=json`;
        } else if (make !== '' && type !== '' && year === '') {
            apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${make}/vehicleType/${type}?format=json`;
        } else if (make !== '' && type === '' && year === '') {
            apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`;
        }
        try {
            const res = await axios.get(apiUrl);
            setNotFound(res.data.Results.length > 0 ? false : true);
            setModelsList(res.data.Results);
        } catch (err) {
            console.error(err);
        }
    }

    const renderResults = () => {
        const itemsToShow = modelsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        return (
            itemsToShow.map((model, index) => {
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

    const handlePageItemClick = (event) => {
        setCurrentPage(event.target.value);
    }

    const renderPagination = () => {
        const pgNum = Math.ceil(modelsList.length / itemsPerPage);
        const pageItems = [];
        const paginationSize = window.matchMedia("(max-width: 800px)").matches ? 'sm' : 'normal';
        for (let i = 1; i < pgNum + 1; i++) {
            pageItems.push(i);
        }

        return (
            <div className={styles.paginationWrapper}>
                <Button variant='dark' className={styles.paginationBtn} onClick={() => setCurrentPage(pgNum >= 1 ? 1 : 0)} ><BiChevronsLeft /></Button>
                <Button variant='dark' className={styles.paginationBtn} onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)} ><BiChevronLeft /></Button>
                <div className={styles.selectWrapper}>
                    <FormControl as='select' onChange={handlePageItemClick} value={currentPage} style={{ textAlign: 'center' }}>
                        {
                            pageItems.map((pageItem, index) => {
                                return (
                                    <option key={index} value={pageItem}>{pageItem}</option>
                                );
                            })
                        }
                    </FormControl>
                </div>
                <Button variant='dark' className={styles.paginationBtn} onClick={() => setCurrentPage(currentPage < pgNum ? currentPage + 1 : currentPage)} ><BiChevronRight /></Button>
                <Button variant='dark' className={styles.paginationBtn} onClick={() => setCurrentPage(pgNum >= 1 ? pgNum : 0)} ><BiChevronsRight /></Button>
            </div>
        );
    }

    useEffect(() => {
        getModels(); // eslint-disable-next-line
    }, [props.searchCriteria]);

    useEffect(() => {

    });

    return (
        <Layout title='Results Page'>
            <div className={styles.resultsTitle} style={{ textAlign: 'center' }}>
                {`All matches for ${props.searchCriteria.year} ${props.searchCriteria.make} ${props.searchCriteria.type}`.trim() + ':'}
            </div>
            <div className={styles.resultsContainer}>
                {renderPagination()}
                <div className={styles.resultsTableHead}>
                    <div>Year</div>
                    <div>Make</div>
                    <div>Model</div>
                    <div>Type</div>
                </div>
                {
                    modelsList.length > 0 ? renderResults() : notFound ? <div className={styles.noMatchAlert}>No matches found</div> : <div style={{ marginTop: '2rem' }}><Spinner animation='grow' /></div>
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
                        <Form>
                            <div className={styles.inputWrapper}>
                                <FormControl as="select" onChange={setMakeHandler} defaultValue={props.searchCriteria.make}>
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
                                </FormControl>
                            </div>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" xs="2">{props.yearLimit.MIN}</Form.Label>
                                <Col sm="8" xs="8">
                                    <Form.Range
                                        onChange={setYearHandler}
                                        defaultValue={props.searchCriteria.year}
                                        value={props.searchCriteria.year}
                                        min={props.yearLimit.MIN}
                                        max={props.yearLimit.MAX}
                                    />
                                </Col>
                                <Form.Label column sm="1" xs="1">{props.yearLimit.MAX}</Form.Label>
                            </Form.Group>
                        </Form>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </Layout>
    );
}