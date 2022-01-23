document.addEventListener('DOMContentLoaded', function (event) {
	console.log(event);

	let albert: string =
		'https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2015/04/17/150417194023_einstein-lengua.jpg';
	let guiño: string =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4r9QS_mfwS0x2ofVRBIvYdoFId2fyToVmtQ&usqp=CAU';
	let result = document.getElementById('result');
	let resolver = document.getElementById('resolver');
	let ae = document.getElementById('ae');

	const ops: string[] = ['-', '+', '/', '*'];
	const cops: string[] = ['+', '-', '*', '/'];
	let a, b, c, sign, cop_var, pop_var;

	const val_uniq_var = (arr): [number, number] => {
		let uniq = 0;
		let miembro = 0;
		let ubx;
		arr.forEach((eq, index) => {
			let fright: number = eq.lastIndexOf('x');
			let fleft: number = eq.indexOf('x');
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

	const val_uniq_op = (eq): [boolean, string] => {
		let arr = [];
		let opr = '';

		ops.forEach((op) => {
			if (eq.indexOf(op) == -1 && eq.lastIndexOf(op) == -1) return;

			if (eq.indexOf(op) == eq.lastIndexOf(op)) {
				arr.push(1);
				opr = op;
			}
		});

		if (arr.reduce((k, i) => k + i) != 1) {
			throw 'Humano estúpido 3.';
		}

		return [true, opr];
	};

	const opt = (r, t, op): number => {
		if (op == '+') return r + t;
		else if (op == '-') return r - t;
		else if (op == '*') return r * t;
		else if (op == '/') {
			if (t == 0) throw 'Humano estúpido 4.';
			return r / t;
		} else throw 'Humano estúpido 5.';
	};

	const resolve = (s: string): number => {
		let fleft: number = s.indexOf('=');
		let fright: number = s.lastIndexOf('=');

		if (!(fright == fleft && fleft != -1 && fright != -1)) {
			throw 'Humano estúpido 0.';
		}
		let eq: string = String(s);

		let eqs_arr: string[] = eq.split('=');

		if (eq.indexOf('.') != -1) {
			throw 'Humano estúpido 1';
		}

		let miembro: number;
		let ubx: number;

		[miembro, ubx] = val_uniq_var(eqs_arr);

		eqs_arr.forEach((eq, index) => {
			if (!val_uniq_op(eq)[0]) throw 'Humano estúpido 6.';
			if (index == miembro) {
				let op_var: string = val_uniq_op(eq)[1];
				let ub: number = ops.indexOf(op_var);

				if (!(ubx != 0 && (op_var == '-' || op_var == '/'))) {
					[cop_var, sign] = [cops[ub], 1];
				} else [cop_var, sign] = [op_var, -1];
				eq = eq.replace('x', '');
				eq = eq.replace(op_var, '');
				c = parseInt(eq);
			} else {
				pop_var = val_uniq_op(eq)[1];

				[a, b] = eq.split(pop_var);

				if (a & b) {
					a = parseInt(a);
					b = parseInt(b);
				} else {
					throw 'Humano estúpido 7.';
				}
			}
		});

		let resultado: number = opt(opt(a, b, pop_var), c, cop_var);

		if (cop_var == '-') resultado *= sign;
		else if (cop_var == '/') resultado **= sign;

		return resultado;
	};

	resolver.addEventListener('click', () => {
		alert(
			`Sintaxis:\n    número operador número = número operador número,\ndonde uno de esos números debe de ser 'x' y los demás números enteros.\nNota:\n    Los operadores aceptados son los siguientes :  *, /, +, -\nEjemplo:\n    34534+56756 = 45645/x`
		);

		let equation = prompt('Ingrese ecuación con variable x: ');
		let resultado = resolve(equation);

		resolver.style.visibility = 'hidden';

		result.innerHTML = 'Aquí pues.. resolviendo este chistecito.... &#129325; &#129313;';
		setTimeout(() => {
			result.innerHTML = 'Espera! Estoy pensando.... &#129317; &#129300;';
			ae.setAttribute('src', albert);
			ae.style.visibility = 'visible';
			setTimeout(() => {
				result.innerHTML = `El resultado de resolver la ecuación ${equation} es: ${resultado} &#x1F92F; &#129299;`;
				ae.setAttribute('src', guiño);

				resolver.style.visibility = 'visible';
				resolver.innerHTML = 'Ingresa otra ecuación!';

				setTimeout(() => {
					ae.style.visibility = 'hidden';
					ae.setAttribute('src', albert);
				}, 8000);
			}, 5000);
		}, 3000);
	});
});
