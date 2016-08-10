interface String {
    replaceAll(search:string, replace:string): string;
}

String.prototype.replaceAll = function(search:string, replace:string):string {
    var target = this;
    return target.split(search).join(replace);
}

function tokenize(program:string):Array<string>{
    var tokens:Array<string>;
    /* we're doing it this way because .split() isn't working with regex */
    tokens = program.replaceAll('(', ' ( ').replaceAll(')', ' ) ').trim().split(' ');
    return tokens.filter(function(value:string, index:number, array: string[]):boolean {
        return !(value == '');
    });
    
}

function read_from_tokens(tokens:Array<string>):any {
    if (tokens.length == 0) {
        throw SyntaxError("Unexpected EOF");
    }
    var token:string = tokens.shift();
    console.log("Token: " + token)
    if (token === '(') {
        var L:Array<string> = [];
        while (tokens[0] != ')') {
            L.push(read_from_tokens(tokens));
        }
        tokens.shift();
        return L;
    }
    else if (token === ')') {
        throw SyntaxError("Unexpected ')'");
    }
    else {
        return token;
    }
}

function main() {
    var program:string = "(begin (define r 10) (* pi (* r r)))";
    var tokens:Array<string> = tokenize(program);
    console.log(tokens);
    console.log(read_from_tokens(tokens));
}