Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
Vue.component('vuetable', window.Vuetable.Vuetable);
$("#configuracion_general").addClass('is-expanded');
$("#menu_grupos").addClass('active');
$("#dashboard").removeClass('active');
Vue.component("v-select", VueSelect.VueSelect);

Vue.component('grupos_action',{
    props:{
        tipo:{
            type: String,
            default: 'grupos'
        },
        id_update: null,
        titulo_new: {
            type: String,
            default: 'Agregar grupos'
        },
    },
    inject:['$validator'],
    data(){
        return {
            accion: this.tipo,
            titulo: this.titulo_new,
            datos:{
                id:'',
                edad_min:'',
                edad_max: '',
                complejo:'',
                turno: '',
            },
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
            profesores: [],
            SelectProfesores: [],
            grupoProfesores: [],
            profesoresSeleccionados: [],
            alumnos: [],
            alumnosFilter: [],
            SelectAlumnos: [],
            grupoAlumnos: [],
            alumnosSeleccionados: [],
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
                case 'grupos':
                    self.titulo = 'Agregar grupos';
                    self.addGrupos();
                    break;
                case 'grupos_update':
                    self.titulo = "Modificar Grupos";
                    self.updateGrupos();
                    break;
                default:
                    break;
            };
        },
        getGrupos: function (id) {
            let self = this;

            HTTP.get(`grupos/${id}/`)
            .then((response) => {

                self.datos = response.data;
                let selecte_mes = self.mes.filter((value, index, array) => {
                    if(parseInt(self.datos.mes) == value.id){
                        return value
                    }
                });

                self.datos.selecteMes = selecte_mes;

                let select_profesor = self.profesores.filter((value, index, array) => {
                    let obj = Object.values(self.datos.profesor).find((o, i) => {
                        if (o === value.id ) {
                           return  o;
                        }
                    });
                    return obj
                });

                self.grupoProfesores = select_profesor;


                self.grupoProfesores.filter((value, index, array) => {
                    let info = self.profesores.indexOf(value);
                    if (info > -1) {
                        self.profesores.splice(info, 1);
                    }
                });


                let select_alumno = self.alumnos.filter((value, index, array) => {
                    let obj = Object.values(self.datos.alumno).find((o, i) => {
                        if (o === value.id ) {
                           return  o;
                        }
                    });
                    return obj
                });

                self.grupoAlumnos = select_alumno;

                self.grupoAlumnos.filter((value, index, array) => {
                    let info = self.alumnos.indexOf(value);
                    if (info > -1) {
                        self.alumnos.splice(info, 1);
                    }
                });

                self.datos.id = id;

                self.selecteMes = selecteMes;

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
        enterSeleccionGrupoProfesor(e){

            if(e.key === 'Enter' || e.key == 'ArrowLeft') {
                let self = this;
                let val = self.profesoresSeleccionados;
                if(self.grupoProfesores.length == 1 ){
                    let index = self.grupoProfesores.indexOf(val[0]);
                    if (index > -1) {
                        self.grupoProfesores.splice(index, 1);
                        self.profesores.push(val[0]);
                        self.profesoresSeleccionados = [] ;
                    }
                }else{
                    for(seleccion in val){
                        let index = self.grupoProfesores.indexOf(val[seleccion]);
                        self.grupoProfesores.splice(index, 1);
                        self.profesores.push(val[seleccion]);
                    }
                    self.profesoresSeleccionados = [] ;
                }

            }
        },
        deleteSeleccionGrupoProfesor(val){
            let self = this;

            let index = self.grupoProfesores.indexOf(val[0]);
            if (index > -1) {
                self.grupoProfesores.splice(index, 1);
                self.profesores.push(val[0]);
            }
        },
        enterSeleccionProfesor(e){
            if(e.key === 'Enter' || e.key == 'ArrowRight') {
                let self = this;
                let val = self.SelectProfesores;
                if(self.profesores.length == 1 ){
                    let index = self.profesores.indexOf(val[0]);
                    if (index > -1) {
                        self.profesores.splice(index, 1);
                        self.grupoProfesores.push(val[0]);
                        self.SelectProfesores = [];
                    }
                }else{
                    for(seleccion in val){
                        let index = self.profesores.indexOf(val[seleccion]);
                        self.profesores.splice(index, 1);
                        self.grupoProfesores.push(val[seleccion]);
                    }
                    self.SelectProfesores = []
                }

            }
        },
        deleteSeleccionProfesor(val){
            let self = this;
            let index = self.profesores.indexOf(val[0]);
            if (index > -1) {
                self.profesores.splice(index, 1);
                self.grupoProfesores.push(val[0]);
            }
        },
        enterSeleccionGrupoAlumno(e){

            if(e.key === 'Enter' || e.key == 'ArrowLeft') {
                let self = this;
                let val = self.alumnosSeleccionados;
                if(self.grupoAlumnos.length == 1 ){
                    let index = self.grupoAlumnos.indexOf(val[0]);
                    if (index > -1) {
                        self.grupoAlumnos.splice(index, 1);
                        self.alumnos.push(val[0]);
                        self.alumnosSeleccionados = [] ;
                    }
                }else{
                    for(seleccion in val){
                        let index = self.grupoAlumnos.indexOf(val[seleccion]);
                        self.grupoAlumnos.splice(index, 1);
                        self.alumnos.push(val[seleccion]);
                    }
                    self.alumnosSeleccionados = [] ;
                }
            }
        },
        deleteSeleccionGrupoAlumno(val){
            let self = this;

            let index = self.grupoAlumnos.indexOf(val[0]);
            if (index > -1) {
                self.grupoAlumnos.splice(index, 1);
                self.alumnos.push(val[0]);
            }
        },
        enterSeleccionAlumno(e){
            if(e.key === 'Enter' || e.key == 'ArrowRight') {
                let self = this;
                let val = self.SelectAlumnos;
                if(self.alumnos.length == 1 ){
                    let index = self.alumnos.indexOf(val[0]);
                    if (index > -1) {
                        self.alumnos.splice(index, 1);
                        self.grupoAlumnos.push(val[0]);
                        self.SelectAlumnos = [];
                    }
                }else{
                    for(seleccion in val){
                        let index = self.alumnos.indexOf(val[seleccion]);
                        self.alumnos.splice(index, 1);
                        self.grupoAlumnos.push(val[seleccion]);
                    }
                    self.SelectAlumnos = []
                }
            }
        },
        deleteSeleccionAlumno(val){
            let self = this;
            let index = self.alumnos.indexOf(val[0]);
            if (index > -1) {
                self.alumnos.splice(index, 1);
                self.grupoAlumnos.push(val[0]);
            }
        },
        filterAlumnoEdad(value){
            let self = this;
            if(self.datos.edad_min == ''){
                return value
            }
            else if((value.edad >= self.datos.edad_min) && (value.edad <= self.datos.edad_max) ){
                return value
            }
        }
    },
    created: function() {

    },
    watch:{
        titulo: function (val) {
            this.titulo = val;
        },
        'datos.edad_min': function (val) {
            let self = this;
            if(val >= self.datos.edad_max && self.datos.edad_max != '' ){
                self.datos.edad_max = val;
            }
            else if(self.datos.edad_max == '' ){
                self.datos.edad_max = val;
            }
            self.alumnos = self.alumnosFilter.filter(self.filterAlumnoEdad)
        },
        'datos.edad_max': function (val) {
            let self = this;
            self.alumnos = self.alumnosFilter.filter(self.filterAlumnoEdad)
        }
    },
    mounted: function() {
        let self = this;

        self.getAllTurnos();
        self.getAllComplejo();
        self.getAllProfesores();
        self.getAllAlumnos();

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
            <div class="card-header"><h4 class="card-title">  {{ titulo }}</h4></div>
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
                    
                    
                </div>
                
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Edad minima</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('edad_min'), 
                                        'has-success': !errors.first('edad_min') && datos.edad_min !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="edad_min" id="edad_min" 
                                    placeholder="Edad Minima"  
                                    v-model='datos.edad_min'
                                    v-validate="'required: true|maxCustom:5|numeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('edad_min') && datos.edad_min == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('edad_min')"
                                        class="help error">{{ errors.first('edad_min') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Edad Maxima</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('edad_max'), 
                                        'has-success': !errors.first('edad_max') && datos.edad_max !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    :disabled="datos.edad_min == ''"
                                    type="text" 
                                    name="edad_max" id="edad_max" 
                                    placeholder="Edad Maxima"  
                                    v-model='datos.edad_max'
                                    v-validate="'required: true|maxCustom:5|numeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('edad_max') && datos.edad_max == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('edad_max')"
                                        class="help error">{{ errors.first('edad_max') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Mes</label>
                            <v-select label="nombre" :options="mes" v-model="selecteMes"></v-select>
                        </div>
                    </div>
                
                </div>
                
                <!-- Lista Profesores-->
                <div class="row">
                    <div class="col-md-4 pr-3">
                        <div class="form-group">
                            <label>Seleccionar Profesores</label>
                            <select 
                                @keydown="enterSeleccionProfesor"   
                                v-model="SelectProfesores" 
                                multiple class="form-control custom-select">
                                <option 
                                    @dblclick="deleteSeleccionProfesor(SelectProfesores)"  
                                    @keydown="enterSeleccionProfesor" 
                                    v-for="profesor in profesores" :value='profesor' 
                                    :key="profesor.id"
                                >
                                   {{ profesor.nombre }}
                                </option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="col-md-4 pl-2">
                        <div class="form-group">
                            <label>Grupo Profesores</label>
                            <select 
                                @keydown="enterSeleccionGrupoProfesor" 
                                v-model="profesoresSeleccionados" 
                                multiple class="form-control custom-select">
                                <option 
                                    @dblclick="deleteSeleccionGrupoProfesor(profesoresSeleccionados)"  
                                    v-for="profesor in grupoProfesores" :value='profesor' 
                                    :key="profesor.id"
                                >
                                   {{ profesor.nombre }}
                                 </option>
                            </select>
                        </div>
                    </div>
                    
                    
                </div>
                
                <!-- Lista Alumnos
                    SelectAlumnos: [],
            grupoAlumnos: [],
            alumnosSeleccionados: [],
                -->
                <div class="row">
                    <div class="col-md-4 pr-3">
                        <div class="form-group">
                            <label>Seleccionar Alumnos</label>
                            <select 
                                @keydown="enterSeleccionAlumno"   
                                v-model="SelectAlumnos" multiple class="form-control custom-select">
                                <option 
                                    @dblclick="deleteSeleccionAlumno(SelectAlumnos)"  
                                    @keydown="enterSeleccionAlumno"  
                                    v-for="alumno in alumnos" :value='alumno' :key="alumno.id"
                                >
                                   {{ alumno.nombre }}
                                </option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="col-md-4 pl-2">
                        <div class="form-group">
                            <label>Grupo Alumnos</label>
                            <select 
                                @keydown="enterSeleccionGrupoAlumno" 
                                v-model="alumnosSeleccionados" multiple class="form-control custom-select">
                                 <option 
                                    @dblclick="deleteSeleccionGrupoAlumno(alumnosSeleccionados)"  
                                    v-for="alumno in grupoAlumnos" 
                                    :value='alumno' 
                                    :key="alumno.id"
                                 >
                                   {{ alumno.nombre }}
                                 </option>
                            </select>
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


var grupos = new Vue({
    el: '#grupos',
    delimiters: ['${','}'],
    data: {
        titulo:'Agregar Grupos',
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
                name: 'get_turno_name',
                title: 'Turno',
                sortField: 'get_turno_name'
            },
            {
                name: 'get_edad',
                title: 'Edad',
                sortField: 'get_edad'
            },
            {
                name: 'get_profesor',
                title: 'Profesores Asignados',
                sortField: 'get_profesor'
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
        showGrupos: false,
        id_update: 0,
    },
    mounted: function() {
        //this.getTurnos();
    },
    methods: {
        onPaginationData: function(paginationData) {
            this.$refs.paginationGrupos.setPaginationData(paginationData)
        },
        show_grupos:function(value){
            let self = this;
            if(value){
                self.showGrupos = value;
            }
            else{
                self.showGrupos = value;
                self.tipo = 'grupos';
                self.refresh();
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
        deleteRow: function(rowData){
            this.deleteGrupos(rowData.id);
        },
        addGrupos: function () {
            let self = this;
            self.titulo = "Agregar Grupos";
            self.tipo = 'grupos';
            self.show_grupos(true);
        },
        editRow: function (value) {
            let self = this;
            self.id_update = value.id;
            self.titulo = "Modificar Grupos";
            self.tipo = 'grupos_update';
            self.show_grupos(true);
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

        }
    }

});