exports.getRandom = (number) => {
    return Math.floor(Math.random() * Math.floor(number));
};

exports.parseBooleanParameters= (queryParameters) => {
    for (let [key, value] of Object.entries(queryParameters)) {
        if(value.toLowerCase() === "true") {
            queryParameters[key] = true;
        } else if(value.toLowerCase() === "false") {
            queryParameters[key] = false;
        }
    }
    return queryParameters;
}