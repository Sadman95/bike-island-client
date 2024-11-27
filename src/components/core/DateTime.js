import { format, getHours, getMinutes, intlFormatDistance, isToday, isYesterday } from 'date-fns';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export class DateTime {
    timeStamp;

    /**
     *
     * @param {string} timeStamp
     */
    constructor(timeStamp) {
        this.timeStamp = timeStamp;
    }

    static dateTime(timeStamp) {
        return new DateTime(timeStamp);
    }

    formatHoursMinuteLocal() {
        return `${
            this.isDayToday()
                ? this.getFormatedDistance()
                : `${
                      getHours(new Date(this.timeStamp)) > 12 ? getHours(new Date(this.timeStamp)) - 12 : getHours(new Date(this.timeStamp))
                  }:${
                      getMinutes(new Date(this.timeStamp)) < 10
                          ? '0' + getMinutes(new Date(this.timeStamp))
                          : getMinutes(new Date(this.timeStamp))
                  } ${
                      getHours(new Date(this.timeStamp)) >= 12 &&
                      getHours(new Date(this.timeStamp)) < 24 &&
                      getMinutes(new Date(this.timeStamp)) >= 0
                          ? 'pm'
                          : 'am'
                  }`
        }`;
    }

    getFormatedDistance() {
        return intlFormatDistance(new Date(this.timeStamp), new Date());
    }

    isDayToday() {
        return isToday(new Date(this.timeStamp));
    }

    isDayYesterday() {
        return isYesterday(new Date(this.timeStamp));
    }

    formatDate() {
        if (this.isDayToday()) {
            return 'Today';
        }
        if (this.isDayYesterday()) {
            return 'Yesterday';
        }
        return format(new Date(this.timeStamp), 'dd/MM/yyyy');
    }

    convertToISO() {
        const { $y, $M, $D } = this.timeStamp;
        const toFormat = `${$y}-0${$M}-${$D}`;
        const date = dayjs(toFormat);
        const isoDate = date.format();
        return isoDate;
    }
}
