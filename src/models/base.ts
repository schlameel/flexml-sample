import {js2xml} from 'xml-js';

interface IXmlAttributes {
  [key: string]: any;
}

interface Any {
  [key: string]: any;
}

export interface IXmlBase {
  tagName: string;
  attributes?: IXmlAttributes;
  children?: BaseModel[];
  value?: any;
}

abstract class BaseModel implements IXmlBase {
  private _tagName: string;
  private _attributes?: IXmlAttributes;
  private _children?: BaseModel[];
  private _value?: any;

  constructor(tagName: string) {
    this._tagName = tagName;
  }

  get tagName(): string {
    return this._tagName;
  }

  set tagName(tagName: string) {
    this._tagName = tagName;
  }

  get attributes(): IXmlAttributes | undefined {
    return this._attributes ? this._attributes : undefined;
  }

  set attributes(attributes: IXmlAttributes | undefined) {
    this._attributes = attributes;
  }

  get children(): BaseModel[] | undefined {
    return this._children;
  }

  set children(children: BaseModel[] | undefined) {
    this._children = children;
  }

  get value(): any | undefined {
    return this._value;
  }

  set value(value: any | undefined) {
    this._value = value;
  }

  protected _getXmlObject = (): Any => {
    const xmlObject: Any = {
      type: 'element',
      name: this.tagName,
    };

    const attributes: Any = {};
    for (const property in this._attributes) {
      attributes[property] = this._attributes[property];
    }
    if (Object.keys(attributes).length > 0) {
      xmlObject.attributes = attributes;
    }

    if (this.value) {
      xmlObject.elements = [
        {
          type: 'text',
          text: this.value,
        },
      ];
    } else {
      if (this._children && Object.keys(this._children).length) {
        const children: any[] = new Array<any>();
        for (const child of this._children) {
          children.push(child._getXmlObject());
        }
        xmlObject.elements = children;
      }
    }

    return xmlObject;
  };

  public toXml = (): string => {
    const xmlObject = {
      elements: [this._getXmlObject()],
    };
    return js2xml(xmlObject);
  };

  public addAttribute = (key: string, value: any) => {
    if (this._attributes === undefined) {
      this._attributes = {};
    }
    this._attributes[key] = value;
  };

  public removeAttribute = (key: string) => {
    if (this._attributes === undefined) return;
    if (Object.prototype.hasOwnProperty.call(this._attributes, key)) {
      delete this._attributes[key];
    }
  };
}

export default BaseModel;
