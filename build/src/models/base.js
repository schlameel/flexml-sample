"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml2js_1 = require("xml2js");
class BaseModel {
    constructor(tagName) {
        this._getXmlObject = () => {
            const xmlObject = {};
            if (this.value === undefined &&
                this.attributes === undefined &&
                this.children === undefined) {
                xmlObject[this.tagName] = null;
                return xmlObject;
            }
            let value;
            if (this.value) {
                value = this.value;
            }
            else {
                const children = new Array();
                if (this._children && Object.keys(this._children).length) {
                    for (const child of this._children) {
                        children.push(child._getXmlObject());
                    }
                    value = children;
                }
                else {
                    value = null;
                }
            }
            const attributes = {};
            for (const property in this._attributes) {
                attributes[property] = this._attributes[property];
            }
            if (Object.keys(attributes).length > 0) {
                xmlObject[this.tagName] = {
                    $: attributes,
                };
                if (value) {
                    xmlObject[this.tagName]['_'] = value;
                }
            }
            else {
                xmlObject[this.tagName] = value;
            }
            return xmlObject;
        };
        this.toXml = () => {
            return BaseModel._builder.buildObject(this._getXmlObject());
        };
        this.addAttribute = (key, value) => {
            if (this._attributes === undefined) {
                this._attributes = {};
            }
            this._attributes[key] = value;
        };
        this.removeAttribute = (key) => {
            if (this._attributes === undefined)
                return;
            if (Object.prototype.hasOwnProperty.call(this._attributes, key)) {
                delete this._attributes[key];
            }
        };
        this._tagName = tagName;
    }
    get tagName() {
        return this._tagName;
    }
    set tagName(tagName) {
        this._tagName = tagName;
    }
    get attributes() {
        return this._attributes ? this._attributes : undefined;
    }
    set attributes(attributes) {
        this._attributes = attributes;
    }
    get children() {
        return this._children;
    }
    set children(children) {
        this._children = children;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
}
BaseModel._builder = new xml2js_1.Builder({
    headless: true,
    renderOpts: {
        pretty: false,
    },
});
exports.default = BaseModel;
//# sourceMappingURL=base.js.map