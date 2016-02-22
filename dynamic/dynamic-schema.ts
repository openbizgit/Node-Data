﻿/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mongoose/mongoose.d.ts" />
/// <reference path="../typings/linq/linq.3.0.3-Beta4.d.ts" />

import Mongoose = require('mongoose');
var MongooseSchema = Mongoose.Schema;
import aa = require('mongoose');
var Enumerable: linqjs.EnumerableStatic = require('linq');
    
import * as Utils from "../decorators/metadata/utils";

export class DynamicSchema {
    
    parsedSchema: any;
    schemaName: string;
    private target: Object;

    constructor(target: Object, name: string) {
        this.target = target;
        this.schemaName = name;
        this.parsedSchema = this.parse(target);
    }
    
    public getSchema(): Mongoose.SchemaType {
        return new MongooseSchema(this.parsedSchema, this.getMongooseOptions(this.target));
    }

    private parse(target: Object) {
        if (!target || !(target instanceof Object)) {
            throw TypeError;
        }
        var schema = {};
        var primaryKeyProp;
        var metaDataMap = this.getAllMetadataForSchema(target);
        for (var field in metaDataMap) {
            // Skip autogenerated primary column
            //if (prop === primaryKeyProp) {
            //    continue;
            //}
            var fieldMetadata = metaDataMap[field];
            if (fieldMetadata.params && (<any>fieldMetadata.params).isAutogenerated) {
                continue;
            }
            var paramType = fieldMetadata.propertyType;
            if (fieldMetadata.decoratorType !== Utils.DecoratorType.PROPERTY) {
                continue;
            }
            if (paramType.rel) {
                var relSchema = { ref: paramType.rel, metaData: fieldMetadata };
                schema[field] = relSchema;
                continue;
            }
            if (paramType.isArray) {
                schema[field] = paramType.itemType ? [paramType.itemType] : [];
                continue;
            }
            schema[field] = paramType.itemType ? paramType.itemType : {};
        }
        return schema;
    }

    private getMongooseOptions(target: Object): any {
        var documentMeta = Utils.getMetaData(<any>target, "document", null);
        return (<any>documentMeta.params).isStrict === false ? { strict: false } : { strict: true };
    }

    private isSchemaDecorator(decorator: string) {
        return decorator === "field" || decorator === "onetomany" || decorator === "manytoone" || decorator === "manytomany";
    }

    private getAllMetadataForSchema(target: Object): { [key: string]: Utils.MetaData } {
        var metaDataMap = Utils.getAllMetaDataForAllDecorator(<any>target);
        var metaDataMapFiltered: {[key: string]: Utils.MetaData} = <any>{};
        for (var field in metaDataMap) {
            var schemaDecorators = Enumerable.from(metaDataMap[field])
                .where((x: Utils.MetaData) => this.isSchemaDecorator(x.decorator))
                .toArray();
            if (!schemaDecorators || !schemaDecorators.length) {
                continue;
            }
            if (schemaDecorators.length > 1) {
                throw "A property cannot have more than one schema decorator";
            }
            metaDataMapFiltered[field] = schemaDecorators[0];
        } 
        return metaDataMapFiltered;
    }
}