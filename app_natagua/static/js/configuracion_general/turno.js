
new Vue({
    el: '#starting',
    delimiters: ['${','}'],
    data: {
        turno: [],
        loading: true,
        currentTurno: {},
        message: null,
        newTurno: {
            'nombre': null,
        },
        search_term: '',
    },
    mounted: function() {
        this.getTurnos();
    },
    methods: {
        getTurnos: function() {
            let api_url = 'turno/';
            this.loading = true;
            HTTP.get(api_url)
            .then((response) => {
                this.articles = response.data;
                this.loading = false;
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
        },
        getTurno: function (id) {
            this.loading = true;
            HTTP.get(`turno/${id}/`)
            .then((response) => {
                this.turno = response.data;
                $("#editArticleModal").modal('show');
                this.loading = false;
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            });
        },
        addTurno: function () {
            this.loading = true;
            HTTP.post('/turno/', this.newTurno)
                .then((response) => {
                    this.loading = true;
                    this.getTurnos();
                })
                .catch((err) => {
                    this.loading = true;
                    console.log(err);
                });
        },
        updateArticle: function () {
            this.loading = true;
            HTTP.put(`/turno/${this.currentTurno.id}/`, this.currentTurno)
            .then((response) => {
                this.loading = false;
                this.currentTurno = response.data;
                this.getTurnos();
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
        },
        deleteArticle: function (id) {
            this.loading = true;
            HTTP.delete(`/turno/${id}/`)
            .then((response) => {
                this.loading = false;
                this.getArticles();
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
        },
    }

});