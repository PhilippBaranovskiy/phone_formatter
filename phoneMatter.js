var phoneMatter = (function(p){

	p._log = function(input, output){
		return {
			input: input,
			output: output || null,
			isValid: !!output };
	};

	p.format = function(phone){

		if ( !(Array.isArray(phone) || typeof phone === 'string') ) {
			return [this._log(phone)];
		}
		if ( typeof phone === 'string' ) {
			phone = [phone];
		}

		var results = phone.map(function(ph){
			var i = ph.match(/\d/g) || [];

			if ( !i.length ) {
				return this._log(phone);
			}
			
			if ( i.length % 3 === 0 ) {
				i = (i.join('')
					  .match(/.{3}/g) || [])
					  .join('-');
			
			} else {

				var gap = -(i.length % 3 === 2 ? 2 : 4);
				
				var i2 = i.splice(gap);
				var i1 = i.splice(0, i.length );

				i1 = (i1
						.join('')
						.match(/.{3}/g) || [])
						.join('-');

				i2 = i2
						.join('')
						.match(/.{2}/g)
						.join('-');

				i = [i1,i2].join('-');
			}

			return this._log(ph, i);
		}, this);

		return results;
	};

	return p;
})(phoneMatter || {});