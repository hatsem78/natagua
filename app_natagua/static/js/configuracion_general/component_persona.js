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
Vue.component("v-select", VueSelect.VueSelect);

Vue.component('persona',{
    props:{
        tipo:{
            type: String,
            default: 'transportista'
        },
        id_update: null,
        titulo_new: {
            type: String,
            default: 'Agregar Transportista'
        },
    },
    inject:['$validator'],
    data(){
        return {
            accion: this.tipo,
            titulo: this.titulo_new,
            datos:{
                id:'',
                apellido:'',
                nombre:'',
                edad:'',
                dni: '',
                direccion:'',
                celular:'',
                telefono: '',
                entre_calle:'',
                cbu:'',
                email:'',
                description:'',
                sexo:'M',
                codigo_postal: '',
                fecha_nacimiento: '',
            },
            provincias: [],
            selecteProvincia: null,
            localidades: [{ id: -1, nombre: 'Seleccione ...'}],
            selecteLocalidad: null,
            date: null,
            config: {
            // https://momentjs.com/docs/#/displaying/
              format: 'DD/MM/YYYY h:mm:ss',
              useCurrent: false,
              showClear: true,
              showClose: true,
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
                case 'transportista':
                    self.titulo = 'Agregar Transportista';
                    self.addTransportista();
                    break;
                case 'transportista_update':
                    self.titulo = "Modificar Transportista";
                    self.updateTransportista();
                    break;
                case 'profesor':
                    self.titulo = 'Agregar Profesor';
                    self.addProfesor();
                    break;
                case 'profesor_update':
                    self.titulo = "Modificar Profesor";
                    self.updateProfesor();
                    break;
                default:
                    status = false;
            };
        },
        getTransportista: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true});
            HTTP.get(`transportista/${id}/`)
            .then((response) => {
                self.datos = response.data;
                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
                console.log(err);
            });
        },
        addTransportista: function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });
            this.$validator.validateAll()
            .then(function(response){
                if (response) {
                    self.datos['id_provincia'] = self.selecteProvincia.id;
                    self.datos['id_localidad'] = self.selecteLocalidad.id;
                    HTTP.post('/transportista/', self.datos)
                    .then((response) => {
                        store.dispatch({type: 'setLoading',value: false });
                        if(response.data.error && response.data.error.indexOf('UNIQUE constraint failed: app_natagua_transportista.dni') >= 0){
                            notifier.alert('El documento ya se encuentra registrado');
                        }
                        else{
                            notifier.success('El transportista se Guardo correctamente');
                            self.accion = 'transportista_update';
                            self.titulo = "Modificar Transportista";
                            self.datos.id = response.data.id;
                        }

                    })
                    .catch((err) => {
                        store.dispatch({type: 'setLoading',value: false });
                        console.log(err);
                    });
                }
            });
        },
        updateTransportista: function () {
            let self = this;
            self.datos['id_provincia'] = self.selecteProvincia.id;
            self.datos['id_localidad'] = self.selecteLocalidad.id;

            store.dispatch({type: 'setLoading',value: true });

            HTTP.put(`/transportista/${self.datos.id}/`, self.datos)
            .then((response) => {
                store.dispatch({type: 'setLoading',value: false });
                if(response.data.error && response.data.error.indexOf('UNIQUE constraint failed: app_natagua_transportista.dni') >= 0){
                    notifier.alert('El documento ya se encuentra registrado');
                }
                else{
                    notifier.success('El transportista se Guardo correctamente');
                    self.accion = 'transportista_update';
                    self.titulo = "Modificar Transportista";
                    self.datos.id = response.data.id;
                }


            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            })
        },

        getProfesor: function (id) {
            let self = this;
            store.dispatch({type: 'setLoading',value: true});
            HTTP.get(`profesor/${id}/`)
            .then((response) => {
                self.datos = response.data;
                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
                console.log(err);
            });
        },
        addProfesor: function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });
            this.$validator.validateAll()
            .then(function(response){
                if (response) {
                    self.datos['id_provincia'] = self.selecteProvincia.id;
                    self.datos['id_localidad'] = self.selecteLocalidad.id;
                    HTTP.post('/profesor/', self.datos)
                    .then((response) => {
                        store.dispatch({type: 'setLoading',value: false });
                        if(response.data.error && response.data.error.indexOf('UNIQUE constraint failed: app_natagua_profesor.dni') >= 0){
                            notifier.alert('El documento ya se encuentra registrado');
                        }
                        else{
                            notifier.success('El profesor se Guardo correctamente');
                            self.accion = 'profesor_update';
                            self.titulo = "Modificar Profesor";
                            self.datos.id = response.data.id;
                        }

                    })
                    .catch((err) => {
                        store.dispatch({type: 'setLoading',value: false });
                        console.log(err);
                    });
                }
            });
        },
        updateProfesor: function () {
            let self = this;
            self.datos['id_provincia'] = self.selecteProvincia.id;
            self.datos['id_localidad'] = self.selecteLocalidad.id;

            store.dispatch({type: 'setLoading',value: true });

            HTTP.put(`/profesor/${self.datos.id}/`, self.datos)
            .then((response) => {
                store.dispatch({type: 'setLoading',value: false });
                if(response.data.error && response.data.error.indexOf('UNIQUE constraint failed: app_natagua_profesor.dni') >= 0){
                    notifier.alert('El documento ya se encuentra registrado');
                }
                else{
                    notifier.success('El profesor se Guardo correctamente');
                    self.accion = 'profesor_update';
                    self.titulo = "Modificar Profesor";
                    self.datos.id = response.data.id;
                }


            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            })
        },
        getProvincias(){
            let self = this;
            HTTP.get(`provincia`)
            .then((response) => {
                self.provincias = response.data;
                self.selecteProvincia = response.data[0];
                self.getProvinciaLocalidad(response.data[0].id)
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            });
        },
        getProvinciaLocalidad(id){
            let self = this;

            HTTP.get(
                '/localidad/', {
                    params: {
                         id_provincia: id,
                    }
                }
            )
            .then((response) => {
                self.localidades = response.data;
                self.selecteLocalidad = response.data[0];
            })
            .catch((err) => {

                console.log(err);
            });
        },
        getLocalidad(id){
            let self = this;

            HTTP.get(
                '/localidad/', {
                    params: {
                         id: id,
                    }
                }
            )
            .then((response) => {
                console.log(response.data)
                self.datos.codigo_postal = response.data[0].codigopostal

            })
            .catch((err) => {
                console.log(err);
            });
        }
    },
    created: function() {

    },
    watch:{
        selecteProvincia: function (val) {
            let self = this;
            self.getProvinciaLocalidad(val.id);

        },
        selecteLocalidad: function (val) {
            let self = this;
            self.getLocalidad(val.id);
        },
        titulo: function (val) {
            this.titulo = val;
        }

    },
    mounted: function() {
        let self = this;

        switch (this.accion) {
            case 'transportista_update':
                self.titulo = "Modificar Transportista";
                self.getTransportista(self.idUpdate);
                break;
            case 'profesor_update':
                self.titulo = "Modificar Profesor";
                self.getProfesor(self.idUpdate);
                break;
        };

        self.getProvincias();
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
                                v-model="datos.fecha_nacimiento" 
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
                            <select v-model="datos.sexo" class="form-control">
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
                                        'has-error': errors.first('email'), 
                                        'has-success': !errors.first('email') && datos.email !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="email" id="email" 
                                    placeholder="Email"  
                                    v-model='datos.email'
                                    v-validate="'required:true|maxCustom:100|email_custom'" 
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
                            <label>Celular</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('celular'), 
                                        'has-success': !errors.first('celular') && datos.celular !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="celular" id="celular" 
                                    placeholder="Celular"  
                                    v-model='datos.celular'
                                    v-validate="'required:true|max:20|numeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('celular') && datos.celular == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('celular')"
                                        class="help error">{{ errors.first('celular') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
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
                                    v-validate="'required:false|max:20|numeric'" 
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
                            <label>Provincia</label>
                            <v-select label="nombre" :options="provincias" v-model="selecteProvincia"></v-select>
                        </div>
                    </div>
                    <div class="col-md-4 px-1">
                        <div class="form-group">
                            <label>Localidad</label>
                            <v-select label="nombre" :options="localidades" v-model="selecteLocalidad"></v-select>
                        </div>
                    </div>
                    <div class="col-md-4 pl-1">
                        <div class="form-group">
                            <label>Código Postal</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('codigo_postal'), 
                                        'has-success': !errors.first('codigo_postal') && datos.codigo_postal !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="codigo_postal" id="codigo_postal" 
                                    placeholder="Código Postal"  
                                    v-model='datos.codigo_postal'
                                    v-validate="'maxCustom:5|numeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('codigo_postal') && datos.codigo_postal == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('codigo_postal')"
                                        class="help error">{{ errors.first('codigo_postal') }}
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
