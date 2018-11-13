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
        tipo: 'transportista',
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
            let self = this;
            if(value){
                self.showTransportista = value;
            }
            else{
                self.showTransportista = value;
                self.tipo = 'transportista';
                self.refresh();
            }
        },
        deleteTransportista: function (id) {
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
            this.deleteTransportista(rowData.id);
        },
        addTransportista: function () {
            let self = this;
            self.titulo = "Agregar Transportista";
            self.tipo = 'transportista';
            self.show_transportista(true);
        },
        editRow: function (value) {
            let self = this;
            self.id_update = value.id;
            self.titulo = "Modificar Transportista";
            self.tipo = 'transportista_update';
            self.show_transportista(true);
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