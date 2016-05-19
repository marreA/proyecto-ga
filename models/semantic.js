
(() => {
    "use strict";
    //   La fase de análisis semántico recibe el árbol AST de la fase sintáctica
    const semantic = (tree) => {
        let emptyTable = {}; //  Creamos una tabla de símbolos vacía
        //  Hacemos un recorrido en preorden para construir la tabla
        eachBlockPre(tree, buildTable, emptyTable);
        //  Retornamos la tabla de símbolos creada
        return emptyTable;
    };
    
    //  Recorrido en preorden
    //  Recibe un nodo del árbol
    //  La acción a realizar
    //  El padre del nodo actual
    const eachBlockPre = (tree, action, father) => {
        action(tree,father);    //  Ejecutamos la acción sobre el nodo
        //  El árbol es un objeto que tiene un atributo funciones y para cada una de ellas construimos su tabla de símbolos
        tree.functions.forEach((func) => eachBlockPre(func, action, tree.symbolTable));
    };
    
    //  Función para construir la tabla de símbolos
    const buildTable = (block, f) => {
        //  Definimos cual es el padre de cada uno de los bloques dentro de su tabla de símbolos
        block.symbolTable = {
            father: f
        };
        //  Cada uno de los bloque tiene a su vez variables, constantes y funciones
        //  por lo que tenemos que incluirlas dentro de la tabla de símbolos
        
        //  Añadimos cada variable dentro de la tabla de símbolos
        block.variables.forEach((variable) => insertSymbol(variable, block.symbolTable));
        //  Añadimos cada constante dentro de la tabla de símbolos
        block.constants.forEach((constant) => insertSymbol(constant, block.symbolTable));
        //  Añadimos el identificador de cada función dentro de la tabla de símbolos
        block.functions.forEach((func) => insertSymbol(func.name.value, block.symbolTable));
    };
    
    //  Creamos el método que nos permite insertar un símbolo dentro de la tabla de símbolos
    //  Recibe el símbolo en el argumento value y la tabla de símbolos en el segundo argumento
    const insertSymbol = (value, symbolTable) => {
        if (value instanceof Array) {
            if (symbolTable[value[0]])
                console.error("Error: " + value[0] + " declared yet.");
            symbolTable[value[0]] = value[1];
        } else {
            if (symbolTable[value])
                console.error("Error: " + value + " declared yet.");
            symbolTable[value] = 'not defined';
        }
    };
    module.exports = semantic;
})();