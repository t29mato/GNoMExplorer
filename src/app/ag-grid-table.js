"use client";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css';
import axios from "axios"; // Theme
import Papa from 'papaparse'; // papaparse for parsing CSV data

// Create new GridExample component
export const GridExample = () => {
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);
    const [filterElements, setFilterElements] = useState(''); // User input for elements to filter
    const [isLoading, setIsLoading] = useState(false); // 追加: データ読み込み中の状態
    const [isFiltering, setIsFiltering] = useState(false); // 追加: フィルター実行中の状態


    // Column Definitions
    const colDefs = [
        {field: 'Composition'},
        {
            field: 'MaterialId',
            cellRenderer: (params) => (
                <div>
                    {params.value}
                    <a href={`https://storage.googleapis.com/gnome_stable_materials/by_id/${params.value}.CIF`}
                       onClick={() => downloadCifFile(params.value)}
                       style={{color: 'blue', 'text-decoration': 'underline', 'margin-left': '4px'}}>
                        DL
                    </a>
                </div>
            )
        },
        {field: 'Reduced Formula'},
        {field: 'Elements'},
        {field: 'NSites'},

        // ... Add more columns as needed ...
    ];

    // Fetch data from CSV
    useEffect(() => {
        setIsLoading(true); // データ読み込み開始
        axios.get('/stable_materials_summary.csv')
            .then(response => {
                Papa.parse(response.data.trim(), {
                    header: true,
                    complete: (results) => {
                        setRowData(results.data);
                        setIsLoading(false); // データ読み込み完了
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false); // エラー時の処理
            });
    }, []);

    const downloadCifFile = (materialId) => {
        console.log('downloadCifFile')
        // ファイルのダウンロードURLを構築
        const fileUrl = `https://storage.googleapis.com/gnome_stable_materials/by_id/${materialId}.CIF`;

        // ファイルをダウンロードする
        axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'blob', // 重要: レスポンスをBlobとして処理
        }).then((response) => {
            // ファイルダウンロードのためのリンクを作成
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${materialId}.CIF`);
            document.body.appendChild(link);
            link.click();
        }).catch(error => console.error('Error downloading file:', error));
    };


    const inputStyle = {
        width: '400px',
        padding: '10px',
        margin: '10px 0',
        fontSize: '16px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer'
    };

    const gridStyle = {
        height: '70vh',
        width: '60vw',
        marginTop: '20px'
    };
    // Filter data based on user input
    // Filter data based on user input
    const filterData = () => {
        setIsFiltering(true); // フィルター実行開始
        const elements = filterElements.split(',').map(el => el.trim());
        const filteredData = rowData.filter(row => {
            let jsonStr = row.Elements.replace(/'/g, '"');
            return elements.every(el => JSON.parse(jsonStr).includes(el));
        });
        setRowData(filteredData);
        setIsFiltering(false); // フィルター実行完了
    };


    return (
        <div>
            <div>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="Enter elements to filter, e.g., Pb,Te"
                    value={filterElements}
                    onChange={(e) => setFilterElements(e.target.value)}
                />
                <button style={buttonStyle} onClick={filterData}>Filter Data</button>
            </div>
            {isLoading && <p>Loading data...</p>} {/* データ読み込み中の表示 */}
            {isFiltering && <p>Filtering data...</p>} {/* フィルター実行中の表示 */}
            <div className="ag-theme-quartz" style={gridStyle}>
                <AgGridReact rowData={rowData} columnDefs={colDefs} pagination={true} />
            </div>
        </div>
    );
};

