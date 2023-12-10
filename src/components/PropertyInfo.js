import React from 'react';

const PropertyInfo = () => {
    return (
        <div className="p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Property Descriptions</h3>
            <ul className="list-disc pl-5">
                <li><strong>Composition:</strong> alphabetically-ordered composition</li>
                <li><strong>MaterialId:</strong> a unique id corresponding to the entry</li>
                <li><strong>Reduced Formula:</strong> reduced chemical formula</li>
                <li><strong>Elements:</strong> chemical system</li>
                <li><strong>NSites:</strong> number of atoms</li>
                <li><strong>Volume:</strong> volume in units Å^3</li>
                <li><strong>Density:</strong> density in units Å^3 / atom</li>
                <li><strong>Point Group:</strong> assigned point group</li>
                <li><strong>Space Group:</strong> assigned space group</li>
                <li><strong>Space Group Number:</strong> assigned space group number</li>
                <li><strong>Crystal System:</strong> assigned crystal system</li>
                <li><strong>Corrected Energy:</strong> energy adjusted by MP2020 corrections</li>
                <li><strong>Formation Energy Per Atom:</strong> normalized energy corrected by reference elements</li>
                <li><strong>Decomposition Energy Per Atom:</strong> decomposition energy relative to the downloaded Materials Project convex hull</li>
                <li><strong>Dimensionality Cheon:</strong> dimensionality predicted by Cheon et al. 2017</li>
                <li><strong>Bandgap:</strong> calculated bandgap</li>
                <li><strong>Is Train:</strong> in training set for associated machine learning models</li>
                <li><strong>Decomposition Energy Per Atom All:</strong> distance to convex hull of all entries</li>
                <li><strong>Decomposition Energy Per Atom Relative:</strong> distance to convex hull of all entries except for the current</li>
                <li><strong>Decomposition Energy Per Atom MP:</strong> distance to convex hull of all entries from Materials Project (including recalculations)</li>
                <li><strong>Decomposition Energy Per Atom MP OQMD:</strong> distance to convex hull of all entries from Materials Project + Open Quantum Materials Database (including recalculations)</li>
            </ul>
        </div>
    );
};

export default PropertyInfo;
