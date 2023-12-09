import { useState, useEffect } from 'react';
import fetchData from '../services/dataService';

const useCsvData = () => {
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData(setRowData, setIsLoading);
    }, []);

    return [rowData, isLoading];
};

export default useCsvData;
