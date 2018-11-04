Vue.component('vuetable', window.Vuetable.Vuetable);

Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
new Vue({
    el: '#starting',
    delimiters: ['${','}'],
    data: {
        turno: [],
        loading: false,
        currentTurno: {},
        message: null,
        newTurno: {
            'nombre': null,
        },
        search_term: '',
        fieldes: [
            {
                name: 'id',
                title: 'Id',
                sortField: 'id'
            },
            {
                name: 'nombre',
                title: 'Nombre',
                sortField: 'nombre'
            },
            {
              name: '__slot:actions',   // <----
              title: 'Actions',
              titleClass: 'center aligned',
              dataClass: 'center aligned'
            }
        ],
        sortOrder: [
            { field: 'name', direction: 'asc' }
        ],
        css: {
            table: {
            tableClass: 'table table-striped table-bordered table-hovered',
            loadingClass: 'loading',
            ascendingIcon: 'glyphicon glyphicon-chevron-up',
            descendingIcon: 'glyphicon glyphicon-chevron-down',
            handleIcon: 'glyphicon glyphicon-menu-hamburger',
        },
            pagination: {
            infoClass: 'pull-left',
            wrapperClass: 'vuetable-pagination pull-right',
            activeClass: 'btn-primary',
            disabledClass: 'disabled',
            pageClass: 'btn btn-border',
            linkClass: 'btn btn-border',
            icons: {
              first: '',
              prev: '',
              next: '',
              last: '',
            },
        }
        }
    },
    mounted: function() {
        //this.getTurnos();
    },
    methods: {
        onPaginationData: function(paginationData) {
            //this.$refs.pagination.setPaginationData(paginationData)
        },
        getTurnos: function() {
            let self = this;
            let api_url = 'turno/';
            self.loading = true;
            HTTP.get(api_url)
            .then((response) => {
                this.articles = response.data;
                self.onPaginationData(response.data);
                self.loading = false;
            })
            .catch((err) => {
                self.loading = false;
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
        onChangePage: function(page) {
            this.$refs.vuetable.changePage(page)
        },
        editRow: function(rowData){

        },
        deleteRow: function(rowData){

        },
        onLoading: function() {

        },
        onLoaded:function () {

        }
    }

});