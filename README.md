# parseless

Develop your parse-server apps using only raw jsons instead of ordinary parse server objects.

[parseless on Github](http://github.com/rubenssvn/parseless)

[parseless on npmjs](https://www.npmjs.com/package/parseless)


# Examples

## Getting started
```js
npm install parseless
```

```js
var Parse = require("node/parse"); 
// You have to import Parse by yourself. 
// If you are writing a cloud code function, for example, you should not import Parse

var Parseless = require("parseless");
var ParselessQuery = Parseless.ParselessQuery;
var ParselessObject = Parseless.ParselessObject;
```

## ParselessObject

**parseless** works with a kind of object called ParselessObject. It's nothing more than a raw json with parse-server methods like save, destroy, etc.

### Create new ParselessObject
```js
var person = new ParselessObject("Person");
person.name = "Faruel";
person.country = "Brazil"

console.log(person);
// Ready to use person.save();
```

### Create new ParselessObject from an existing json
```js
var json = {
    "name": "Faruel", 
    "country": "Brazil"
};
var person = new ParselessObject("Person", json);

console.log(person);
// Ready to use person.save();
```

### Create new ParselessObject from an existing parseObject
```js
var person = new ParselessObject("Person");
person.loadFromParseObject(existingParseObject);

console.log(person);
// Ready to access raw attributes like person.name or person.country
```

### Saving
```js
var person = new ParselessObject("Person");
person.name = "Faruel";
person.country = "Brazil"
person.save(); // returns a promise
```

### Saving an existing entity
```js
// Creates a ParselessObject from an existing parseObject
var person = new ParselessObject("Person");
person.loadFromParseObject(existingParseObject);

person.name = "Changing name!";
person.save(); // returns a promise
```

### Destroying an object
```js
// Creates a ParselessObject from an existing parseObject
var person = new ParselessObject("Person");
person.loadFromParseObject(existingParseObject);

person.destroy(); // returns a promise
```

## ParselessQuery

Use **ParselessQuery** to retrieve objects from parse-server already in a **ParselessObject** format. 

### get(classname, objectId)
```js
var person = await ParselessQuery.get("Person", "jbVaQDHBuM");
console.log(person);
// Ready to access raw attributes like person.name or person.country
```

### find(classname, query)
[parse-server query objects](http://docs.parseplatform.org/js/guide/#queries)
```js
// Ordinary Parse.Query object.
// Also, you can use ParselessQuery.newQuery. Both return an ordinary Parse.Query object
var query = new Parse.Query("Person");
query.equalTo("name", "Faruel");

var people = await ParselessQuery.find("Person", query);
console.log(people);
// Ready to access raw attributes like people[0].name or people[0].country
```

### first(classname, query)
[parse-server query objects](http://docs.parseplatform.org/js/guide/#queries)
```js
var query = new Parse.Query("Person");
query.equalTo("name", "Faruel");

var person = await ParselessQuery.first("Person", query);
console.log(person);
// Ready to access raw attributes like person.name or person.country
```

### Dynamic filters
You can filter your queries using [parse-server's own query api](http://docs.parseplatform.org/js/guide/#queries). Alternatively, you can use Parseless filter engine.
```js
var filters = [
    {"operation": "equalTo",
     "field": "name",
     "value": "Faruel"}
];
var people = await ParselessQuery.find("Person", null, filters); 
// Passing null to "query" parameter will force Parseless to create a simple query object.
```

The code above is equivalent to
```js
var query = new Parse.Query("Person");
query.equalTo("name", "Faruel");
var people = await ParselessQuery.find("Person", query, filters);
```


### newQuery(classname)
Returns an ordinary [parse-server query object](http://docs.parseplatform.org/js/guide/#queries)
```js
var query = ParselessQuery.newQuery("Person");
// Same as new Parse.Query("Person")
```

## Users

Use **ParselessObject** to work with Users

### signUp
```js
var user = new ParselessObject("User");
user.username = "faruel";
user.email = "faruel@gmail.com";
user.password = "123456";
user.signUp();
```

### logIn
Not implemented yet. Although, you can use Parse.User.logIn();

### Current User
Not implemented yet. We recommend using something like this
```js
var currentUser = Parse.User.current();
var user = new ParselessObject("User");
user.loadFromParseObject(currentUser);
```

### requestPasswordReset
There's no reason to wrap this function. See [Parse.User.requestPasswordReset](http://docs.parseplatform.org/js/guide/#resetting-passwords)