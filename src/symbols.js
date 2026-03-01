function make_symbol() {
    let polys = [];

    let symbol_list = function(x) {
        let y = 0;
        polys.forEach(p => {
            console.log(`${y} += ${p.a}*${x}^${p.e}`);
            console.log(`${y} += ${p.a * Math.pow(x, p.e)}`);
            y += p.a * Math.pow(x, p.e);
        });
        return y;
    }
    symbol_list.polys = polys;
    
    symbol_list.add_symbol = function(a, e) {
        this.polys.push({ a: a, e: e});
        console.log(this.polys);
    }

    symbol_list.remove_symbol = function(a, e) {
        const idx = this.polys.findIndex(p => p.a === a && p.e === e);
        if (idx !== -1) this.polys.splice(idx, 1);
    }

    return symbol_list;
}

export let symbols = make_symbol();