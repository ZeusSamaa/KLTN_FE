const getFormattedValue = value => {
    return value < 10 ? `0${value}` : value; 
}

export const formattedDate = (date) => {
    const _date = new Date(Date.parse(date));
    const day = _date.getDate();
    const month = _date.getMonth() + 1;
    const year = _date.getFullYear();
    return `${getFormattedValue(day)}-${getFormattedValue(month)}-${getFormattedValue(year)}`;
}

export const formattedHours = (date) => {
    const _date = new Date(Date.parse(date));
    const hours = (_date.getHours() + 7) >= 24 ? (_date.getHours() - 17) : (_date.getHours() + 7);
    const minutes = _date.getMinutes();
    const seconds = _date.getSeconds();

    return `${getFormattedValue(hours)}:${getFormattedValue(minutes)}:${getFormattedValue(seconds)}`;
}

export  const formattedCurrency = (currency) => {
    return currency?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export const upperCaseFirtLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
