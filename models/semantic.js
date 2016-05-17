
(() => {
    //   La fase de análisis semántico recibe el árbol AST de la fase sintáctica
    let semantic = (tree) => {
        let emptyTable = {}; //  Creamos una tabla de símbolos vacía
        //  Hacemos un recorrido en preorden para construir la tabla
        eachBlockPre(tree, buildTable, emptyTable);
    };
    //  Recorrido en preorden
    //  Recibe un nodo del árbol
    //  La acción a realizar
    //  El padre del nodo actual
    let eachBlockPre = (tree, action, father) => {
        action(tree,father);    //  Ejecutamos la acción sobre el nodo
        //  El árbol es un objeto que tiene un atributo funciones y para cada una de ellas construimos su tabla de símbolos
        tree.functions.forEach((func) => eachBlockPre(func, action, tree.symbolTable));
    };
    
    //  Función para construir la tabla de símbolos
    let buildTable = (block, f) => {
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

    module.exports = semantic;
})();