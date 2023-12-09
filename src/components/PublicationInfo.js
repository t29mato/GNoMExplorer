import React from 'react';

const PublicationInfo = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Reference</h3>
            <p className="mb-2">
                <strong>Title:</strong> Scaling deep learning for materials discovery<br/>
                <strong>Authors:</strong> Amil Merchant, Simon Batzner, Samuel S. Schoenholz, Muratahan Aykol, Gowoon Cheon, Ekin Dogus Cubuk<br/>
                <strong>Journal:</strong> Nature<br/>
                <strong>Year:</strong> 2023<br/>
                <strong>DOI:</strong> <a href="https://doi.org/10.1038/s41586-023-06735-9" className="text-blue-600 hover:text-blue-800">10.1038/s41586-023-06735-9</a><br/>
                <strong>Link:</strong> <a href="https://www.nature.com/articles/s41586-023-06735-9" className="text-blue-600 hover:text-blue-800">Read the paper</a>
            </p>
        </div>
    );
};

export default PublicationInfo;
