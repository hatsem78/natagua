Vue.component('vuetable', window.Vuetable.Vuetable);

Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
$("#configuracion_general").addClass('is-expanded');
$("#menu_turno").addClass('active');
$("#dashboard").removeClass('active');

new Vue({
    el: '#starting',
    delimiters: ['${','}'],
    data: {
        titulo:'Agregar Transportista',
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
                name: 'apellido',
                title: 'Apellido',
                sortField: 'apellido'
            },
            {
                name: 'nombre',
                title: 'Nombre',
                sortField: 'nombre'
            },
            {
                name: 'edad',
                title: 'edad',
                sortField: 'edad'
            },
            {
                name: 'direccion',
                title: 'Direccion',
                sortField: 'direccion'
            },
            {
                name: 'celular',
                title: 'Celular',
                sortField: 'celular'
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
        },
        action: true,
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
                this.newTurno = response.data;
                $("#editArticleModal").modal('show');
                this.loading = false;
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            });
        },
        addTurno: function () {
            let self = this;
            self.loading = true;
            HTTP.post('/turno/', this.newTurno)
            .then((response) => {
                self.newTurno.nombre = '';
                self.refresh();
                self.loading = true;

            })
            .catch((err) => {
                this.loading = true;
                console.log(err);
            });
        },
        updateTurno: function () {
            let self = this;
            self.loading = true;
            HTTP.put(`/turno/${self.newTurno.id}/`, self.newTurno)
            .then((response) => {
                self.loading = false;
                self.refresh();

            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
        },
        deleteTurno: function (id) {
            let self = this;
            this.loading = true;
            HTTP.delete(`/turno/${id}/`)
            .then((response) => {
                self.loading = false;
                self.refresh();
            })
            .catch((err) => {
                self.loading = false;
                console.log(err);
            })
        },
        onChangePage: function(page) {
            this.$refs.vuetable.changePage(page)
        },
        editRow: function(rowData){
            this.titulo = 'Editar Turno';
            this.action = false;
            this.getTurno(rowData.id);
        },
        addRow: function(){
            this.titulo = 'Agregar Turno';
            this.action = true;
        },
        deleteRow: function(rowData){
            this.deleteTurno(rowData.id);
        },
        onLoading: function() {

        },
        refresh: function() {
            let self = this;
            self.$nextTick(()=>{
              self.$refs.vuetable.refresh();
              self.loading = false;
            })
        },
        onLoaded:function () {

        }
    }

});