import React from 'react';
import styles from '../styles/Results.module.css';

const ResultItem = (props) => {
    return (
        <div className={styles.resultItem}>
            <div className={styles.modelData}>{props.itemData.year}</div>
            <div className={styles.modelData}>{props.itemData.Make_Name}</div>
            <div className={styles.modelData}>{props.itemData.Model_Name}</div>
            <div className={styles.modelData}>{props.itemData.VehicleTypeName}</div>
        </div>
    );
};

export default ResultItem;
