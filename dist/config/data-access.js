"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var config_1 = require("./config");
var DataAccess = (function () {
    function DataAccess() {
    }
    DataAccess.connect = function () {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }
        this.mongooseConnection = mongoose_1.connection;
        this.mongooseConnection.once('open', function () { });
        process.env.NODE_ENV === 'test' ?
            this.mongooseInstance = mongoose_1.connect(config_1.Config.DB_TEST) :
            this.mongooseInstance = mongoose_1.connect(config_1.Config.DB);
        return this.mongooseInstance;
    };
    return DataAccess;
}());
exports.DataAccess = DataAccess;
DataAccess.connect();
