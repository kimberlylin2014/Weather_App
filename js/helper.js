
export function capitalizeFirstLetter(string) {
    let newStr = string.toLowerCase().split(" ");
    for(let i = 0; i < newStr.length; i++) {
        newStr[i] = newStr[i][0].toUpperCase() + newStr[i].slice(1);
    }
    return newStr.join(" ")
}

export function convertFtoC(temp) {
    return (temp - 32) * 5/9;
}
export function convertCtoF(temp) {
    return (temp * 9/5) + 32;
}

export function getStringWeekday(dt) {
    let days = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat']
    return days[dt.getDay()];
}

export function getFullDate(dt) {
    let date = dt.getDate();
    let month = dt.getMonth() + 1;
    let year = dt.getFullYear();
    return  `${month}/${date}/${year}`;
}
