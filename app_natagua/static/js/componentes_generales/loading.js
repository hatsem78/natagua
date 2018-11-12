const Loading = {
    template: `<div><div class="loading" v-if="loading">Loading&#8230;</div></div>`,
    computed: {
        loading() {
            return this.$store.getters.getLoading;
        }
    }
};