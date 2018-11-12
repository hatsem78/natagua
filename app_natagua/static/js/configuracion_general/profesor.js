Vue.component('vuetable', window.Vuetable.Vuetable);

Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
$("#configuracion_general").addClass('is-expanded');
$("#menu_profesor").addClass('active');
$("#dashboard").removeClass('active');

var profesor = new Vue({
    el: '#profesor',
    delimiters: ['${','}'],
    data: {
        titulo:'Agregar Profesor',
        tipo: 'profesor',
        turno: [],
        loading: false,
        currentTurno: {},
        message: null,
        id_update: 0,
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
        showProfesor: false,
    },
    mounted: function() {
        //this.getTurnos();
    },
    methods: {
        onPaginationData: function(paginationData) {
            this.$refs.paginationProfesor.setPaginationData(paginationData)
        },
        show_profesor:function(value){
            let self = this;
            if(value){
                self.showProfesor = value;
            }
            else{
                self.showProfesor = value;
                self.tipo = 'profesor';
                self.refresh();
            }
        },
        deleteProfesor: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true });
            HTTP.delete(`/profesor/${id}/`)
            .then((response) => {

                store.dispatch({type: 'setLoading',value: false });
                self.refresh();
            })
            .catch((err) => {
                notifier.alert('Error ocurrete: ' + err);
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            })
        },
        onChangePage: function(page) {
            this.$refs.vuetable.changePage(page)
        },
        deleteRow: function(rowData){
            this.deleteProfesor(rowData.id);
        },
        addProfesor: function () {
            let self = this;
            self.titulo = "Agregar Profesor";
            self.tipo = 'profesor';
            self.show_profesor(true);
        },
        editRow: function (value) {
            let self = this;
            self.id_update = value.id;
            self.titulo = "Modificar Profesor";
            self.tipo = 'profesor_update';
            self.show_profesor(true);
        },
        onLoading: function() {

        },
        refresh: function() {
            let self = this;
            self.$nextTick(()=>{
              self.$refs.vuetableProfesor.refresh();
              store.dispatch({type: 'setLoading',value: false });
            })
        },
        onLoaded:function () {

        }
    }

});