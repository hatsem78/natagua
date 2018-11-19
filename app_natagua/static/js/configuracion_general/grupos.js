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
                edad_minima:'',
                edad_maxima: '',
                complejo:'',
                turno: '',
            },
            complejos: [],
            turnos:[],
            selecteTurno: null,
            selecteComplejo: null,
            profesores: [],
            SelectProfesores: [],
            grupoProfesores: [],
            profesoresSeleccionados: [],
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
            store.dispatch({type: 'setLoading',value: true});
            HTTP.get(`grupos/${id}/`)
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
                    self.datos['profesor'] = [1,2,3];
                    self.datos['complejo_id'] = self.selecteComplejo.id;
                    self.datos['turno_id'] = self.selecteTurno.id;
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
        enterSeleccionGrupoProfesor(e){
            console.log(e)
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
            console.log(e)
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

    },
    created: function() {

    },
    watch:{
        titulo: function (val) {
            this.titulo = val;
        },
    },
    mounted: function() {
        let self = this;

        switch (this.accion) {
            case 'grupos_update':
                self.titulo = "Modificar Grupos";
                self.getTransportista(self.idUpdate);
                break;
        }

        self.getAllComplejo();
        self.getAllProfesores();
        self.getAllTurnos();
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
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Edad minima</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('edad_minima'), 
                                        'has-success': !errors.first('edad_minima') && datos.edad_minima !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="edad_minima" id="edad_minima" 
                                    placeholder="Edad Minima"  
                                    v-model='datos.edad_minima'
                                    v-validate="'maxCustom:5|numeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('edad_minima') && datos.edad_minima == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('edad_minima')"
                                        class="help error">{{ errors.first('edad_minima') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Edad Maxima</label>
                            <div  :class="[
                                      { 
                                        'has-error': errors.first('edad_maxima'), 
                                        'has-success': !errors.first('edad_maxima') && datos.edad_maxima !== ''
                                      }, 
                                      ]">
                                      
                                <input 
                                    type="text" 
                                    name="edad_maxima" id="edad_maxima" 
                                    placeholder="Edad Maxima"  
                                    v-model='datos.edad_maxima'
                                    v-validate="'maxCustom:5|numeric'" 
                                    :class="{
                                        'input': true, 
                                        'has-error': errors.first('edad_maxima') && datos.edad_maxima == '', 
                                        'form-control': true
                                    }"
                                >
                                <div class="errors help-block">
                                    <span v-show="errors.first('edad_maxima')"
                                        class="help error">{{ errors.first('edad_maxima') }}
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                
                </div>
                
                <div class="row">
                    <div class="col-md-4 pr-3">
                        <div class="form-group">
                            <label>Seleccionar Profesores</label>
                            <select @keydown="enterSeleccionProfesor"   v-model="SelectProfesores" multiple class="form-control custom-select">
                                 <option @dblclick="deleteSeleccionProfesor(SelectProfesores)"  @keydown="enterSeleccionProfesor" v-for="profesor in profesores" :value='profesor' :key="profesor.id">
                                   {{ profesor.nombre }}
                                 </option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="col-md-4 pl-2">
                        <div class="form-group">
                            <label>Grupo Profesores</label>
                            <select @keydown="enterSeleccionGrupoProfesor" v-model="profesoresSeleccionados" multiple class="form-control custom-select">
                                 <option @dblclick="deleteSeleccionGrupoProfesor(profesoresSeleccionados)"  v-for="profesor in grupoProfesores" :value='profesor' :key="profesor.id">
                                   {{ profesor.nombre }}
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