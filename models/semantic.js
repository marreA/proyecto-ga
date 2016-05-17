
(() => {
    //   La fase de análisis semántico recibe el árbol AST de la fase sintáctica
    let semantic = (tree) => {
        let emptyTable = {}; //  Creamos una tabla de símbolos vacía
        //  Hacemos un recorrido en preorden para construir la tabla
        eachBlockPre(tree, buildTable, emptyTable);
    };
    module.exports = semantic;
})();