"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectutils_1 = require("./objectutils");
var testing_1 = require("@angular/core/testing");
describe('ObjectUtils Suite', function () {
    var objectUtils = null;
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({
        providers: [objectutils_1.ObjectUtils]
    }); });
    beforeEach(testing_1.inject([objectutils_1.ObjectUtils], function (s) {
        objectUtils = s;
    }));
    var data = [
        { brand: "VW", year: 2012, color: { name: "Orange" }, vin: "dsad231ff" },
        { brand: "Audi", year: 2011, color: { name: "Black" }, vin: "gwregre345" },
        { brand: "Renault", year: 2005, color: { name: "Black" }, vin: "h354htr" },
        { brand: "BMW", year: 2003, color: { name: "Blue" }, vin: "j6w54qgh" },
        { brand: "Mercedes", year: 1995, color: { name: "Red" }, vin: "hrtwy34" },
        { brand: "Volvo", year: 2005, color: { name: "Orange" }, vin: "jejtyj" },
        { brand: "Honda", year: 2012, color: { name: "Blue" }, vin: "g43gr" },
        { brand: "Jaguar", year: 2013, color: { name: "Black" }, vin: "greg34" },
        { brand: "Ford", year: 2000, color: { name: "White" }, vin: "h54hw5" },
        { brand: "Fiat", year: 2013, color: { name: "Yellow" }, vin: "245t2s" }
    ];
    it('Should resolve field data', function () {
        var obj = {
            firstname: 'Silvio',
            lastname: 'Andolini',
            address: {
                country: {
                    name: 'Italy'
                },
                city: 'Corleone'
            }
        };
        expect(objectUtils.resolveFieldData(obj, 'firstname')).toBe('Silvio');
        expect(objectUtils.resolveFieldData(obj, 'lastname')).toBe('Andolini');
        expect(objectUtils.resolveFieldData(obj, 'address.city')).toBe('Corleone');
        expect(objectUtils.resolveFieldData(obj, 'address.country.name')).toBe('Italy');
        expect(objectUtils.resolveFieldData(obj, 'age')).toBeUndefined();
    });
    it('Should run single field correctly', function () {
        var result = objectUtils.filter(data, ['brand'], 'b');
        expect(result[0].brand).toBe('BMW');
    });
    it('Should run multiple filter correctly', function () {
        var result = objectUtils.filter(data, ['brand', 'color.name'], 'w');
        expect(result[0].brand).toBe('VW');
        expect(result[1].brand).toBe('BMW');
        expect(result[2].brand).toBe('Ford');
    });
    it('Should relocate an item in array', function () {
        var arr = ['New York', 'Istanbul', 'Paris', 'Barcelona', 'London'];
        objectUtils.reorderArray(arr, 3, 1);
        expect(arr).toEqual(['New York', 'Barcelona', 'Istanbul', 'Paris', 'London']);
    });
    it('Should inject an item as indexed', function () {
        var sourceArr = ['New York', 'Istanbul', 'Paris', 'Barcelona', 'London'];
        var arr = [];
        objectUtils.insertIntoOrderedArray('Istanbul', 1, arr, sourceArr);
        expect(arr).toEqual(['Istanbul']);
        objectUtils.insertIntoOrderedArray('Paris', 2, arr, sourceArr);
        objectUtils.insertIntoOrderedArray('New York', 0, arr, sourceArr);
        objectUtils.insertIntoOrderedArray('London', 4, arr, sourceArr);
        objectUtils.insertIntoOrderedArray('Barcelona', 3, arr, sourceArr);
        expect(arr).toEqual(['New York', 'Istanbul', 'Paris', 'Barcelona', 'London']);
    });
    it('Should check if simple objects are equal', function () {
        var _a = data.slice(0, 2), data0 = _a[0], data1 = _a[1];
        expect(objectUtils.equals(data0, data0)).toBe(true);
        expect(objectUtils.equals(data0, Object.assign({}, data0))).toBe(true);
        expect(objectUtils.equals(data0, data1)).toBe(false);
    });
    it('Should check if nested objects are equal', function () {
        var arr = [1, 2, [3, 4]];
        expect(objectUtils.equals(arr, Object.assign({}, arr))).toBe(true);
        var arr2 = [1, 2, [3, 4, 5]];
        expect(objectUtils.equals(arr, arr2)).toBe(false);
        var obj = { a: 1, b: { c: 3, d: 4 } };
        expect(objectUtils.equals(obj, Object.assign({}, obj))).toBe(true);
        var obj2 = { a: 1, b: { c: 3, d: 5 } };
        expect(objectUtils.equals(obj, obj2)).toBe(false);
    });
    it('Should not cause stack overflow comparing recursive objects', function () {
        var obj1 = { p: null };
        var obj2 = { p: null };
        obj1['p'] = obj1;
        obj2['p'] = obj2;
        expect(objectUtils.equals(obj1, obj2)).toBe(false);
    });
    it('Should be able to compare frozen nested objects', function () {
        var obj1 = { a: 1, b: { c: 3, d: 4 } };
        var obj2 = { a: 1, b: { c: 3, d: 4 } };
        Object.preventExtensions(obj1);
        Object.preventExtensions(obj2);
        expect(objectUtils.equals(obj1, obj2)).toBe(true);
    });
});
//# sourceMappingURL=objectutils.spec.js.map