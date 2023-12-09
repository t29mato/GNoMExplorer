import axios from 'axios';
import Papa from 'papaparse';

const fetchData = async (setRowData, setIsLoading) => {
    setIsLoading(true);
    try {
        const response = await axios.get('/stable_materials_summary.csv');
        Papa.parse(response.data.trim(), {
            header: true,
            complete: (results) => {
                setRowData(results.data);
                setIsLoading(false);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
    }
};

export default fetchData;
