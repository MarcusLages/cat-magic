function make_symbol() {
    let polys = [];

    let symbol_list = function(x) {
        let y = 0;
        console.log(polys)
        polys.forEach(p => {
            y += Math.pow(p.a, p.ae) * Math.pow(x, p.e);
        });
        return y;
    }
    symbol_list.polys = polys;
    
    symbol_list.add_symbol = function(p) {
        if('a' in p && 'ae' in p && 'e' in p) {
            this.polys.push(p);
            this.collapse();
            console.log(this.polys);
        }
    }

    symbol_list.cleanup = function() {
        this.polys.length = 0;
    }

    symbol_list.collapse = function() {
        const acc = { m: 0, n: 0, o: 0};

        for(const {a, ae, e} of this.polys) {
            if (ae === 1 && e === 0) acc.m += a;
            else if (ae === 1 && e === 1) acc.n += a;
            else if (ae === -1 && e === 1) acc.o += a;
        }

        this.polys.length = 0;
        if (acc.m !== 0) this.polys.push({ a: acc.m, ae: 1,  e: 0 });
        if (acc.n !== 0) this.polys.push({ a: acc.n, ae: 1,  e: 1 });
        if (acc.o !== 0) this.polys.push({ a: acc.o, ae: -1, e: 1 });
    }

    return symbol_list;
}

function collapse(terms) {
  // accumulator with 3 buckets: constant (m), variable (n), reciprocal (o)
  const acc = {
    m: 0, // ae = 1, e = 0
    n: 0, // ae = 1, e = 1
    o: 0  // ae = -1, e = 1
  };

  // 1) sum 'a' into the right bucket
  for (const { a, ae, e } of terms) {
    if (ae === 1 && e === 0) acc.m += a;
    else if (ae === 1 && e === 1) acc.n += a;
    else if (ae === -1 && e === 1) acc.o += a;
    // any other combo is ignored under your constraints
  }

  // 2) build the final list with at most 3 objects, skipping zero coefficients
  const result = [];
  if (acc.m !== 0) result.push({ a: acc.m, ae: 1,  e: 0 });
  if (acc.n !== 0) result.push({ a: acc.n, ae: 1,  e: 1 });
  if (acc.o !== 0) result.push({ a: acc.o, ae: -1, e: 1 });

  return result;
}

export let symbols = make_symbol();