import { createContext } from 'react';

// Este contexto se inicializará con un valor por defecto como vacio.
// Realmente el proposito de este contexto sera la persistencia de datos en caso de que el
// usuario desida navegar por la página antes de realizar un pago.

// Importante: El valor inicial del context será determinado por el valor pasado a la propiedad
// value que nos brinda el Provider que envuelve a los componentes que usaran 
// el contexto definido.

// https://reactjs.org/docs/hooks-reference.html#usecontext

export const contextoGlobal = createContext();