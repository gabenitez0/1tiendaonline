const estadoDeLocalStorage = JSON.parse(localStorage.getItem('state'));

export let estadoInicial;
if (estadoDeLocalStorage === null || undefined) {
  estadoInicial = {
    planTienda: {},
    serviciosDiseno: [],
    serviciosPublicidad: [],
    costoTotal: 0,
  }
} else {
  estadoInicial = estadoDeLocalStorage;
}

// Este reducer recibira la información de la orden y podra ser manipulada de ser necesario
// para poder regresar información nueva.
export const ordenReducer = (state, action) => {
  switch (action.type) {

    case 'establecerPlan':
      return { ...state, planTienda: { ...action.payload } };

    case 'agregarServiciosDiseno':
      localStorage.setItem('state', JSON.stringify({...state, serviciosDiseno: [...state.serviciosDiseno, action.payload]}));
      return {...state, serviciosDiseno: [...state.serviciosDiseno, action.payload]};

    case 'modificarServiciosDiseno':
      const servicioDisenoActualizado ={
        ...state.serviciosDiseno.find(service => service.id === action.payload.id),
        qty: action.payload.qty,
        total: action.payload.total,
        necesitaAyuda: action.payload.necesitaAyuda
      };

      const serviciosDisenoActualizados = [
        ...state.serviciosDiseno.filter(service => service.id !== action.payload.id),
        servicioDisenoActualizado
      ];

      return {...state, serviciosDiseno: serviciosDisenoActualizados };

    case 'eliminarServiciosDiseno':
      localStorage.setItem('state', JSON.stringify({...state, serviciosDiseno: state.serviciosDiseno.filter(servicio => servicio.id !== action.payload.id)}));
      return {...state, serviciosDiseno: state.serviciosDiseno.filter(servicio => servicio.id !== action.payload.id)}

    case 'agregarServiciosPublicidad':
      localStorage.setItem('state', JSON.stringify({
        ...state, serviciosPublicidad: [
          ...state.serviciosPublicidad,
          action.payload
        ]
      }));
      return {
        ...state, serviciosPublicidad: [
          ...state.serviciosPublicidad,
          action.payload
        ]
      };

    case 'eliminarServiciosPublicidad':
      localStorage.setItem('state', JSON.stringify({ ...state, serviciosPublicidad: state.serviciosPublicidad.filter(servicio => servicio.id !== action.payload.id) }));
      return { ...state, serviciosPublicidad: state.serviciosPublicidad.filter(servicio => servicio.id !== action.payload.id) };

    case 'modificarServicioPublicidad':
      const servicioPublicidadActualizado = {
        ...state.serviciosPublicidad.find(servicio => servicio.id === action.payload.id),
        time: action.payload.time,
        total: action.payload.price,
        necesitaAyuda: action.payload.necesitaAyuda
      };

      const serviciosPublicidadActualizados = state.serviciosPublicidad.filter(servicio => servicio.id !== action.payload.id);
      return {
        ...state,
        serviciosPublicidad: [...serviciosPublicidadActualizados, servicioPublicidadActualizado]
      };

    case 'estimarTotal':
      const totalPlan = state.planTienda.total !== undefined ? Number(state.planTienda.total) : 0;

      const totalServiciosDiseno = state.serviciosDiseno.length !== 0
        ? state.serviciosDiseno
          .map(servicio => servicio.total ? servicio.total : 0)
          .reduce((a, c) => a + c)
        : 0;


      const totalServiciosPublicidad = state.serviciosPublicidad.length !== 0
        ? state.serviciosPublicidad
          .map(servicio => servicio.total ? servicio.total : 0)
          .reduce((a, c) => a + c)
        : 0;

      const total = Number(totalPlan) + Number(totalServiciosDiseno) + Number(totalServiciosPublicidad);

      localStorage.setItem('state', JSON.stringify({ ...state, costoTotal: total }));
      return { ...state, costoTotal: total };

    default:
      return state;
  };
}