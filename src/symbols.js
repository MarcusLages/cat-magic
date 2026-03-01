function make_symbol() {
    let polys = [];

    let symbol_list = function(x) {
        let y = 0;
        polys.forEach(p => {
            console.log(`${y} += ${p.a}*${x}^${p.e}`);
            console.log(`${y} += ${p.a * Math.pow(x, p.e)}`);
            y += p.a * Math.pow(x, p.e);
        });
        polys.length = 0;
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