Vue.component('vuetable', window.Vuetable.Vuetable);

Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
$("#configuracion_general").addClass('is-expanded');
$("#menu_alumno").addClass('active');
$("#dashboard").removeClass('active');

var alumno = new Vue({
    el: '#alumno',
    delimiters: ['${','}'],
    data: {
        titulo:'Agregar Alumno',
        tipo: 'alumno',
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
        showAlumno: false,
    },
    mounted: function() {
        //this.getTurnos();
    },
    methods: {
        onPaginationData: function(paginationData) {
            this.$refs.paginationAlumno.setPaginationData(paginationData)
        },
        show_alumno:function(value){
            let self = this;
            if(value){
                self.showAlumno = value;
            }
            else{
                self.showAlumno = value;
                self.tipo = 'alumno';
                self.refresh();
            }
        },
        deleteAlumno: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true });
            HTTP.delete(`/alumno/${id}/`)
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
            this.deleteAlumno(rowData.id);
        },
        addAlumno: function () {
            let self = this;
            self.titulo = "Agregar Alumno";
            self.tipo = 'alumno';
            self.show_alumno(true);
        },
        editRow: function (value) {
            let self = this;
            self.id_update = value.id;
            self.titulo = "Modificar Alumno";
            self.tipo = 'alumno_update';
            self.show_alumno(true);
        },
        onLoading: function() {

        },
        refresh: function() {
            let self = this;
            self.$nextTick(()=>{
              self.$refs.vuetableAlumno.refresh();
              store.dispatch({type: 'setLoading',value: false });
            })
        },
        onLoaded:function () {

        }
    }

});