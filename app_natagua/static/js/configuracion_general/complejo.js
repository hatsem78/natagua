Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
Vue.component('vuetable', window.Vuetable.Vuetable);
$("#configuracion_general").addClass('is-expanded');
$("#menu_complejo").addClass('active');
$("#dashboard").removeClass('active');

Vue.component('complejo_action',{
    props:{
        tipo:{
            type: String,
            default: 'complejo'
        },
        id_update: null,
        titulo_new: {
            type: String,
            default: 'Agregar Complejo'
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
                telefono: '',
                direccion:'',
                email: '',
            },
            idUpdate: this.id_update
        }
    },
    methods:{
        cancelar: function(){
            this.$emit('close');
        },
        guardar: function () {
            let self = this;
            switch (this.accion) {
                case 'complejo':
                    self.titulo = 'Agregar Complejo';
                    self.addComplejo();
                    break;
                case 'complejo_update':
                    self.titulo = "Modificar Complejo";
                    self.updateComplejo();
                    break;
                default:
                    break;
            };
        },
        getComplejo: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true});
            HTTP.get(`complejo/${id}/`)
            .then((response) => {
                self.datos = response.data;
                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
                console.log(err);
            });
        },
        addComplejo: function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });
            this.$validator.validateAll()
            .then(function(response){
                if (response) {

                    HTTP.post('/complejo/', self.datos)
                    .then((response) => {
                        if(response.data.error && response.data.error.indexOf('UNIQUE constraint failed: app_natagua_complejo.nombre') >= 0){
                            notifier.alert('El Complejo ya se encuentra registrado');
                        }
                        else{
                            notifier.success('El Complejo se Guardo correctamente');
                            self.accion = 'complejo_update';
                            self.titulo = "Modificar Complejo";
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
        updateComplejo: function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });

            HTTP.put(`/complejo/${self.datos.id}/`, self.datos)
            .then((response) => {
                store.dispatch({type: 'setLoading',value: false });
                if(response.data.error && response.data.error.indexOf('UNIQUE constraint failed: app_natagua_complejo.nombre') >= 0){
                    notifier.alert('El Complejo ya se encuentra registrado');
                }
                else{
                    notifier.success('El Complejo se Guardo correctamente');
                    self.accion = 'complejo_update';
                    self.titulo = "Modificar Complejo";
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
            case 'complejo_update':
                self.titulo = "Modificar Complejo";
                self.getTransportista(self.idUpdate);
                break;
        };
    },
    template: `
        <div class="card col-md-10">
            <div class="card-header"><h4 class="card-title">  {{ titulo }}</h4></div>
            <div class="card-body">
                
                <div class="row">
                    <div class="col-md-6 pl-1">
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
                                    v-validate="'required:true|max:127|alphanumeric'" 
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
                            <label>Email</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('email'), 
                                        'has-success': !errors.first('email') && datos.email !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="email" id="email" 
                                    placeholder="Email"  
                                    v-model='datos.email'
                                    v-validate="'maxCustom:100|email_custom'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('email') && datos.email == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('email')"
                                        class="help error">{{ errors.first('email') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6 pr-1">
                        <div class="form-group">
                            <label>Teléfono</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('telefono'), 
                                        'has-success': !errors.first('telefono') && datos.telefono !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="telefono" 
                                    name="telefono" id="telefono" 
                                    placeholder="Teléfono"  
                                    v-model='datos.telefono'
                                    v-validate="'max:20|numeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('telefono') && datos.telefono == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('telefono')"
                                        class="help error">{{ errors.first('telefono') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Dirección</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('direccion'), 
                                        'has-success': !errors.first('direccion') && datos.direccion !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="direccion" id="direccion" 
                                    placeholder="Dirección"  
                                    v-model='datos.direccion'
                                    v-validate="'maxCustom:100|alphanumeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('direccion') && datos.direccion == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('direccion')"
                                        class="help error">{{ errors.first('direccion') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
               
                
                <div class="row">                        
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Descripción</label>
                            <div id="comment-add" :class="{ 'custom-actions': true, ' has-error': errors.first('comentario'), 
		                        'has-success': !errors.first('comentario') && datos.description !== '' }">
                            <textarea 
                                name="comentario"
                                id="comentario"
                                rows="5"
                                maxlength="197"
                                placeholder="Descripción"
                                v-model='datos.description'
                                v-validate="'maxCustom:198|remarks'"
                                :class="{'input': true, 'has-error': errors.first('comentario'), 'form-control': true }" 
                            >
                            </textarea>
                            
                            <div class="errors help-block" id="comment-error">
                                <span v-show="errors.first('comentario')"
                                    class="help error">{{ errors.first('comentario') }}
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

var complejo = new Vue({
    el: '#complejos',
    delimiters: ['${','}'],
    data: {
        titulo:'Agregar Complejo',
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
                name: 'telefono',
                title: 'Teléfono',
                sortField: 'telefono'
            },
            {
                name: 'direccion',
                title: 'Dirección',
                sortField: 'direccion'
            },
            {
                name: 'email',
                title: 'Email',
                sortField: 'email'
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
        showComplejo: false,
        id_update: 0,
    },
    mounted: function() {
        //this.getTurnos();
    },
    methods: {
        onPaginationData: function(paginationData) {
            this.$refs.paginationComplejo.setPaginationData(paginationData)
        },
        show_complejo:function(value){
            let self = this;
            if(value){
                self.showComplejo = value;
            }
            else{
                self.showComplejo = value;
                self.tipo = 'complejo';
                self.refresh();
            }
        },
        deleteComplejo: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true });
            HTTP.delete(`/complejo/${id}/`)
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
            this.deleteComplejo(rowData.id);
        },
        addComplejo: function () {
            let self = this;
            self.titulo = "Agregar Complejo";
            self.tipo = 'complejo';
            self.show_complejo(true);
        },
        editRow: function (value) {
            let self = this;
            self.id_update = value.id;
            self.titulo = "Modificar Complejo";
            self.tipo = 'complejo_update';
            self.show_complejo(true);
        },
        onLoading: function() {

        },
        refresh: function() {
            let self = this;
            self.$nextTick(()=>{
              self.$refs.vuetableComplejo.refresh();
              store.dispatch({type: 'setLoading',value: false });
            })
        },
        onLoaded:function () {

        }
    }

});