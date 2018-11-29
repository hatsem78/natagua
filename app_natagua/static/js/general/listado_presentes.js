Vue.component('vuetable-pagination', window.Vuetable.VuetablePagination);
Vue.component('vuetable', window.Vuetable.Vuetable);
$("#configuracion_general").removeClass('is-expanded');
$("#listado_presentes").addClass('active');
$("#dashboard").removeClass('active');


Vue.component("v-select", VueSelect.VueSelect);

Vue.component('lista_alumnos',{
    props:{
        tipo:{
            type: String,
            default: 'presente'
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
                grupo_id: this.id_update,
            },
            dias_presentes: {},
            profesores: [],
            SelectProfesores: [],
            alumnos: [],
            alumnosFilter: [],
            listHabliitados: [],
            idUpdate: this.id_update,
            fecha: [],
            selectedLunes: [],
            selectedMartes: [],
            selectedMiercoles: [],
            selectedJueves: [],
            selectedViernes: [],
            showAhora: false,
            numeroDiaSemana: 0,
        }
    },
    methods:{
        cancelar: function(){
            this.$emit('close');
        },
        guardar: function () {
            let self = this;
            switch (this.accion) {
                case 'presente':
                    self.titulo = 'Agregar grupos';
                    self.addPresentes();
                    break;
                case 'presente_update':
                    self.titulo = "Modificar Grupos";
                    self.updateGrupos();
                    break;
                default:
                    break;
            };
        },
        getPresente: function () {
            let self = this;

            let filter = {
                date_start: self.fecha[1],
                date_end: self.fecha[5],
                grupo_id: self.idUpdate
            };
            store.dispatch({type: 'setLoading',value: true});
            HTTP.get(`listado_presente/`,{ params: filter })
            .then((response) => {

                let resultado = response.data.map((datos) => {

                    let indice = self.fecha.indexOf(datos.getfecha);

                    self.dias_presentes[indice] = datos;
                    switch (indice){
                        case 1:
                            self.selectedLunes = datos.alumnos;
                            if(indice == self.numeroDiaSemana) self.accion = 'presente_update';
                            break;
                        case 2:
                            self.selectedMartes = datos.alumnos;
                            if(indice == self.numeroDiaSemana) self.accion = 'presente_update';
                            break;
                        case 3:
                            self.selectedMiercoles = datos.alumnos;
                            if(indice == self.numeroDiaSemana) self.accion = 'presente_update';
                            break;
                        case 4:
                            self.selectedJueves = datos.alumnos;
                            if(indice == self.numeroDiaSemana) self.accion = 'presente_update';
                            break;
                        case 5:
                            self.selectedViernes = datos.alumnos;
                            if(indice == self.numeroDiaSemana) self.accion = 'presente_update';
                            break;
                    }
                });

                self.showAhora = true;
                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
                console.log(err);
            });
        },
        addPresentes: function () {
            let self = this;

            store.dispatch({type: 'setLoading',value: true });
            this.$validator.validateAll()
            .then(function(response){
                if (response) {
                    switch (self.numeroDiaSemana){
                        case 1:
                            self.datos['fecha'] = self.fecha[self.numeroDiaSemana];
                            self.datos['alumnos'] = self.selectedLunes;
                            break;
                        case 2:
                            self.datos['fecha'] = self.fecha[self.numeroDiaSemana];
                            self.datos['alumnos'] = self.selectedMartes;
                            break;
                        case 3:
                            self.datos['fecha'] = self.fecha[self.numeroDiaSemana];
                            self.datos['alumnos'] = self.selectedMiercoles;
                            break;
                        case 4:
                            self.datos['fecha'] = self.fecha[self.numeroDiaSemana];
                            self.datos['alumnos'] = self.selectedJueves;
                            break;
                        case 5:
                            self.datos['fecha'] = self.fecha[self.numeroDiaSemana];
                            self.datos['alumnos'] = self.selectedViernes;
                            break;
                    }

                    self.datos['grupo_id'] = self.id_update;
                    HTTP.post('/listado_presente/', self.datos)
                    .then((response) => {
                        if(response.data.error ){
                            notifier.alert('Ocurrio un error en el sestema');
                        }
                        else{
                            notifier.success('El Grupos se Guardo correctamente');
                            self.accion = 'presente_update';
                            self.datos.id = response.data.id;
                            self.getPresente();
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
            switch (self.numeroDiaSemana){
                case 1:
                    self.datos['fecha'] = self.fecha[self.numeroDiaSemana];
                    self.datos['alumnos'] = self.selectedLunes;
                    break;
                case 2:
                    self.datos['fecha'] = self.fecha[self.numeroDiaSemana];
                    self.datos['alumnos'] = self.selectedMartes;
                    break;
                case 3:
                    self.datos['fecha'] = self.fecha[self.numeroDiaSemana];
                    self.datos['alumnos'] = self.selectedMiercoles;
                    break;
                case 4:
                    self.datos['fecha'] = self.fecha[self.numeroDiaSemana];
                    self.datos['alumnos'] = self.selectedJueves;
                    break;
                case 5:
                    self.datos['fecha'] = self.fecha[self.numeroDiaSemana];
                    self.datos['alumnos'] = self.selectedViernes;
                    break;
            }

            let id  = Object.values(self.dias_presentes).map((elemento) => {
                if (elemento.getfecha === self.fecha[self.numeroDiaSemana] ) {
                   return  elemento.id;
                }
            });
            self.datos.id = id[0];
            HTTP.put(`/listado_presente/${self.datos.id}/`, self.datos)
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
        getAllProfesores(){
            let self = this;
            self.titulo = '';
            HTTP.get(`profesor`)
            .then((response) => {
                const listado = response.data.map((profesor) => {
                    self.titulo += `${profesor.apellido} ${profesor.nombre}, `;
                    return {
                        id: profesor.id,
                        nombre:`${profesor.apellido} ${profesor.nombre}`
                    }
                });
                self.profesores = listado;
                self.titulo = self.titulo.substr(0, (self.titulo.length-2)) + '.';
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false });
                console.log(err);
            });
        },
        getGrupos: function (id) {
            let self = this;

            HTTP.get(`grupos/${self.id_update}/`)
            .then((response) => {

               // get_profesor


                //get_profesor

                store.dispatch({type: 'setLoading',value: false});
            })
            .catch((err) => {
                store.dispatch({type: 'setLoading',value: false});
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
        selectAll: function(value) {
            console.log(value);
        }
    },
    created: function() {

    },
    watch:{
        titulo: function (val) {
            this.titulo = val;
        },
        dias_presentes: function (val) {
            this.dias_presentes = val;
        }
    },
    mounted: function() {
        let self = this;

        var dia_hoy = new Date(),
            numero_dia = dia_hoy.getUTCDay(),
            limite = 0;
        self.numeroDiaSemana = numero_dia;
        console.log(self.numeroDiaSemana);
        if(numero_dia >= 0 &&  numero_dia <= 6){
            for( x = 1; x <= numero_dia; x++){
                self.listHabliitados.push(x);
            }

            for( z = 0; z <= numero_dia; z++){
                if(z < numero_dia ){
                    self.fecha.unshift(moment(dia_hoy).subtract(z, 'days').format('DD-MM-YYYY'));
                    limite = z;
                }
            }

            let mas_dia = 0;
            for( x = limite; x <= 6; x++){

                if(x >= numero_dia ){
                    self.fecha.push(moment(dia_hoy).add(mas_dia, 'days').format('DD-MM-YYYY'));
                }
                 mas_dia +=1;
            }
        }

        self.getAllProfesores();
        self.getGrupos();
        self.getAllAlumnos();
        self.getPresente();

    },
    template: `
        <div class="col-md-12">
            <div class="card-header">
                <h3 class="line-head">  Profesores a Cargo</h3>
                <h4 class="card-title"> {{ titulo }} </h4>
            </div>
            <div class="card-body" v-if="showAhora">
                <div class="row title">
                <h5 class="tile-title-w-btn">Semana: {{ fecha[1] }} / {{ fecha[6] }}.</h5>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Alumno</th>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miercoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            <tr  v-for="key, element in alumnos">
                            <td>{{ key.id }}</td>
                            <td>{{ key.apellido }} {{ key.nombre.split(',')[0] }}</td>
                            <td>
                                <input :disabled='(listHabliitados.indexOf(1)<= -1)' type="checkbox" v-model="selectedLunes" :value=" key.id " number>
                            </td>
                            <td>
                                <input 
                                :disabled='(listHabliitados.indexOf(2)<= -1)' 
                                type="checkbox" 
                                v-model="selectedMartes" 
                                :value="key.id" number>
                            </td>
                            
                            <td>
                                <input :disabled='(listHabliitados.indexOf(3)<= -1)' type="checkbox" v-model="selectedMiercoles" :value="key.id" number>
                            </td>
                            
                            <td>
                                <input :disabled='(listHabliitados.indexOf(4)<= -1)' type="checkbox" v-model="selectedJueves" :value="key.id" number>
                            </td>
                            
                            <td>
                                <input :disabled='(listHabliitados.indexOf(5)<= -1)' type="checkbox" v-model="selectedViernes" :value="key.id" number>
                            </td>
                        </tr>
                        
                      </tbody>
                    </table>
                    
                
                </div>
                
                <!--botones -->
                <div class="row ">
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
    el: '#alumnos_presentes',
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
                self.tipo = 'presente';
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
        presentes: function (value) {
            let self = this;
            self.id_update = value.id;
            self.titulo = "Listado presentes";
            self.tipo = 'presente';
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



