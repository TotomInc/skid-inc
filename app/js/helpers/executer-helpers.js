function checkRegexGlobally(stringToSearch, pattern) {
    var regex = new RegExp(pattern, "g");
    
    return (stringToSearch.search(regex) != -1);
};

function filterArrayOnRegexPattern(stringToSearch, arrayToFilter) {
    return arrayToFilter.filter(function(elementWithPattern) {
        if (typeof elementWithPattern.pattern === "undefined")
            return false;
        
        return checkRegexGlobally(stringToSearch, elementWithPattern.pattern);
    });
};