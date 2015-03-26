# chai-like

A JSON matcher for chai

##  Install

Install with [npm](https://www.npmjs.com/package/co-wechat-parser)

```bash
npm install --save co-wechat-parser
```

## Assertions

### like(value)

Compare two JSON and ignore some keys based on expectation.

```js
var object = {
  id: 1,
  name: 'test',
  updatedAt: 'now'
};
object.should.like({
  name: 'test'
});
```

Deeply compare.

```js
var object = {
  id: 1,
  name: 'test',
  product: {
    id: 1,
    name: 'product'
  },
  updatedAt: 'now'
};
object.should.like({
  name: 'test',
  product: {
    name: 'product'
  }
});
```