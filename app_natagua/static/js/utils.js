var csrftoken = $("#tocken").val();
const eventBus = new Vue();

const HTTP = axios.create({
    baseURL: '/' + API_PREFIX,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    }
});

const urlApi = URL_PREFIX + '/booking/';


moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    relativeTime: {
        future: 'Faltan %s',
        d: '%d día',
        dd: '%d días'
    }
});

const today = moment({ hour: '00', minute: '00' });

axios.defaults.headers.common['X-CSRFToken'] = csrftoken;


Vue.filter('truncate', function (text, stop, clamp) {
    return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
});

const padStart = function (replace, char, value) {
    let result = '';
    for( var x = value.length; x < replace; x++ ) {
        result += char;
    }

    return result+value;
};

Vue.use(uiv, {prefix: 'uiv'});

Vue.use(VeeValidate, {
	inject: false,
});


VeeValidate.Validator.extend('alpha', {
	getMessage: field => {
		return ('Se ingresaron caracteres invalidos')
	},
  	validate: value => /^[a-zA-Z]+$/.test(value)
});


VeeValidate.Validator.extend('alpha_lastname', {
	getMessage: field => {
		return ('Se ingresaron caracteres invalidos')
	},
  	validate: value => /^[a-zA-Z\/\ ]+$/.test(value)
});

VeeValidate.Validator.extend('duplicate_passenger', {
    getMessage: field => {
		return ('No pueden existir dos pasajeros con el mismo nombre y segundo nombre en la reserva!')
	},
    validate(value, obj) {
        let input = obj[0];
        let inputFirstName = $("#"+"firstname"+input.key[0]).val();
        if( input.control[0] !== undefined && input.control[0].indexOf((value +inputFirstName).toUpperCase()) > -1){
            return false;
        }
        else {
            return true;
        }
    }
});


VeeValidate.Validator.extend('alphanumeric', {
	getMessage: field => {
		return ('Se ingresaron caracteres invalidos')
	},
  	validate: value => /^[A-Za-z0-9]+$/.test(value)
});


VeeValidate.Validator.extend('maxCustom', {
	getMessage: (field, args) => {
		return ('Ha superado el límite de texto, el cual es de '+args+' caracteres')
	},
  	validate(value, option) {
        if(value.length > parseInt(option[0])){
            return false;
        }
        else {
            return true;
        }
    }
});

VeeValidate.Validator.extend('required', {
	getMessage: field => {
		return ('Este campo es requerido')
	},
  	validate(value, option) {
	    if(value === null || value === undefined || value == '' || value.length <= 0){
            return false;
        }
        else {
            return true;
        }
    }
});

VeeValidate.Validator.extend('numeric', {
	getMessage: field => {
		return ('Se ingresaron caracteres invalidos')
	},
  	validate: value => /^[0-9]+$/.test(value)
});

VeeValidate.Validator.extend('hours', {
	getMessage: field => {
		return ('Formato correcto debe ser HH:MM')
	},
  	validate: (value) => new Promise(resolve => {
        let regex = new RegExp("([0-1][0-9]|2[0-3]):([0-5][0-9])");
        resolve({
            valid: value && regex.test(value)
        });
    })
});

VeeValidate.Validator.extend('hours_format', {
	getMessage: field => {
		return ('Formato correcto debe ser HH:MM')
	},
  	validate: (value) => new Promise(resolve => {
        let regex = new RegExp("(\\d{2}):(\\d{2})");
        resolve({
            valid: value && regex.test(value)
        });
    })
});

VeeValidate.Validator.extend('hours_value', {
	getMessage: field => {
		return ('La hora debe estar entre 00:00 y 23:59')
	},
  	validate: (value) => new Promise(resolve => {
        let regex = new RegExp("([0-1][0-9]|2[0-3]):([0-5][0-9])");
        resolve({
            valid: value && regex.test(value)
        });
    })
});

VeeValidate.Validator.extend('min_hours', {
	getMessage: (field, [args]) => {
		return  ('La hora debe ser superior o igual a ') + args.minTime;
	},
  	validate: (value, [args]) => new Promise(resolve => {
        if (args.checkTime && value.match(/^\d{2}:\d{2}$/)) {
            resolve({
                valid: value >= args.minTime,
            });
        } else {
            resolve(true);
        }
    })
});

VeeValidate.Validator.extend('remarks', {
	getMessage: field => {
		return (`Se ingresaron caracteres invalidos`);
	},
  	validate: value => /^[A-Za-z0-9\*\.\-\@\?\/\ ]+$/.test(value)
});

VeeValidate.Validator.extend('email_custom', {
	getMessage: field => {
		return (`Dirección de correo electrónico no válida`);
	},
  	validate: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$/.test(value)
});
