const estadoDeLocalStorage = JSON.parse(localStorage.getItem('state'));

export let estadoInicial;
if(estadoDeLocalStorage === null || undefined) {
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
  switch(action.type) {
    
    case 'establecerPlan':
        // localStorage.setItem('state', JSON.stringify({ ...state, planTienda: {...action.payload} }));
      return { ...state, planTienda: {...action.payload} };

    case 'solicitarAyuda':
        const servicioAModificar = state.serviciosDiseno.find(servicio => servicio.id === action.payload.id);
        const serviciosFiltrados = state.serviciosDiseno.filter(servicio => servicio.id !== action.payload.id);
        const servicioDisenoModificado = {
          ...state,
          serviciosDiseno: [
            ...serviciosFiltrados,
            {
              ...servicioAModificar,
              necesitaAyuda: true,
              cantidad: 0,
              total: 0
            }
          ]
        }
        
      return servicioDisenoModificado;

    case 'agregarServiciosDiseno':
        localStorage.setItem('state', JSON.stringify({...state, serviciosDiseno: [...state.serviciosDiseno, action.payload]}));
      return {...state, serviciosDiseno: [...state.serviciosDiseno, action.payload]};

    case 'agregarCantidadPrecio':
      
      const servicioModificado = state.serviciosDiseno.find(servicio => servicio.id === action.payload.id);
      const serviciosLimpios = state.serviciosDiseno.filter(servicio => servicio.id !== action.payload.id);

      localStorage.setItem('state', JSON.stringify({...state, serviciosDiseno: [...serviciosLimpios, {
        ...servicioModificado,
        cantidad: action.payload.cantidad,
        total: action.payload.total,
        necesitaAyuda: false
      }]}));

    return {...state, serviciosDiseno: [...serviciosLimpios, {
      ...servicioModificado,
      cantidad: action.payload.cantidad,
      total: action.payload.total,
      necesitaAyuda: false,
    }]};

    case 'eliminarServiciosDiseno':
      const lastState = {
        ...state,
        serviciosDiseno: state.serviciosDiseno.filter(servicio => {
          return servicio.id !== action.payload.id
        })};
        localStorage.setItem('state', JSON.stringify(lastState));
      return lastState;

    case 'estimarTotal':
      const totalPlan = state.planTienda.total !== undefined ? Number(state.planTienda.total) : 0;

      const totalServiciosDiseno = state.serviciosDiseno.length !== 0 
        ? state.serviciosDiseno
          .map(servicio => servicio.total ? servicio.total : 0)
          .reduce((a,c) => a + c)
        : 0;
        
        
      const totalServiciosPublicidad = state.serviciosPublicidad.length !== 0 
      ? state.serviciosPublicidad
        .map(servicio => servicio.total ? servicio.total : 0)
        .reduce((a,c) => a + c)
      : 0;

      const total = Number(totalPlan) + Number(totalServiciosDiseno) + Number(totalServiciosPublicidad);  
      
      localStorage.setItem('state', JSON.stringify({...state, costoTotal: total}));
    return {...state, costoTotal: total};

    default:
      return state;
  };
}