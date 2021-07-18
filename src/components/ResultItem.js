import React from 'react';
import styles from '../styles/Results.module.css';

const ResultItem = (props) => {
    return (
        <div className={styles.resultItem}>
            <div className={styles.modelData}>{props.itemData.year !== '' ? props.itemData.year : 'N/A'}</div>
            <div className={styles.modelData}>{props.itemData.Make_Name}</div>
            <div className={styles.modelData}>{props.itemData.Model_Name}</div>
            <div className={styles.modelData}>{props.itemData.VehicleTypeName ? props.itemData.VehicleTypeName : 'N/A'}</div>
        </div>
    );
};

export default ResultItem;
