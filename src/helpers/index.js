export const getJwt = () => {
    return 'Bearer ' + localStorage.getItem('authJwt');
};

export const numberFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const cleanSeparator = (value) => {
    const cleanValue = value.replace(/[^\d]/g, '')
    return cleanValue;
}