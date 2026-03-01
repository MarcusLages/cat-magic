function make_symbol() {
    let polys = [];

    let symbol_list = function(x) {
        let y_obj = { a: 0, e: 0 };
        polys.forEach(p => {
            y_obj.a += p.a;
            y_obj.e += p.e;
        });
        if(y_obj.e > 1) y_obj.e = 1;
        else if(y_obj < -1) y_obj.e = -1;

        console.log(`y = ${y_obj.a}*${x}^${y_obj.e} = ${y_obj.a * Math.pow(x, y_obj.e)}`);
        const y = y_obj.a * Math.pow(x, y_obj.e);
        return y;
    }
    symbol_list.polys = polys;
    
    symbol_list.add_symbol = function(p) {
        if('a' in p && 'e' in p) {
            this.polys.push(p);
            console.log(this.polys);
        }
    }

    symbol_list.remove_symbol = function(a, e) {
        const idx = this.polys.findIndex(p => p.a === a && p.e === e);
        if (idx !== -1) this.polys.splice(idx, 1);
    }

    symbol_list.cleanup = function() {
        this.polys.length = 0;
    }

    return symbol_list;
}

export let symbols = make_symbol();