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
