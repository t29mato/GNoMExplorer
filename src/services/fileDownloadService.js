import axios from 'axios';

export const downloadCifFile = async (materialId) => {
    const fileUrl = `https://storage.googleapis.com/gnome_stable_materials/by_id/${materialId}.CIF`;
    try {
        const response = await axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${materialId}.CIF`);
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};

