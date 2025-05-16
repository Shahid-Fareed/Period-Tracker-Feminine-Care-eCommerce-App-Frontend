function numberWithCommas(x) {
    //return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return x.toLocaleString();
}

export function commaSperate(x) {
    const result = numberWithCommas(x);
    const pass = result;
    return pass;
}