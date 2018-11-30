Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
Vue.component('vuetable', window.Vuetable.Vuetable);
$("#configuracion_general").addClass('is-expanded');
$("#menu_promocion").addClass('active');
$("#dashboard").removeClass('active');

moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin : 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
    relativeTime: {
        future: 'Faltan %s',
        d: '%d día',
        dd: '%d días'
    }
});


Vue.component('date-picker', VueBootstrapDatetimePicker);

Vue.component('promocion_action',{
    props:{
        tipo:{
            type: String,
            default: 'promocion'
        },
        id_update: null,
        titulo_new: {
            type: String,
            default: 'Agregar Promoción'
        },
    },
    inject:['$validator'],
    data(){
        return {
            accion: this.tipo,
            titulo: this.titulo_new,
            datos:{
                id:'',
                nombre:'',
                porcentaje: '',
                fecha_expiracion:'',
                expiracion: false,
                activo: true,
                description: ''
            },
            idUpdate: this.id_update,
            date: null,
            config: {
            // https://momentjs.com/docs/#/displaying/
              format: 'DD/MM/YYYY h:mm:ss',
              useCurrent: false,
              showClear: true,
              showClose: true,
            },
        }
    },
    methods:{
        cancelar: function(){
            this.$emit('close');
        },
        guardar: function () {
            let self = this;
            switch (this.accion) {
                case 'promocion':
                    self.titulo = 'Agregar Promoción';
                    self.addPromocion();
                    break;
                case 'promocion_update':
                    self.titulo = "Modificar Promoción";
                    self.updatePromocion();
                    break;
                default:
                    break;
            };
        },
        getPromocion: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true});
            HTTP.get(`promocion/${id}/`)
            .then((response) => {
                self.datos = response.data;
                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
                console.log(err);
            });
        },
        addPromocion: function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });
            this.$validator.validateAll()
            .then(function(response){
                if (response) {

                    HTTP.post('/promocion/', self.datos)
                    .then((response) => {
                        if(response.data.error){
                            notifier.alert('Ocurrio un error al guardar');
                        }
                        else{
                            notifier.success('El Promoción se Guardo correctamente');
                            self.accion = 'promocion_update';
                            self.titulo = "Modificar Promoción";
                            self.datos.id = response.data.id;
                        }

                    })
                    .catch((err) => {
                        store.dispatch({type: 'setLoading',value: false });
                        console.log(err);
                    });
                }
                store.dispatch({type: 'setLoading',value: false });
            });
        },
        updatePromocion: function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });

            HTTP.put(`/promocion/${self.datos.id}/`, self.datos)
            .then((response) => {
                store.dispatch({type: 'setLoading',value: false });
                if(response.data.error ){
                    notifier.alert('Ocurrio un error al guardar la Promoción');
                }
                else{
                    notifier.success('El Promoción se Guardo correctamente');
                    self.accion = 'promocion_update';
                    self.titulo = "Modificar Promoción";
                    self.datos.id = response.data.id;
                }
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            })
        },

    },
    created: function() {

    },
    watch:{
        titulo: function (val) {
            this.titulo = val;
        }

    },
    mounted: function() {
        let self = this;

        switch (this.accion) {
            case 'promocion_update':
                self.titulo = "Modificar Promoción";
                self.getTransportista(self.idUpdate);
                break;
        };
    },
    template: `
        <div class="card col-md-10">
            <div class="card-header"><h4 class="card-title">  {{ titulo }}</h4></div>
            <div class="card-body">
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Nombre*</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('nombre'), 
                                        'has-success': !errors.first('nombre') && datos.nombre !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="nombre" id="nombre" 
                                    placeholder="Nombre"  
                                    v-model='datos.nombre'
                                    v-validate="'required:true|maxCustom:100|alphanumeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('nombre') && datos.nombre == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('nombre')"
                                        class="help error">{{ errors.first('nombre') }}
                                    </span>
                                </div> 
                            </div>  
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Prcentaje*</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('porcentaje'), 
                                        'has-success': !errors.first('porcentaje') && datos.porcentaje !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="porcentaje" id="porcentaje" 
                                    placeholder="porcentaje"  
                                    v-model='datos.porcentaje'
                                    v-validate="'required:true|maxCustom:3|numeric|porcentaje'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('porcentaje') && datos.porcentaje == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('porcentaje')"
                                        class="help error">{{ errors.first('porcentaje') }}
                                    </span>
                                </div> 
                            </div>  
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6 pr-1">
                        <div class="form-group">
                            <label>Fecha Expiracion</label>
                            <date-picker 
                                :disabled="!datos.expiracion"
                                id="date_picker"
                                v-model="datos.fecha_expiracion" 
                                :config="{format: 'DD/MM/YYYY', locale: 'es'}">
                                :useCurrent='true' 
                                :language="es"   
                            </date-picker>
                        </div>
                    </div>
                    <div class="col-md-2 mt-lg-4">
                        <div class="form-group">
                            <label>Expira</label>
                            <input type="checkbox" id="expiracion" value="true" v-model="datos.expiracion">
                        </div>
                    </div>
                    
                </div>
                
                <div class="row">
                    <div class="col-md-2 mt-lg-4">
                        <div class="form-group">
                            <label>Activo</label>
                            <input type="checkbox" id="expiracion" value="true" v-model="datos.activo">
                        </div>
                    </div>
                </div>
               
                
                <div class="row">                        
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Descripción</label>
                            <div id="comment-add" :class="{ 'custom-actions': true, ' has-error': errors.first('description'), 
		                        'has-success': !errors.first('description') && datos.description !== '' }">
                            <textarea 
                                name="description"
                                id="description"
                                rows="5"
                                maxlength="197"
                                placeholder="Descripción"
                                v-model='datos.description'
                                v-validate="'maxCustom:198|remarks'"
                                :class="{'input': true, 'has-error': errors.first('description'), 'form-control': true }" 
                            >
                            </textarea>
                            
                            <div class="errors help-block" id="comment-error">
                                <span v-show="errors.first('description')"
                                    class="help error">{{ errors.first('description') }}
                                </span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-right">
                        <button 
                            @click="cancelar()"
                            type="button" 
                            class="btn btn-secondary m-progress" 
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            class="btn btn-primary"
                            @click="guardar()"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>`

});

var promocion = new Vue({
    el: '#promocion',
    delimiters: ['${','}'],
    data: {
        titulo:'Agregar Promoción',
        turno: [],
        tipo: '',
        loading: false,
        currentTurno: {},
        message: null,
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
                name: 'porcentaje',
                title: 'Porcentaje',
                sortField: 'porcentaje'
            },
            {
                name: 'fecha_expiracion',
                title: 'Fecha Expiración',
                sortField: 'fecha_expiracion'
            },
            {
                name: 'expiracion',
                title: 'Expiracion',
                sortField: 'expiracion'
            },
            {
                name: 'activo',
                title: 'Activo',
                sortField: 'activo'
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
        showPromocion: false,
        id_update: 0,
    },
    mounted: function() {
        //this.getTurnos();
    },
    methods: {
        onPaginationData: function(paginationData) {
            this.$refs.paginationPromocion.setPaginationData(paginationData)
        },
        show_promocion:function(value){
            let self = this;
            if(value){
                self.showPromocion = value;
            }
            else{
                self.showPromocion = value;
                self.tipo = 'promocion';
                self.refresh();
            }
        },
        deletePromocion: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true });
            HTTP.delete(`/promocion/${id}/`)
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
            this.deletePromocion(rowData.id);
        },
        addPromocion: function () {
            let self = this;
            self.titulo = "Agregar Promoción";
            self.tipo = 'promocion';
            self.show_promocion(true);
        },
        editRow: function (value) {
            let self = this;
            self.id_update = value.id;
            self.titulo = "Modificar Promoción";
            self.tipo = 'promocion_update';
            self.show_promocion(true);
        },
        onLoading: function() {

        },
        refresh: function() {
            let self = this;
            self.$nextTick(()=>{
              self.$refs.vuetablePromocion.refresh();
              store.dispatch({type: 'setLoading',value: false });
            })
        },
        onLoaded:function () {

        }
    }

});