/*
 * PEGjs for a "Pl-0" like language
 * Pl-0 IMPLEMENTATION BY WIKIPEDIA
*/

{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}

program = b:block { /* Declaración de la estructura principal que contendrá a todas las demás */

  b.name = { /* Atributo name que contiene el tipo */
    type: 'ID', 
    value: "$main"
  }; 
  b.params = []; /* Array que contien los parámetros del program */
                  
  return b;
}

block = cD:constantDeclaration? vD:variableDeclaration? fD:functionDeclaration* st:st { 

  let constants = cD? cD : []; /* constanst puede estar vacía si no se realiza declaración de las mismas */
  let variables = vD? vD : []; /* variables puede estar vacía si no se realiza declaración de las mismas */
              
  return { /* Definición del valor semántico */
      type: 'BLOCK', 
      constants: constants, 
      variables: variables, 
      functions: fD, 
      main: st
  };
}

constantDeclaration = CONST id:ID ASSIGN number:NUMBER rest:(COMMA ID ASSIGN NUMBER)* SEMICOLON { /* const ejemplo = 1, ejemplo = 2; */
  
  let declaration = rest.map( ([_, id, __, nu]) => [id.value, nu.value] ); /* Ignoramos la coma y el igual, ya que no nos interesa */
  
  return [[id.value, number.value]].concat(declaration) /* El valor semántico será un array de parejas con los id y los valores de las constantes */
}

st     = i:ID ASSIGN e:cond
            { return {type: '=', left: i, right: e}; }
       / IF e:cond THEN st:st ELSE sf:st
           {
             return {
               type: 'IFELSE',
               c:  e,
               st: st,
               sf: sf,
             };
           }
       / IF e:cond THEN st:st
           {
             return {
               type: 'IF',
               c:  e,
               st: st
             };
           }
					 
cond	 =  lft:exp op:COND rgth:exp { return { type: op,
																							left: lft,
																							right: rght
																						}}
			  /	exp
exp    = t:term   r:(ADD term)*   { return tree(t,r); }
term   = f:factor r:(MUL factor)* { return tree(f,r); }

factor = NUMBER
       / ID
       / LEFTPAR t:exp RIGHTPAR   { return t; }

_ = $[ \t\n\r]*
COND		 =	_ op:("=="/"!="/"<="/">="/"<"/">") _ { return op; }
ASSIGN   = _ op:'=' _  { return op; }
ADD      = _ op:[+-] _ { return op; }
MUL      = _ op:[*/] _ { return op; }
LEFTPAR  = _"("_
RIGHTPAR = _")"_
IF       = _ "if" _
THEN     = _ "then" _
ELSE     = _ "else" _
ID       = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _
            {
              return { type: 'ID', value: id };
            }
NUMBER   = _ digits:$[0-9]+ _
            {
              return { type: 'NUM', value: parseInt(digits, 10) };
            }
