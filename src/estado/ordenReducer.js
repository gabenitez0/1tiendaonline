if(process.browser) {
var estadoDeLocalStorage = JSON.parse(localStorage.getItem('state'));
}

export let estadoInicial;
if (estadoDeLocalStorage === null || undefined) {
  estadoInicial = {
    planTienda: {},
    serviciosDiseno: [],
    serviciosPublicidad: [],
    servicioDominio: [],
    metodoDePago: '',
    serviciosIncluidos: [
      {
        id: "s3rvIc10oBl1g4tor1o",
        name: "Instalación, configuración inicial y soporte técnico por chat",
        total: 1000
      }
    ],
    stateCurrent: 0,
    subTotal: 0,
    totalFinal: 0,
    estaEnProcesoDePago: false,
    drawerVisible: false,
  }
} else {
  estadoInicial = estadoDeLocalStorage;
}

// Este reducer recibira la información de la orden y podra ser manipulada de ser necesario
// para poder regresar información nueva.
export const ordenReducer = (state, action) => {
  switch (action.type) {

    case 'resetearElEstado':
      return {
        planTienda: {},
        serviciosDiseno: [],
        serviciosPublicidad: [],
        servicioDominio: [],
        metodoDePago: '',
        serviciosIncluidos: [
          {
            id: "s3rvIc10oBl1g4tor1o",
            name: "Instalación, configuración inicial y soporte técnico por chat",
            total: 1000
          }
        ],
        stateCurrent: 0,
        subTotal: 0,
        totalFinal: 0,
        estaEnProcesoDePago: false,
        drawerVisible: false,
      }

    case 'toggleDrawer':
      localStorage.setItem('state', JSON.stringify({...state, drawerVisible: action.payload.visible}))
      return {...state, drawerVisible: action.payload.visible};

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

    case 'agregarServicioDominio': 
      const servicioDominioNuevo = {
        ...state,
        servicioDominio: [
          action.payload
        ]
      } 
    return servicioDominioNuevo;

    case 'eliminarServicioDominio':
      const servicioDominioLimio = {
        ...state,
        servicioDominio: state.servicioDominio.filter(servicio => servicio.id !== action.payload.id)
      };
      return  servicioDominioLimio;

      case 'modificarServicioDominio':
        const servicioDominioActualizado = {
          ...state.servicioDominio.find(servicio => servicio.id === action.payload.id),
          time: action.payload.time,
          total: action.payload.price,
          necesitaAyuda: action.payload.necesitaAyuda
        };
  
        const servicioDominioActualizados = state.servicioDominio.filter(servicio => servicio.id !== action.payload.id);
        return {
          ...state,
          servicioDominio: [...servicioDominioActualizados, servicioDominioActualizado]
        };

    case 'establecerMetodoDePago':
      localStorage.setItem('state', JSON.stringify({
        ...state,
        metodoDePago: action.payload.metodoDePago
      }));
      return {
        ...state,
        metodoDePago: action.payload.metodoDePago
      }

    case 'establecerDrawerStep':
      localStorage.setItem('state', JSON.stringify({...state, stateCurrent: action.payload.step }));
      return {...state, stateCurrent: action.payload.step };

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

      const totalServicioDominio = state.servicioDominio.length !== 0
        ? state.servicioDominio
          .map(servicio => servicio.total ? servicio.total : 0)
          .reduce((a, c) => a + c)
        : 0;

      const subtotal = Number(totalPlan) + Number(totalServiciosDiseno) + Number(totalServiciosPublicidad) + Number(totalServicioDominio);

      localStorage.setItem('state', JSON.stringify({ ...state, subTotal: subtotal }));
      return { ...state, subTotal: subtotal };


      case 'totalFinal':
        const subTotal = state.subTotal;

        const totalServiciosIncluidos = state.serviciosIncluidos.length !== 0
        ? state.serviciosIncluidos
          .map(servicio => servicio.total ? servicio.total : 0)
          .reduce((a, c) => a + c)
        : 0;
        
        localStorage.setItem('state', JSON.stringify({...state, totalFinal: Number(subTotal) + Number(totalServiciosIncluidos) - state.planTienda.total}))
        return {...state, totalFinal: Number(subTotal) + Number(totalServiciosIncluidos) - state.planTienda.total}

      case 'estaEnProcesoDePago':
        localStorage.setItem('state', JSON.stringify({...state, estaEnProcesoDePago: action.payload.enProceso }));
        return {...state, estaEnProcesoDePago: action.payload.enProceso }
    
        default:
      return state;
  };
}