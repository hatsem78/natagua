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
                pre_hora: 0,
                transporte: 0,
                pago_parcial: 0,
                total_pagar: 0,
                faltante: 0,
                description: '',
                forma_pago: ''
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
            formaPago: [
                { id: 1, nombre:'Efectivo'},
                { id: 2, nombre:'CBU'},
                { id: 3, nombre:'Factura'},
            ],
            selectFormaPago: { id: 1, nombre:'Efectivo'},
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
                case 'pago_update':
                    self.titulo = "Modificar Pagos";
                    self.updatePago();
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
            self.datos['forma_pago'] = self.selectFormaPago.id;


            store.dispatch({type: 'setLoading',value: true});
            HTTP.post(`listado_pagos/`,self.datos)
            .then((response) => {

                if(response.data.error ){
                    notifier.alert('Ocurrio un error');
                }
                else{
                    notifier.success('El Pago se guardo');
                    self.accion = 'pago_update';
                    self.titulo = "Modificar Pago";
                    self.datos.id = response.data.id;
                }


                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
                console.log(err);
            });
        },
        updatePago: function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });

            self.datos['complejo_id'] = self.selecteComplejo[0].id;
            self.datos['turno_id'] = self.selecteTurno[0].id;
            self.datos['mes'] = self.selecteMes.id;
            self.datos['fecha'] = `01-${self.selecteMes.id}-${self.anio}`;
            self.datos['forma_pago'] = self.selectFormaPago.id;


            HTTP.put(`/listado_pagos/${self.datos.id}/`, self.datos)
            .then((response) => {
                store.dispatch({type: 'setLoading',value: false });
                if(response.data.error ){
                    notifier.alert('Se genero un error al guardar');
                }
                else{
                    notifier.success('El Pago se Guardo correctamente');
                    self.accion = 'pago_update';
                    self.titulo = "Modificar Pago";
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
        getPago: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true});
            HTTP.get(`listado_pagos/${id}/`)
            .then((response) => {
                var dia_hoy = new moment(response.data.fecha, 'YYYY-MM-DD');
                self.anio =dia_hoy.year();

                mes =dia_hoy.month();

                self.datos = response.data;
                self.datos.total_pagar = 0.00;
                self.datos['alumno'] = {
                    id: response.data.alumno_id,
                    get_fullName: response.data.get_alumno,
                };

                self.selecteTurno = null;
                self.selecteComplejo = self.complejos.filter((elemento) => elemento.id == self.datos.complejo_id);
                self.selecteTurno = self.turnos.filter((elemento) => elemento.id == self.datos.turno_id);
                self.selecteMes = self.mes[mes];
                self.selectFormaPago = null;
                self.selectFormaPago = self.formaPago.filter((elemento) => elemento.id == self.datos.forma_pago);
                self.selectFormaPago = self.selectFormaPago[0];


                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
                console.log(err);
            });
        },
        calcular: function () {
            this.datos.total_pagar =(
                parseFloat(this.datos.cuota)+
                parseFloat(this.datos.transporte)+
                parseFloat(this.datos.pre_hora)+
                parseFloat(this.datos.matricula)
            );
        },
        pagoParcial: function () {
            let self = this;

            if(isNaN(self.datos.pago_parcial)){
                self.calcular();
            }
            else{
                self.datos.faltante = parseFloat(self.datos.total_pagar) - parseFloat(self.datos.pago_parcial);
            }
        }
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
        'datos.cuota': function (val) {
            this.calcular();
        },
        'datos.matricula': function (val) {
            this.calcular();
        },
        'datos.transporte': function (val) {
            this.calcular();
        },
        'datos.pre_hora': function (val) {
            this.calcular();
        },'datos.pago_parcial': function (val) {
            this.pagoParcial();
        },'datos.total_pagar': function (val) {
            if(isNaN(val)){
                this.datos.total_pagar = parseFloat('0.00').toFixed(2);
            }
        }
        ,'datos.faltante': function (val) {
            if(isNaN(val) || parseFloat(val) <= 0){
                this.datos.faltante = parseFloat('0.00').toFixed(2);
            }
        }
    },
    mounted: function() {
        let self = this;

        self.getAllTurnos();
        self.getAllComplejo();
        self.getAllProfesores();


        var dia_hoy = new Date();
        self.anio =dia_hoy.getFullYear();

        switch (this.accion) {
            case 'pago_update':
                self.titulo = "Modificar Pagos";
                store.dispatch({type: 'setLoading',value: true});
                setTimeout(function(){ self.getPago(self.idUpdate); }, 300);


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
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Forma De Pago</label>
                            <v-select label="nombre" :options="formaPago" v-model="selectFormaPago"></v-select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Promación</label>
                            <v-select label="nombre" :options="formaPago" v-model="selectFormaPago"></v-select>
                        </div>
                    </div>
                </div>
            
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Complejo</label>
                            <v-select label="nombre" :options="complejos" v-model="selecteComplejo"></v-select>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Turnos</label>
                            <v-select label="nombre" :options="turnos" v-model="selecteTurno"></v-select>
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
                            <label>Pre Hora</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('pre_hora'), 
                                        'has-success': !errors.first('pre_hora') && datos.pre_hora !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="pre_hora" id="pre_hora" 
                                    placeholder=""  
                                    v-model='datos.pre_hora'
                                    v-validate="'required: true|maxCustom:10|decimal'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('pre_hora') && datos.pre_hora == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('pre_hora')"
                                        class="help error">{{ errors.first('pre_hora') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                   
                   
                    
                
                </div>
                    
                <div class="row">
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
                                    :disabled="true"
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
                                    :disabled="true"
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
                
                
                
                <div class="row">                        
                    <div class="col-md-8">
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
                    <div class="col-4 text-right d-print-none mt-4">
                        <a href="javascript:window.print();" target="_blank" class="btn btn-primary">
                        <i class="fa fa-print"></i> Print</a></div>
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
                            :disabled="parseFloat(datos.total_pagar) <= 0"
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
        onChangePage: function(page) {
            this.$refs.vuetable.changePage(page)
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
        showTablaPago: true,
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
                self.showTablaPago = true;
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
                self.showTablaPago = true;
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
            self.showTablaPago = false;
        },
        editRow: function (value) {
            let self = this;
            self.id_update = value.id;
            self.titulo = "Modificar Pago";
            self.tipo = 'pago_update';
            self.showTablaPago = false;
            self.show_pagos(true);

        },
    }

});



