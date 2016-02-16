function getModule(requireFunc, value, key) {
	if (typeof value === 'function') {
		return value(key);
	} else if (typeof value === 'string') {
		return requireFunc(value);
	} else if (Array.isArray(value) && 1 <= value.length && typeof value[0] === 'string') {
		return value.reduce(
			(mod, entry, i) => {
				if (typeof entry === 'function') {
					return entry(mod);
				} else if (typeof entry === 'string') {
					if (!(entry in mod)) {
						throw new Error(`Invalid parameter name in ${key}[${i + 1}]`);
					}
					return mod[entry];
				}

				throw new TypeError(`Invalid type at ${key}[${i + 1}]`);
			},
			requireFunc(value.shift())
		);
	}

	throw new TypeError(`Invalid module type of ${key}`);
}

export default function lazyReq(requireFunc, modules) {
	const ret = {};

	Object.keys(modules).forEach(key => {
		Object.defineProperty(ret, key, {
			configurable: true,
			get() {
				let mod = getModule(requireFunc, modules[key], key);

				if (typeof mod === 'object' && 'default' in mod) {
					mod = mod.default;
				}

				Object.defineProperty(ret, key, {
					writable: false,
					value: mod,
				});

				return mod;
			},
		});
	});

	return ret;
}
