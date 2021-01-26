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

export default {
    install(Vue) {
        Vue.prototype.$global = {
            sorting
        }
    }
}