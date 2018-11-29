Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
Vue.component('vuetable', window.Vuetable.Vuetable);
$("#configuracion_general").removeClass('is-expanded');
$("#pagos").addClass('active');
$("#dashboard").removeClass('active');


Vue.component("v-select", VueSelect.VueSelect);

Vue.component('pagos_action',{
    props:{
        tipo:{
            type: String,
            default: 'pagos'
        },
        id_update: null,
        titulo_new: {
            type: String,
            default: 'Alta de Pagos'
        },
        data_alumno: null,
    },
    inject:['$validator'],
    data(){
        return {
            accion: this.tipo,
            titulo: this.titulo_new,
            datos:{
                id:'',
                complejo_id:'',
                turno_id: '',
                alumno:this.data_alumno,
                cuota: 0,
                matricula:0,
                transporte: 0,
                pago_parcial: 0,
                total_pagar: 0,
                faltante: 0,
            },
            anio: '',
            mes: [
                { id: 1, nombre: 'Enero'},
                { id: 2, nombre: 'Febrero'},
                { id: 3, nombre: 'Marzo'},
                { id: 4, nombre: 'Abril'},
                { id: 5, nombre: 'Mayo'},
                { id: 6, nombre: 'Junio'},
                { id: 7, nombre: 'Julio'},
                { id: 8, nombre: 'Agosto'},
                { id: 9, nombre: 'Septiembre'},
                { id: 10, nombre: 'Octubre'},
                { id: 11, nombre: 'Noviembre'},
                { id: 12, nombre: 'Diciembre'}
            ],
            selecteMes: { id: 1, nombre: 'Enero'},
            complejos: [],
            turnos:[],
            selecteTurno: null,
            selecteComplejo: null,
            alumnos: [],
            SelectAlumnos: [],
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
                case 'pagos':
                    self.titulo = 'Alta de Pagos';
                    self.addPagos();
                    break;
                case 'grupos_update':
                    self.titulo = "Modificar Pagos";
                    self.updateGrupos();
                    break;
                default:
                    break;
            };
        },
        addPagos: function (id) {
            let self = this;

            self.datos['fecha'] = `01-${self.selecteMes.id}-${self.anio}`;
            self.datos['complejo_id'] = self.selecteComplejo.id;
            self.datos['turno_id'] = self.selecteTurno.id;
            self.datos['alumno_id'] = self.datos.alumno.id;


            store.dispatch({type: 'setLoading',value: true});
            HTTP.post(`listado_pagos/`,self.datos)
            .then((response) => {

                self.datos = response.data;


                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
                console.log(err);
            });
        },
        addGrupos: function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });
            this.$validator.validateAll()
            .then(function(response){
                if (response) {
                    self.datos['profesor'] = self.grupoProfesores.map((profesor) => {
                        return profesor.id
                    });
                    self.datos['alumno'] = self.grupoAlumnos.map((alumno) => {
                        return alumno.id
                    });
                    self.datos['complejo_id'] = self.selecteComplejo.id;
                    self.datos['turno_id'] = self.selecteTurno.id;
                    self.datos['mes'] = self.selecteMes.id;

                    HTTP.post('/grupos/', self.datos)
                    .then((response) => {
                        if(response.data.error && response.data.error.indexOf('UNIQUE constraint failed: app_natagua_grupos.nombre') >= 0){
                            notifier.alert('El Grupos ya se encuentra registrado');
                        }
                        else{
                            notifier.success('El Grupos se Guardo correctamente');
                            self.accion = 'grupos_update';
                            self.titulo = "Modificar Grupos";
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
        updateGrupos: function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });
            self.datos['profesor'] = self.grupoProfesores.map((profesor) => {
                return profesor.id
            });
            self.datos['alumno'] = self.grupoAlumnos.map((alumno) => {
                return alumno.id
            });
            self.datos['complejo_id'] = self.selecteComplejo.id;
            self.datos['turno_id'] = self.selecteTurno.id;
            self.datos['mes'] = self.selecteMes.id;

            HTTP.put(`/grupos/${self.datos.id}/`, self.datos)
            .then((response) => {
                store.dispatch({type: 'setLoading',value: false });
                if(response.data.error && response.data.error.indexOf('UNIQUE constraint failed: app_natagua_grupos.nombre') >= 0){
                    notifier.alert('El Grupos ya se encuentra registrado');
                }
                else{
                    notifier.success('El Grupos se Guardo correctamente');
                    self.accion = 'grupos_update';
                    self.titulo = "Modificar Grupos";
                    self.datos.id = response.data.id;
                }
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            })
        },
        getAllComplejo(){
            let self = this;
            HTTP.get(`complejo`)
            .then((response) => {
                const listado = response.data.map((complejo) => {
                    return {
                        id: complejo.id,
                        nombre: complejo.nombre
                    }
                });
                self.complejos = listado;
                self.selecteComplejo = listado[0];
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            });
        },
        getAllTurnos(){
            let self = this;
            HTTP.get(`turno`)
            .then((response) => {
                const listado = response.data.map((complejo) => {
                    return {
                        id: complejo.id,
                        nombre: complejo.nombre
                    }
                });
                self.turnos = listado;
                self.selecteTurno = listado[0];
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            });
        },
        getAllProfesores(){
            let self = this;
            HTTP.get(`profesor`)
            .then((response) => {
                const listado = response.data.map((profesor) => {
                    return {
                        id: profesor.id,
                        nombre:`${profesor.apellido} ${profesor.nombre}`
                    }
                });
                self.profesores = listado;
                //self.SelectProfesores = listado[0];
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            });
        },
        getAllAlumnos(){
            let self = this;
            HTTP.get(`alumno`)
            .then((response) => {
                const listado = response.data.map((alumno) => {
                    return {
                        id: alumno.id,
                        nombre:`${alumno.apellido} ${alumno.nombre}, edad: ${alumno.edad}`,
                        edad: alumno.edad,
                    }
                });
                self.alumnos = listado;
                self.alumnosFilter = listado;
                //self.SelectProfesores = listado[0];
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            });
        },

    },
    created: function() {

    },
    mounted: function() {
        let self = this;

        var dia_hoy = new Date();
        self.anio =dia_hoy.getFullYear()


    },
    watch:{
        titulo: function (val) {
            this.titulo = val;
        },

    },
    mounted: function() {
        let self = this;

        self.getAllTurnos();
        self.getAllComplejo();
        self.getAllProfesores();


        var dia_hoy = new Date();
        self.anio =dia_hoy.getFullYear();

        switch (this.accion) {
            case 'grupos_update':
                self.titulo = "Modificar Grupos";
                store.dispatch({type: 'setLoading',value: true});
                setTimeout(function(){ self.getGrupos(self.idUpdate); }, 300);


                break;
        }
    },
    template: `
        <div class="card col-md-12">
           <div class="card-header">
                <div class="input-group-append" >
                    <h4 class="card-title">  {{ titulo }}</h4>  <h4>/</h4> 
                    <h4 class="card-title">{{ datos.alumno.get_fullName }}</h4>
                    
                </div>
            </div>
                                
           <div class="card-body">
            
                <div class="row">
                    <div class="col-md-4 pr-1">
                        <div class="form-group">
                            <label>Complejo</label>
                            <v-select label="nombre" :options="complejos" v-model="selecteComplejo"></v-select>
                        </div>
                    </div>
                    
                    <div class="col-md-4 pr-1">
                        <div class="form-group">
                            <label>Turnos</label>
                            <v-select label="nombre" :options="turnos" v-model="selecteTurno"></v-select>
                        </div>
                    </div>
                    
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Mes</label>
                            <v-select label="nombre" :options="mes" v-model="selecteMes"></v-select>
                        </div>
                    </div>
                    
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Año</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('anio'), 
                                        'has-success': !errors.first('anio') && datos.anio !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="anio" id="anio" 
                                    placeholder=""  
                                    v-model='anio'
                                    v-validate="'required: true|maxCustom:10|number'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('anio') && datos.anio == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('anio')"
                                        class="help error">{{ errors.first('anio') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div> 
                    
                </div>
                
                <div class="row">                     
                    
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Cuota</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('cuota'), 
                                        'has-success': !errors.first('cuota') && datos.cuota !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="cuota" id="cuota" 
                                    placeholder=""  
                                    v-model='datos.cuota'
                                    v-validate="'required: true|maxCustom:10|decimal'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('cuota') && datos.cuota == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('cuota')"
                                        class="help error">{{ errors.first('cuota') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                   </div> 
                   
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Matricula</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('matricula'), 
                                        'has-success': !errors.first('matricula') && datos.matricula !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="matricula" id="matricula" 
                                    placeholder=""  
                                    v-model='datos.matricula'
                                    v-validate="'required: true|maxCustom:10|decimal'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('matricula') && datos.matricula == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('matricula')"
                                        class="help error">{{ errors.first('matricula') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div> 
                    
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Transporte</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('transporte'), 
                                        'has-success': !errors.first('transporte') && datos.transporte !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="transporte" id="transporte" 
                                    placeholder=""  
                                    v-model='datos.transporte'
                                    v-validate="'required: true|maxCustom:10|decimal'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('transporte') && datos.transporte == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('transporte')"
                                        class="help error">{{ errors.first('transporte') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Pago Parcial</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('pago_parcial'), 
                                        'has-success': !errors.first('pago_parcial') && datos.pago_parcial !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="pago_parcial" id="pago_parcial" 
                                    placeholder=""  
                                    v-model='datos.pago_parcial'
                                    v-validate="'required: true|maxCustom:10|decimal'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('pago_parcial') && datos.pago_parcial == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('pago_parcial')"
                                        class="help error">{{ errors.first('pago_parcial') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <!-- : 0,
                total_pagar: 0,
                faltante: 0-->
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Debe</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('faltante'), 
                                        'has-success': !errors.first('faltante') && datos.faltante !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="faltante" id="faltante" 
                                    placeholder=""  
                                    v-model='datos.faltante'
                                    v-validate="'required: true|maxCustom:10|decimal'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('faltante') && datos.faltante == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('faltante')"
                                        class="help error">{{ errors.first('faltante') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Total Pagar</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('total_pagar'), 
                                        'has-success': !errors.first('total_pagar') && datos.total_pagar !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="total_pagar" id="total_pagar" 
                                    placeholder=""  
                                    v-model='datos.total_pagar'
                                    v-validate="'required: true|maxCustom:10|decimal'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('total_pagar') && datos.total_pagar == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('total_pagar')"
                                        class="help error">{{ errors.first('total_pagar') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                
                </div>
                
                <!--botones -->
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

Vue.component('seleccion_alumno',{
    props:{
        show:false,

    },
    component: {
        'vuetable': window.Vuetable.Vuetable,
        'vuetable-pagination': window.Vuetable.VuetablePagination,

    },
    delimiters: ['${','}'],
    data() {
        return {
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
                name: 'dni',
                title: 'D.N.I',
                sortField: 'dni'
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
        alumno_url: $("#alumno_url").val(),
        filterText: '',
        moreParams: {}
    }},
    mounted: function() {
        //this.getTurnos();
    },
    methods: {
        onPaginationData: function(paginationData) {
            //this.$refs.paginationAlumno.setPaginationData(paginationData)
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

        },
        onFilterSet () {
            if(this.filterText == ''){
                this.onFilterReset();
            }
            else{
                let self = this;
                this.moreParams['filter'] = self.filterText;
                this.$nextTick( () => this.$refs.vuetableAlumno.refresh() );
            }

		},
		onFilterReset () {
			delete this.moreParams.filter;
			this.filterText = '';
			this.$nextTick( () => this.$refs.vuetableAlumno.refresh() );
		},
        onDblClicked (data, field, event) {
            console.log(data);
            this.$emit('alumno_select',data )
        },

    },
    template: `
    <!-- Add Article Modal -->
    <div class="modal fade show" id="select_alumnos" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLongTitle" aria-hidden="true" width="100">
        <div class="modal-dialog modal-lg" role="document">

            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle" v-text="titulo"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                    
                <div class="modal-body">
                    <div class="app-search">
                        <input 
                            v-model="filterText" class="form-control" 
                            @keyup.enter="onFilterSet" 
                            placeholder="Apellido, nombre, D.N.I., Celular"
                        >
                        <div class="input-group-append" >
                            <button @keyup.enter="onFilterSet"  :disabled="filterText == ''" class="btn btn-primary" @click="onFilterSet"><i class="fa fa-search"></i></button>
                            <button :disabled="filterText == ''" class="btn btn-default" @click="onFilterReset">Reset</button>
                        </div>
                    </div>
                    
                    <vuetable
                                                   
                        ref="vuetableAlumno"
                        :api-url="alumno_url"
                        :fields="fieldes"
                        :sort-order="sortOrder"
                        :css="css.table"
                        pagination-path=""
                        :per-page="25"
                        :append-params="moreParams"
                        @vuetable:pagination-data="onPaginationData"
                        @vuetable:loading="onLoading"
                        @vuetable:loaded="onLoaded"
                        @vuetable:row-dblclicked="onDblClicked"
                        >
            
                       
                    </vuetable>
                    <vuetable-pagination v-if="!showAlumno" ref="paginationAlumno"
                          :css="css.pagination"
                          @vuetable-pagination:change-page="onChangePage">
                    </vuetable-pagination>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary m-progress" data-dismiss="modal">Cancelar</button>
                </div>
                
            </div>
        </div>

    </div>
    `
});


var pagos = new Vue({
    el: '#listado_pagos',
    delimiters: ['${','}'],
    data: {
        titulo:'Alta De Pagos',
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
                name: 'get_alumno',
                title: 'Alumno',
                sortField: 'get_alumno'
            },
            {
                name: 'cuota',
                title: 'Cuota',
                sortField: 'cuota'
            },
            {
                name: 'matricula',
                title: 'Matricula',
                sortField: 'matricula'
            },
            {
                name: 'adicional',
                title: 'Adicional',
                sortField: 'adicional'
            },
            {
                name: 'pre_hora',
                title: 'Pre Hora',
                sortField: 'pre_hora'
            },
            {
                name: 'transporte',
                title: 'Transporte',
                sortField: 'transporte'
            },
            {
                name: 'pago_parcial',
                title: 'Pago Parcial',
                sortField: 'pago_parcial'
            },
            {
                name: 'faltante',
                title: 'Debe',
                sortField: 'faltante'
            },
            {
                name: 'total_pagar',
                title: 'Total Pagar',
                sortField: 'total_pagar'
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
        showPagos: false,
        showSelectAlumnos: false,
        id_update: 0,
        dataAlumno: '',
    },
    mounted: function() {

    },
    methods: {
        onPaginationData: function(paginationData) {
            this.$refs.paginationListadoPagos.setPaginationData(paginationData)
        },
        show_pagos:function(value){
            let self = this;
            if(value){
                self.showPagos = value;
            }
            else{
                self.showPagos = value;
                self.tipo = 'presente';
                //self.refresh();
            }
        },
        show_alumnos:function(value){
            let self = this;
            if(value){
                self.showSelectAlumnos = value;
            }
            else{
                self.showSelectAlumnos = value;
            }
        },
        deleteGrupos: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true });
            HTTP.delete(`/grupos/${id}/`)
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
        altaPagos: function (value) {
            let self = this;
            //self.id_update = value.id;
            self.titulo = "Alta de Pagos";
            self.tipo = 'pagos';
            self.show_pagos(true);
        },
        onLoading: function() {

        },
        refresh: function() {
            let self = this;
            self.$nextTick(()=>{
              self.$refs.vuetableGrupos.refresh();
              store.dispatch({type: 'setLoading',value: false });
            })
        },
        onLoaded:function () {

        },
        show_cuota(data){
            let self = this;
            self.tipo = "pagos";
            self.dataAlumno = data;
            $('#select_alumnos').modal('toggle');
            self.show_pagos(true);
        }
    }

});



