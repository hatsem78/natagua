Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
Vue.component('vuetable', window.Vuetable.Vuetable);
$("#configuracion_general").removeClass('is-expanded');
$("#pagos").addClass('active');
$("#dashboard").removeClass('active');


Vue.component("v-select", VueSelect.VueSelect);

Vue.component("impresion_factura",{
    props:{
        dato_alumno:{
            default: {},
            tipy: Object,
        },
        complejo: null

    },
    data(){
       return {
           titulo: 'Impresión Factura',
           fecha: moment().format('DD-MM-YYYY'),
       }
    },
    methods:{
        imprimir: function () {
            $('.invoice').printThis({
                importCSS: true,
            });
        }

    },
    mounted(){
        $('#impresion_factura').modal('toggle');
    },
    template:`
    <div class="modal fade show" id="impresion_factura" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" width="100">
        <div class="modal-dialog modal-lg" role="document">

            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="title_impresion_factura" v-text="titulo"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                    
                <div class="modal-body">
                    <div class="tile imprimir">
                        
                        <section class="invoice">
                            <div class="row mb-4">
                                <div class="col-6">
                                  <h2 class="page-header"><i class="fa fa-globe"></i> Natagua</h2>
                                  <strong>Complejo:</strong> <span>{{ complejo }}</span>
                                </div>
                                <div class="col-6">
                                  <h5 class="text-right">Fecha: {{ fecha }}</h5>
                                </div>
                            </div>
                            <div class="row invoice-info">
                                <div class="col-6">
                                    <h5>Alumno</h5>
                                    <address class="pl-4">
                                        <strong>{{ dato_alumno.get_alumno.fullName }}</strong>
                                        <br>D.N.I: {{ dato_alumno.get_alumno.dni }}
                                        <br>Dirección: {{ dato_alumno.get_alumno.direccion }}
                                        <br>Email: {{ dato_alumno.get_alumno.email }}
                                    </address>
                                </div>
                                <div class="col-6">
                                    <h5>Natagua</h5>
                                    <address class="pl-4">
                                        C.U.I.T: 13213213131
                                        <br>Dirección: jhgjhgjgjgj
                                        <br>Email: prueba@gmail.com
                                        <br>Tel: 132134654613213
                                    </address>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 table-responsive">
                                    <table class="table-print table ">
                                        <thead>
                                            <tr>
                                                <th>Descripcón</th>
                                                <th class="text-right" >Subtotal</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="dato_alumno.cuota">
                                            <td>Cuota</td>
                                            <td class="text-right">{{ dato_alumno.cuota }}</td>
                                        </tr>
                                        <tr v-if="dato_alumno.matricula">
                                            <td>Matricula</td>
                                            <td class="text-right">{{ dato_alumno.matricula }}</td>
                                        </tr>
                                        <tr v-if="dato_alumno.transporte">
                                            <td>Transporte</td>
                                            <td class="text-right">{{ dato_alumno.transporte }}</td>
                                        </tr>
                                        <tr v-if="dato_alumno.pre_hora">
                                            <td>Pre-hora</td>
                                            <td class="text-right">{{ dato_alumno.pre_hora }}</td>
                                        </tr>
                                        
                                        <tr v-if="dato_alumno.pago_parcial">
                                            <td>Pago Parcial</td>
                                            <td class="text-right">{{ dato_alumno.pago_parcial }}</td>
                                        </tr>
                                        
                                    </tbody>
                                  </table>
                                    <div class="col-12 text-right" style="font-size: 1rem;" >
                                         Total a Pagar: <strong>{{ dato_alumno.total_pagar }}</strong>
                                         <br>
                                         Faltante Pago: <strong>{{ dato_alumno.faltante }}</strong>
                                    </div>
                                </div>
                            </div>
                            
                        </section>
                    </div>
                </div>
                <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-default m-progress" 
                        data-dismiss="modal">
                        Cancelar
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-primary m-progress" 
                        
                        @click="imprimir">
                        Imprimir
                    </button>
                </div>
                
            </div>
        </div>

    </div>    
   `
});

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
                forma_pago: '',
                promocion_id: 0,

            },
            factura_datos: {},
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
            idUpdate: this.id_update,
            promocion: [],
            selectPromocion: null,
            show_impresion: false,

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
            .then(async (response) => {

                if(response.data.error ){
                    notifier.alert('Ocurrio un error');
                }
                else{

                    self.datos.id = response.data.id;
                    self.factura_datos= {
                        id: '',
                        listado_pago_id: this.datos.id,
                        fecha: this.pago.fecha,
                        pago: this.pago_parcial,
                    };
                    self.accion = 'pago_update';
                    self.titulo = "Modificar Pago";
                    let resultado = await self.addFacturaPago();
                    if(resultado){
                        notifier.success('El Pago se guardo');
                    }
                    else{
                        notifier.alert('Ocurrio un error al guardar factura');
                    }

                }


                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
                console.log(err);
            });
        },
        addFacturaPago(){
            let self = this;

            store.dispatch({type: 'setLoading',value: true});
            return new Promise(resolve => {

                HTTP.post(`factura_pagos/`,self.factura_datos)
                .then((response) => {

                    if(response.data.error ){
                        notifier.alert('Ocurrio un error');
                        resolve(false);
                    }
                    else{
                        /*notifier.success('El Pago se guardo');
                        self.accion = 'pago_update';
                        self.titulo = "Modificar Pago";
                        self.datos.id = response.data.id*/;
                        resolve(true);
                    }


                    store.dispatch({type: 'setLoading',value: false});
                })
                .catch((err) => {
                    store.dispatch({type: 'setLoading',value: false});
                    console.log(err);
                    resolve(false);
                });
            });

        },
        updatePago: async function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });

            self.datos['complejo_id'] = self.selecteComplejo[0].id;
            self.datos['turno_id'] = self.selecteTurno[0].id;
            self.datos['mes'] = self.selecteMes.id;
            self.datos['fecha'] = `01-${self.selecteMes.id}-${self.anio}`;
            self.datos['forma_pago'] = self.selectFormaPago.id;
            self.datos['promocion_id'] = self.selectPromocion.id;



            HTTP.put(`/listado_pagos/${self.datos.id}/`, self.datos)
            .then(async (response) => {
                store.dispatch({type: 'setLoading',value: false });
                if(response.data.error ){
                    notifier.alert('Se genero un error al guardar');
                }
                else{

                    self.factura_datos= {
                        id: '',
                        listado_pago_id: this.datos.id,
                        fecha: this.datos.fecha,
                        pago: this.datos.pago_parcial,
                    };
                    self.accion = 'pago_update';
                    self.titulo = "Modificar Pago";
                    let resultado = await self.addFacturaPago();
                    if(resultado){
                        notifier.success('El Pago se Guardo correctamente');
                    }
                    else{
                        notifier.alert('Ocurrio un error al guardar factura');
                    }
                }
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            })
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
                    get_fullName: response.data.get_alumno.fullName,
                };

                self.selecteTurno = null;
                self.selecteComplejo = self.complejos.filter((elemento) => elemento.id == self.datos.complejo_id);
                self.selecteTurno = self.turnos.filter((elemento) => elemento.id == self.datos.turno_id);
                self.selecteMes = self.mes[mes];
                self.selectFormaPago = null;
                self.selectFormaPago = self.formaPago.filter((elemento) => elemento.id == self.datos.forma_pago);
                self.selectFormaPago = self.selectFormaPago[0];

                self.selectPromocion = self.promocion[0];;
                let resultado  = self.promocion.filter((elemento) => elemento.id == self.datos.promocion_id);
                if(Object.keys(resultado).length > 0){
                    self.selectPromocion = resultado[0];
                }



                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
                console.log(err);
            });
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
        getAllPromocion(){
            let self = this;
            HTTP.get(`promocion`)
            .then((response) => {
                const listado = response.data.map((promocion) => {
                    return {
                        id: promocion.id,
                        nombre: promocion.nombre,
                        porcentaje: promocion.porcentaje
                    }
                });
                self.promocion = listado;
                self.promocion.unshift({
                    id: -1,
                    nombre: 'Seleccionar',
                    porcentaje: 0
                });
                self.selectPromocion = self.promocion[0];
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
        calcular: function () {
            let self = this;
            self.datos.total_pagar =(
                parseFloat(self.datos.cuota)+
                parseFloat(self.datos.transporte)+
                parseFloat(self.datos.pre_hora)+
                parseFloat(self.datos.matricula)
            ).toFixed(2);
            if(self.selectPromocion.id > -1){
                self.datos.total_pagar = (self.datos.total_pagar / parseFloat('1.'+self.selectPromocion.porcentaje)).toFixed(2);
            }

             if(isNaN(self.datos.pago_parcial)){
                self.calcular();
            }
            else{
                self.datos.faltante = (parseFloat(self.datos.total_pagar) - parseFloat(self.datos.pago_parcial)).toFixed(2);
            }
        },
        pagoParcial: function () {
            let self = this;

            if(isNaN(self.datos.pago_parcial)){
                self.calcular();
            }
            else{
                self.datos.faltante = parseFloat(self.datos.total_pagar) - parseFloat(self.datos.pago_parcial).toFixed(2);
            }
        },
        show_factura(val){

            let self = this;
            if(val){
                self.show_impresion = true;
                $('#impresion_factura').modal('toggle');
            }
            else{
                $('#impresion_factura').modal('toggle');
            }
            $('#impresion_factura').modal('toggle');
        },

    },
    created: function() {

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
            else{
                this.datos.faltante = parseFloat(val).toFixed(2);
            }
        },
        selectPromocion: function (val) {
            this.calcular();
        }
    },
    mounted: function() {
        let self = this;

        self.getAllTurnos();
        self.getAllComplejo();
        self.getAllPromocion();


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
    <div>
        <div class="card col-md-12">
           <div class="card-header">
                <div class="input-group-append" >
                    <h4 class="card-title">  {{ titulo }}</h4>  <h4>/</h4> 
                    <h4 class="card-title">{{ datos.alumno.get_fullName }}</h4>
                    
                </div>
            </div>
                                
           <div class="card-body">
           
                <div class="row">  
                     <div class="col-md-3">
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
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Forma De Pago</label>
                            <v-select label="nombre" :options="formaPago" v-model="selectFormaPago"></v-select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Promación</label>
                            <v-select label="nombre" :options="promocion" v-model="selectPromocion"></v-select>
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
                                        'has-error': (datos.faltante > 0), 
                                        'has-success': (datos.faltante <= 0)
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
                                        'has-error': (datos.faltante > 0), 
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
                    
                    <div class="col-2 text-right d-print-none mt-4" v-if="datos.pago_parcial > 0">
                        <a href="#" class="btn btn-outline-info"
                            @click="show_factura(true)"
                            data-toggle="modal"
                            data-target="#impresion_factura"
                         >
                        <i class="fa fa-ticket"></i> Factura</a>
                    </div>
                </div>
                
                <div class="row">                        
                    <div class="col-md-6">
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
                
                <!--botones -->
                <div class="row">
                    <div class="col-md-8 text-right">
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
            
        </div>
        <impresion_factura
            v-if="show_impresion"
            :dato_alumno="datos"  
            :complejo="selecteComplejo[0].nombre"  
        >

        </impresion_factura>
        
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
                name: 'get_alumno.fullName',
                title: 'Alumno',
                sortField: 'get_alumno.fullName'
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



