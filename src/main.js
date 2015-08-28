export default function lazyReq(req, modules) {
	const ret = {};

	Object.keys(modules).forEach(mKey => {
		const mVal = modules[mKey];
		Object.defineProperty(ret, mKey, {
			configurable: true,
			get() {
				let mod;
				if (typeof mVal === 'function') {
					mod = mVal(mKey);
				} else if (typeof mVal === 'string') {
					mod = req(mVal);
				} else if (
					Array.isArray(mVal)
					&& 1 <= mVal.length
					&& typeof mVal[0] === 'string'
				) {
					mod = req(mVal.shift());

					for (let i = 0; i < mVal.length; i += 1) {
						const v = mVal[i];

						if (typeof v === 'function') {
							mod = v(mod);
						} else if (typeof v === 'string') {
							if (!(v in mod)) {
								throw new Error(
									`Invalid parameter name in ${mKey}[${i}]`
								);
							}
							mod = mod[v];
						} else {
							throw new Error(
								`Invalid module type of ${mKey}[${i}]`
							);
						}
					}
				} else {
					throw new Error(`Invalid module type of ${mKey}`);
				}

				Object.defineProperty(ret, mKey, {
					writable: false,
					value: mod,
				});

				return mod;
			},
		});
	});

	return ret;
}
