const RESERVED_WORDS = ['save', 'loadFromParseObject', 'createdAt', 'updatedAt', 'id', 'destroy', 'signUp'];

var ParselessObject = function(classname, object) {
    var ParseObjectExtend = Parse.Object.extend(classname);
    this._parseObject = new ParseObjectExtend();
    this._classname = classname;

    if (object) {
        var properties = Object.keys(object);
        for (let property of properties) {
            this[property] = object[property];
        }
    }

    this._loadParseObject = function() {
        var properties = Object.keys(this);
        for (let property of properties) {
            if (property.charAt(0) !== '_' && RESERVED_WORDS.indexOf(property) == -1) {
                this._parseObject.set(property, this[property]);
                if (!this[property]) {
                    this._parseObject.unset(property);
                }
            }
        }
    };

    this._loadEntity = function() {
        var parseObjectProperties = Object.keys(this._parseObject.attributes);
        for (let property of parseObjectProperties) {
            this[property] = this._parseObject.get(property);
        }
        this.id = this._parseObject.id;
    }

    this.loadFromParseObject = function(object) {
        this._parseObject = object;
        this._loadEntity();
    };

    this.save = function() {
        this._loadParseObject();
        var self = this;
        return this._parseObject.save().then(function() {
            self._loadEntity();
        });
    };

    this.signUp = function() {
        this._loadParseObject();
        var self = this;
        return this._parseObject.signUp().then(function() {
            self._loadEntity();
        });
    };

    this.destroy = function() {
        return this._parseObject.destroy();
    };
};
exports.ParselessObject = ParselessObject;

var ParselessQuery = {
    get: function(classname, id) {
        try {
            var query = new Parse.Query(classname);
            return query.get(id).then(function(parseObject) {
                var object = new ParselessObject(classname);
                object._parseObject = parseObject;
                object._loadEntity();
                return object;
            });
        } catch (error) {
            if (error.code === 101) return;
            throw error;
        }
    },
    newQuery: function(classname) {
        return new Parse.Query(classname);
    },
    find: function(classname, query, filters) {
        try {
            if (!query) {
                query = new Parse.Query(classname);
            }

            if (filters) {
                filters.forEach(function(filter) {
                    query[filter.operation](filter.field, filter.value);
                });
            }

            return query.find().then(function(result) {
                var formattedResult = [];
                result.forEach(function(parseObject) {
                    var object = new ParselessObject(classname);
                    object.loadFromParseObject(parseObject);
                    formattedResult.push(object);
                });
                return formattedResult;
            });
        } catch (error) {
            if (error.code === 101) return;
            throw error;
        }
    },
    first: function(classname, query, filters) {
        try {
            if (!query) {
                query = new Parse.Query(classname);
            }

            if (filters) {
                filters.forEach(function(filter) {
                    query[filter.operation](filter.field, filter.value);
                });
            }

            return query.first().then(function(parseObject) {
                var object = new ParselessObject(classname);
                object.loadFromParseObject(parseObject);
                return object;
            });
        } catch (error) {
            if (error.code === 101) return;
            throw error;
        }
    }
};
exports.ParselessQuery = ParselessQuery;