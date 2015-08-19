import lazyReq from '../src/main';
import * as assert from 'assert';

it('string require', () => {
	const ret = lazyReq(
		(mod) => `require ${mod}`,
		{
			key1: 'val1',
			key2: 'val2',
		}
	);

	assert.equal(ret.key1, 'require val1');
	assert.equal(ret.key2, 'require val2');
});

it('function require', () => {
	const func1 = () => 'func require val1';
	const func2 = () => 'func require val2';

	const ret = lazyReq(
		(mod) => mod,
		{
			key1: func1,
			key2: func2,
		}
	);

	assert.equal(ret.key1, 'func require val1');
	assert.equal(ret.key2, 'func require val2');
});

it('invalid require', () => {
	const ret = lazyReq(
		(mod) => mod,
		{
			num: 123,
			arr: [],
			obj: {},
		}
	);

	assert.throws(() => ret.num);
	assert.throws(() => ret.arr);
	assert.throws(() => ret.obj);
});
