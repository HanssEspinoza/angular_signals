# Signals

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Conociendo Signals

Angular Signals es un sistema que rastrea granularmente cómo y dónde se utiliza tu estado a lo largo de una aplicación, permitiendo al framework optimizar las actualizaciones de renderizado.

### Writable signals

Las señales de escritura proporcionan una API para actualizar sus valores directamente. Las señales de escritura se crean llamando a la función de señal con el valor inicial de la señal:

```typeScript
const count = signal(0);

// Las señales son funciones getter: al llamarlas se lee su valor.
console.log('El contador es: ' + count());
```

Para cambiar el valor de una señal, puede usar `.set()` directamente: 

directamente:
```typeScript
count.set(3);
```

o utilizar la operación `.update()` para calcular un nuevo valor a partir del anterior usando una función flecha:

directamente:
```typeScript
// Incrementar el contador en 1.
count.update(value => value + 1);
```

Cuando se trabaja con señales que contienen objetos, a veces es útil mutar ese objeto directamente. Por ejemplo, si el objeto es un array, puede que quieras introducir un nuevo valor sin reemplazar el array por completo. Para hacer un cambio interno como este, usa el método .mutate:
```typeScript
const todos = signal([{title: 'Aprendiendo Signals', done: false}]);

todos.mutate(value => {
  // Cambia el primer TODO del array a 'done: true' sin reemplazarlo.
  value[0].done = true;
});
```

### Signals calculadas
Una señal calculada deriva su valor de otras señales. Define una utilizando `computed` y especificando una función de derivación:
```typeScript
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```
La señal doubleCount depende de count. Cada vez que se actualiza count, Angular sabe que cualquier cosa que dependa de count o doubleCount debe actualizarse también.

En una signal computed `NO` se puede usar el .set(), .update() y los mutate().

### Effects
Las señales son útiles porque pueden notificar a los consumidores interesados cuando cambian. Un `effect` es una operación que se ejecuta cada vez que cambian uno o varios valores de una señal. Puedes crear un efecto con la función `effect`:

```typeScript
effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

#### Cuando SI usar effects
Los efectos rara vez son necesarios en la mayor parte del código de las aplicaciones, pero pueden ser útiles en circunstancias específicas. He aquí algunos ejemplos de situaciones en las que un efecto puede ser una buena solución:

- Registrar los datos que se muestran y cuándo cambian, ya sea para análisis o como herramienta de depuración.
- Mantener los datos sincronizados con window.localStorage
- Añadir un comportamiento DOM personalizado que no se puede expresar con la sintaxis de la plantilla
- Realizar renderizado personalizado a un `<canvas>`, biblioteca de gráficos u otra biblioteca de interfaz de usuario de terceros

#### Cuando NO usar effects
Evite el uso de efectos para la propagación de cambios de estado. Esto puede dar lugar a errores `ExpressionChangedAfterItHasBeenChecked`, actualizaciones circulares infinitas o ciclos de detección de cambios innecesarios.

Debido a estos riesgos, el establecimiento de señales no está permitido por defecto en los efectos, pero puede ser activado si es absolutamente necesario.

#
Tomado de: https://angular.io/guide/signals

Código basado en curso: [Angular de cero a Experto de Fernando Herrera](https://cursos.devtalles.com/courses/angular)
