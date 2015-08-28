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

it('array require', () => {
	const ret = lazyReq(
		(mod) => {
			return {
				test: `test val ${mod}`,
			};
		},
		{
			arrStr: ['arr-str-mod', 'test'],
			arrFunc: ['arr-func-mod', (v) => `func ${v.test}`],
		}
	);

	assert.equal(ret.arrStr, 'test val arr-str-mod');
	assert.equal(ret.arrFunc, 'func test val arr-func-mod');
});

it('invalid require', () => {
	const ret = lazyReq(
		(mod) => mod,
		{
			num: 123,
			arrEmpty: [],
			arrStr: [{str: 'str'}, '---nonExistent'],
			arrObj: ['mod-name', {}],
			obj: {},
		}
	);

	assert.throws(() => ret.num);
	assert.throws(() => ret.arrEmpty);
	assert.throws(() => ret.arrStr);
	assert.throws(() => ret.arrObj);
	assert.throws(() => ret.obj);
});
