import moment from 'moment'


//getting nested object key using recursive function
// =================SORTING=================
var getObjectKey = (object, path) => {
    if (!path) return object;
    const properties = path.split(".");
    return getObjectKey(object[properties.shift()], properties.join("."));
}
let sorting = {
    ascending(list, path) {
        list.sort((a, b) => {
            let nameA = getObjectKey(a, path);
            let nameB = getObjectKey(b, path);
            if (nameA < nameB) {
                return -1;
            }
            if (nameB < nameA) {
                return 1;
            }
            return 0;
        });
    },
    descending(list, path) {
        list.sort((a, b) => {
            let nameA = getObjectKey(a, path);
            let nameB = getObjectKey(b, path);
            if (nameA > nameB) {
                return -1;
            }
            if (nameB > nameA) {
                return 1;
            }
            return 0;
        });
    },
}

// =================PLATFORM ICON GETTERS=================
let pickers = {
    platformIcon(platformName) {
        // getting icon by platform name
        platformName = platformName.toLowerCase();
        let icon = "";
        if (platformName.includes("playstation")) {
            icon = "mdi-sony-playstation";
        }
        if (platformName.includes("xbox")) {
            icon = "mdi-microsoft-xbox";
        }
        if (platformName.includes("nintendo")) {
            icon = "mdi-alpha-n-circle-outline";
        }
        if (platformName.includes("wii")) {
            icon = "mdi-nintendo-wii";
        }
        if (platformName.includes("wii-u")) {
            icon = "mdi-nintendo-wiiu";
        }
        if (platformName.includes("switch")) {
            icon = "mdi-nintendo-switch";
        }
        if (platformName.includes("pc")) {
            icon = "mdi-microsoft-windows";
        }
        if (platformName.includes("mac")) {
            icon = "mdi-apple";
        }
        if (platformName.includes("linux")) {
            icon = "mdi-linux";
        }
        if (platformName.includes("android")) {
            icon = "mdi-android";
        }
        if (platformName.includes("ios")) {
            icon = "mdi-apple-ios";
        }
        return icon;
    },
    scoreColor(score) {
        let color = "";

        if (score >= 75) color = "green";
        else if (score >= 50) color = "orange";
        else if (score >= 25) color = "red";
        else color = "grey";

        return color;
    },
}

// let now = moment;
let manipulators = {
    capFirstChar(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    spaceBetweenChars(string) {
        return string.split('').join(' ');
    },
    //eliminating empty properties
    trimObject(obj) {
        for (var propName in obj) {
            //if property is empty
            if (!obj[propName]) {
                delete obj[propName]
            }
        }
        return obj
    }
}

export default {
    install(Vue) {
        Vue.prototype.$global = {
            sorting, pickers, moment, manipulators
        }
    }
}