export default {
    //initializing dark theme
    
    initTheme() {
        let darkTheme = this.$store.state.localStorage.get('darkTheme', undefined);
        if (darkTheme != undefined) {
            this.$store.dispatch('ui/initTheme', darkTheme);
            this.$vuetify.theme.dark = darkTheme;
        }
    },
    // themeWatcher: {
    //     "$vuetify.theme.dark"(newVal) {
    //         localStorage.setItem("darkTheme", JSON.stringify(newVal));
    //         // alert(JSON.parse(localStorage.getItem("darkTheme")));
    //         // this.$vuetify.theme.dark = newVal;
    //     },
    // },
    pageTitleWatcher: {
        $route: {
            immediate: true,
            handler(to, from) {
                // console.log(to)
                // handling undefined value of meta title that happens at the start of loading
                from = ''
                let pageTitle = () => {
                    if (to.meta.title != undefined) {
                        return to.meta.title + ' — ' + this.$globals.props.appName
                    }
                    else {
                        return this.$globals.props.appName + from
                    }
                }
                document.title = pageTitle()
            }
        }
    }
}