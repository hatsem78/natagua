Vue.component('vuetable', window.Vuetable.Vuetable);

Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
$("#configuracion_general").addClass('is-expanded');
$("#menu_transportista").addClass('active');
$("#dashboard").removeClass('active');

var transportista = new Vue({
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
        showTransportista: false,
    },
    mounted: function() {
        //this.getTurnos();
    },
    methods: {
        onPaginationData: function(paginationData) {
            this.$refs.paginationTransportista.setPaginationData(paginationData)
        },
        show_transportista:function(value){

            if(value){
                this.showTransportista = value;
            }
            else{
                this.showTransportista = value;
            }
        },
        deleteTurno: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true });
            HTTP.delete(`/transportista/${id}/`)
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
            this.deleteTurno(rowData.id);
        },
        onLoading: function() {

        },
        refresh: function() {
            let self = this;
            self.$nextTick(()=>{
              self.$refs.vuetableTransportista.refresh();
              store.dispatch({type: 'setLoading',value: false });
            })
        },
        onLoaded:function () {

        }
    }

});