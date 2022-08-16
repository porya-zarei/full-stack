export const jalaliToGregorianConverter = (
    j_y: number,
    j_m: number,
    j_d: number,
) => {
    const JalaliDate = {
        g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
    };
    const jy = j_y - 979;
    const jm = j_m - 1;
    const jd = j_d - 1;

    let j_day_no =
        365 * jy +
        parseInt((jy / 33).toString()) * 8 +
        parseInt((((jy % 33) + 3) / 4).toString());
    for (let i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

    j_day_no += jd;

    let g_day_no = j_day_no + 79;

    let gy =
        1600 +
        400 *
            parseInt(
                (g_day_no / 146097).toString(),
            ); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no %= 146097;

    let leap = true;
    if (g_day_no >= 36525) {
        /* 36525 = 365*100 + 100/4 */
        g_day_no--;
        gy +=
            100 *
            parseInt(
                (g_day_no / 36524).toString(),
            ); /* 36524 = 365*100 + 100/4 - 100/100 */
        g_day_no = g_day_no % 36524;

        if (g_day_no >= 365) g_day_no++;
        else leap = false;
    }

    gy += 4 * parseInt((g_day_no / 1461).toString()); /* 1461 = 365*4 + 4/4 */
    g_day_no %= 1461;

    if (g_day_no >= 366) {
        leap = false;

        g_day_no--;
        gy += parseInt((g_day_no / 365).toString());
        g_day_no = g_day_no % 365;
    }
    let i = 0;
    for (
        i = 0;
        g_day_no >= JalaliDate.g_days_in_month[i] + Number(i == 1 && leap);
        i++
    )
        g_day_no -= JalaliDate.g_days_in_month[i] + Number(i == 1 && leap);
    let gm = i + 1;
    let gd = g_day_no + 1;

    const gy_out = `${gy}`;
    const gm_out = gm < 10 ? `0${gm}` : `${gm}`;
    const gd_out = gd < 10 ? `0${gd}` : `${gd}`;

    return [gy_out, gm_out, gd_out];
};

export const getGeorgianDateFromJalali = (date: string) => {
    const [j_y, j_m, j_d] = date.split("/").map(Number);
    const [gy, gm, gd] = jalaliToGregorianConverter(j_y, j_m, j_d);
    return new Date(`${gy}/${gm}/${gd}`);
};

export const isDateInRange = (date: Date, startDate?: Date, endDate?: Date) => {
    if (!startDate && !endDate) return true;
    if (!startDate && endDate) return date.getTime() <= endDate.getTime();
    if (!endDate && startDate) return date.getTime() >= startDate.getTime();
    if (startDate && endDate)
        return (
            date.getTime() >= startDate.getTime() &&
            date.getTime() <= endDate.getTime()
        );
    return false;
};

const toEnglishDigits = (str: string) => {
    const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = 0; i < persian.length; i++) {
        str = str.replace(new RegExp(persian[i], "g"), english[i]);
    }
    return str;
};

export const getCurrentJalaliYear = () => {
    const date = new Date();
    const year = date.toLocaleDateString("fa-IR").split("/")[0];
    return toEnglishDigits(year);
};
