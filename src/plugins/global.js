//getting nested object key using recursive function
// =================SORTING=================
var getObjectKey = (object, path) => {
    if (!path) return object;
    const properties = path.split(".");
    return getObjectKey(object[properties.shift()], properties.join("."));
}
let sorting = {
    sortAsc(list, path) {
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
    sortDesc(list, path) {
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
    }
}

// =================PLATFORM ICON GETTERS=================
let iconGetters = {
    platform(platformName) {
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
}

export default {
    install(Vue) {
        Vue.prototype.$global = {
            sorting, iconGetters
        }
    }
}