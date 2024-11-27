import dayjs from 'dayjs';

export function convertToISODate(dateString) {
    const date = dayjs(dateString, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    const isoDate = date.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    return isoDate;
}
