import {Builder} from 'xml2js';

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
  private static _builder: Builder = new Builder({
    headless: true,
    renderOpts: {
      pretty: false,
    },
  });

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
    const xmlObject: Any = {};
    if (
      this.value === undefined &&
      this.attributes === undefined &&
      this.children === undefined
    ) {
      xmlObject[this.tagName] = null;
      return xmlObject;
    }

    let value: any;
    if (this.value) {
      value = this.value;
    } else {
      const children: any[] = new Array<any>();
      if (this._children && Object.keys(this._children).length) {
        for (const child of this._children) {
          children.push(child._getXmlObject());
        }
        value = children;
      } else {
        value = null;
      }
    }

    const attributes: Any = {};
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
    } else {
      xmlObject[this.tagName] = value;
    }

    return xmlObject;
  };

  public toXml = (): string => {
    return BaseModel._builder.buildObject(this._getXmlObject());
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
