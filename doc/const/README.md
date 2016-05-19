![](http://www.fg.ull.es/wp-content/uploads/2015/04/2030_b3_logo_ull.jpg)
#  Analizador del lenguaje PL0 usando PEGjs

## Declaracion de constantes
La sintaxis que hemos definido como aceptada en nuestro analizador para la declaración de constantes es la siguiente:

- Las constantes estan identificadas en el código con la palabra reservada const.
- Las constantes deben ser definidas al comienzo de cualquier bloque o función, es decir, al comienzo del ámbito en el que va a ser usada.
- Los identificadores de las constantes deben estar obligatoriamente en uppercase.
- Además se pueden definir consecutivamente varias constantes si se usa una coma para separar las definiciones. 
- Al final de la definición de una o varias constantes debe aparecer un punto y coma como separador de sentencia.

### Ejemplo de código

```js
const A = 4,
      B = 30;
```
