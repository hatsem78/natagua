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

//WTrjW5aPKYW8wATg_6m4BQ
Vue.component('date-picker', VueBootstrapDatetimePicker);


Vue.component('persona',{
    props:{
        tipo:{
            type: String,
            default: 'transportista'
        }
    },
    inject:['$validator'],
    data(){
        return {
            titulo: 'Agregar Transportista',
            datos:{
                id:'',
                apellido:'',
                nombre:'',
                edad:'',
                dni: '',
                direccion:'',
                celular:'',
                entre_calle:'',
                cbu:'',
                mail:'',
                description:'',
                sexo:'',
                cod_postal: '',
                fecha_nacimiento: '',
            },
            date: null,
            config: {
            // https://momentjs.com/docs/#/displaying/
              format: 'DD/MM/YYYY h:mm:ss',
              useCurrent: false,
              showClear: true,
              showClose: true,
            }

        }
    },
    methods:{
        cancelar: function(){
            this.$emit('close');
        },
        guardar: function () {

            switch (this.tipo) {
                case 'transportista':
                    this.$validator.validateAll();
                    this.addTransportista();
                    break;
                default:
                    status = false;
            };
            return status;

        },
        addTransportista: function () {
            let self = this;
            self.loading = true;
            HTTP.post('/transportista/', this.datos)
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
        updateTransportista: function () {
            let self = this;
            self.loading = true;
            HTTP.put(`/transportista/${self.datos.id}/`, self.datos)
            .then((response) => {
                self.loading = false;
                self.refresh();

            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
        },

    },
    created: function() {

    },
    watch:{
        tipo: function () {
            let self = this;

        }

    },
    template: `
        <div class="card col-md-10">
            <div class="card-header"><h4 class="card-title">  {{ titulo }}</h4></div>
            <div class="card-body">
                
                <div class="row">
                    <div class="col-md-6 pr-1">
                        <div class="form-group">
                            <label>Apellido*</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('apellido'), 
                                        'has-success': !errors.first('apellido') && datos.apellido !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="apellido" id="apellido" 
                                    placeholder="Apellido"  
                                    v-model='datos.apellido'
                                    v-validate="'required:true|max:127|alphanumeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('apellido') && datos.apellido == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('apellido')"
                                        class="help error">{{ errors.first('apellido') }}
                                    </span>
                                </div> 
                            </div>  
                        </div>
                    </div>
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
                    <div class="col-md-3 pr-1">
                        <div class="form-group">
                            <label>Documento*</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('dni'), 
                                        'has-success': !errors.first('dni') && datos.dni !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="dni" id="dni" 
                                    placeholder="D.N.I"  
                                    v-model='datos.dni'
                                    v-validate="'required:true|max:20|numeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('dni') && datos.dni == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('dni')"
                                        class="help error">{{ errors.first('dni') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-3 pr-1">
                        <div class="form-group">
                            <label>Fecha Nac.*</label>
                            <date-picker 
                            id="date_picker"
                                v-model="date" 
                                :config="{format: 'DD/MM/YYYY', locale: 'es'}">
                                :useCurrent='true' 
                                :language="es"   
                            </date-picker>
                        </div>
                    </div>
                    
                    <div class="col-md-3 px-1">
                        <div class="form-group">
                            <label>Edad*</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('edad'), 
                                        'has-success': !errors.first('edad') && datos.edad !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="edad" id="edad" 
                                    placeholder="Edad"  
                                    v-model='datos.edad'
                                    v-validate="'required:true|maxCustom:3|numeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('edad') && datos.edad == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('edad')"
                                        class="help error">{{ errors.first('edad') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 pl-1">
                        <div class="form-group">
                            <label for="">Sexo*</label>
                            <select class="form-control">
                                <option value="M">Mujer</option>
                                <option value="H">Hombre</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Email*</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('mail'), 
                                        'has-success': !errors.first('mail') && datos.mail !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="mail" id="mail" 
                                    placeholder="Email"  
                                    v-model='datos.mail'
                                    v-validate="'required:true|maxCustom:100|email'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('mail') && datos.mail == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('mail')"
                                        class="help error">{{ errors.first('mail') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Dirección*</label>
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
                                    v-validate="'required:true|maxCustom:100|alphanumeric'" 
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
                            <label>Entre calle</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('entre_calle'), 
                                        'has-success': !errors.first('entre_calle') && datos.entre_calle !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="entre_calle" id="entre_calle" 
                                    placeholder="Entre calle"  
                                    v-model='datos.entre_calle'
                                    v-validate="'required:true|maxCustom:100|alphanumeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('entre_calle') && datos.entre_calle == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('entre_calle')"
                                        class="help error">{{ errors.first('entre_calle') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 pr-1">
                        <div class="form-group">
                            <label>Partido</label>
                            <input type="text" class="form-control" placeholder="Partido" value="">
                        </div>
                    </div>
                    <div class="col-md-4 px-1">
                        <div class="form-group">
                            <label>Barrio</label>
                            <input type="text" class="form-control" placeholder="Barrio" value="">
                        </div>
                    </div>
                    <div class="col-md-4 pl-1">
                        <div class="form-group">
                            <label>Código Postal</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('cod_postal'), 
                                        'has-success': !errors.first('cod_postal') && datos.cod_postal !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="cod_postal" id="cod_postal" 
                                    placeholder="Código Postal"  
                                    v-model='datos.cod_postal'
                                    v-validate="'maxCustom:5|numeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('cod_postal') && datos.cod_postal == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('cod_postal')"
                                        class="help error">{{ errors.first('cod_postal') }}
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


$(function () {
    $('#date_picker').datetimepicker({
        locale: 'ru'
    });
});