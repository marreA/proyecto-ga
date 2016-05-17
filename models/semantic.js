
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
    let makeTable = (block, f) => {
    };

    
    module.exports = semantic;
})();