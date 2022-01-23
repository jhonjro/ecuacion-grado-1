document.addEventListener('DOMContentLoaded', function (event) {
    console.log(event);
    var albert = 'https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2015/04/17/150417194023_einstein-lengua.jpg';
    var guiño = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4r9QS_mfwS0x2ofVRBIvYdoFId2fyToVmtQ&usqp=CAU';
    var result = document.getElementById('result');
    var resolver = document.getElementById('resolver');
    var ae = document.getElementById('ae');
    var ops = ['-', '+', '/', '*'];
    var cops = ['+', '-', '*', '/'];
    var a, b, c, sign, cop_var, pop_var;
    var val_uniq_var = function (arr) {
        var uniq = 0;
        var miembro = 0;
        var ubx;
        arr.forEach(function (eq, index) {
            var fright = eq.lastIndexOf('x');
            var fleft = eq.indexOf('x');
            if (fright == fleft && fleft != -1 && fright != -1) {
                uniq += 1;
                miembro = index;
                ubx = fleft;
            }
        });
        if (uniq != 1) {
            throw 'Humano estúpido 2.';
        }
        return [miembro, ubx];
    };
    var val_uniq_op = function (eq) {
        var arr = [];
        var opr = '';
        ops.forEach(function (op) {
            if (eq.indexOf(op) == -1 && eq.lastIndexOf(op) == -1)
                return;
            if (eq.indexOf(op) == eq.lastIndexOf(op)) {
                arr.push(1);
                opr = op;
            }
        });
        if (arr.reduce(function (k, i) { return k + i; }) != 1) {
            throw 'Humano estúpido 3.';
        }
        return [true, opr];
    };
    var opt = function (r, t, op) {
        if (op == '+')
            return r + t;
        else if (op == '-')
            return r - t;
        else if (op == '*')
            return r * t;
        else if (op == '/') {
            if (t == 0)
                throw 'Humano estúpido 4.';
            return r / t;
        }
        else
            throw 'Humano estúpido 5.';
    };
    var resolve = function (s) {
        var _a;
        var fleft = s.indexOf('=');
        var fright = s.lastIndexOf('=');
        if (!(fright == fleft && fleft != -1 && fright != -1)) {
            throw 'Humano estúpido 0.';
        }
        var eq = String(s);
        var eqs_arr = eq.split('=');
        if (eq.indexOf('.') != -1) {
            throw 'Humano estúpido 1';
        }
        var miembro;
        var ubx;
        _a = val_uniq_var(eqs_arr), miembro = _a[0], ubx = _a[1];
        eqs_arr.forEach(function (eq, index) {
            var _a, _b, _c;
            if (!val_uniq_op(eq)[0])
                throw 'Humano estúpido 6.';
            if (index == miembro) {
                var op_var = val_uniq_op(eq)[1];
                var ub = ops.indexOf(op_var);
                if (!(ubx != 0 && (op_var == '-' || op_var == '/'))) {
                    _a = [cops[ub], 1], cop_var = _a[0], sign = _a[1];
                }
                else
                    _b = [op_var, -1], cop_var = _b[0], sign = _b[1];
                eq = eq.replace('x', '');
                eq = eq.replace(op_var, '');
                c = parseInt(eq);
            }
            else {
                pop_var = val_uniq_op(eq)[1];
                _c = eq.split(pop_var), a = _c[0], b = _c[1];
                if (a & b) {
                    a = parseInt(a);
                    b = parseInt(b);
                }
                else {
                    throw 'Humano estúpido 7.';
                }
            }
        });
        var resultado = opt(opt(a, b, pop_var), c, cop_var);
        if (cop_var == '-')
            resultado *= sign;
        else if (cop_var == '/')
            resultado = Math.pow(resultado, sign);
        return resultado;
    };
    resolver.addEventListener('click', function () {
        var equation = prompt('Ingrese ecuación con variable x: ');
        var resultado = resolve(equation);
        resolver.style.visibility = 'hidden';
        result.innerHTML = 'Aquí pues.. resolviendo este chistecito.... &#129325; &#129313;';
        setTimeout(function () {
            result.innerHTML = 'Espera! Estoy pensando.... &#129317; &#129300;';
            ae.setAttribute('src', albert);
            ae.style.visibility = 'visible';
            setTimeout(function () {
                result.innerHTML = "El resultado de resolver la ecuaci\u00F3n ".concat(equation, " es: ").concat(resultado, " &#x1F92F; &#129299;");
                ae.setAttribute('src', guiño);
                resolver.style.visibility = 'visible';
                resolver.innerHTML = 'Ingresa otra ecuación!';
                setTimeout(function () {
                    ae.style.visibility = 'hidden';
                    ae.setAttribute('src', albert);
                }, 8000);
            }, 5000);
        }, 3000);
    });
});
