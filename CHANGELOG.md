# Changelog

## 1.2.0
- update babel (v5 to v6)
	- no changes for es2015 users
	- [es5 users have to change the import to:](https://stackoverflow.com/questions/33505992/babel-6-changes-how-it-exports-default)
```javascript
var lazyReq = require('lazyreq').default;
```
- auto extract *default* exports from modules

## 1.1.0
- array notation added
- tests added
- readme added
