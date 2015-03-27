# chai-like

A JSON matcher for chai.
This is really useful when you are testing API and want to ignore some attributes like:
 updatedAt, createdAt, id.

##  Install

Install with [npm](https://www.npmjs.com/package/co-wechat-parser)

```bash
npm install --save-dev chai-like
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
object.should.not.like({
  name: 'test1'
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
object.should.not.like({
  name: 'test',
  product: {
    name: 'product1'
  }
});
```

Compare array.

```js
var array = [{
  id: 1,
  name: 'test',
  product: {
    id: 1,
    name: 'product'
  },
  updatedAt: 'now'
}];
array.should.like([{
  name: 'test',
  product: {
    name: 'product'
  }
}]);
array.should.not.like([{
  name: 'test',
  product: {
    name: 'product1'
  }
}]);
```

Compare JSON with an array sub node.

```js
var object = {
  id: 1,
  name: 'test',
  products: [{
    id: 1,
    name: 'product'
  }],
  updatedAt: 'now'
};
object.should.like({
  name: 'test',
  products: [{
    name: 'product'
  }]
});
object.should.not.like({
  name: 'test',
  products: [{
    name: 'product1'
  }]
});
```