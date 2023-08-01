import {js2xml} from 'xml-js';

export interface IFlexXmlAttributes {
  [key: string]: any;
}

interface Any {
  [key: string]: any;
}

export interface IFleXmlBase {
  tagName: string;
  attributes?: IFlexXmlAttributes;
  children?: FleXmlTag[];
  text?: any;
}

export interface IFlexXmlTagProperties {
  attributes?: IFlexXmlAttributes;
  children?: FleXmlTag[];
  text?: any;
}

abstract class FleXmlTag implements IFleXmlBase {
  private _tagName: string;
  private _attributes?: IFlexXmlAttributes;
  private _children?: FleXmlTag[];
  private _text?: any;

  constructor(
    tagName: string,
    {
      attributes = undefined,
      children = undefined,
      text = undefined,
    }: IFlexXmlTagProperties = {}
  ) {
    this._tagName = tagName;
    this._attributes = attributes ? attributes : undefined;
    this._children = children ? children : undefined;
    this._text = text ? text : undefined;
  }

  get tagName(): string {
    return this._tagName;
  }

  set tagName(tagName: string) {
    this._tagName = tagName;
  }

  get attributes(): IFlexXmlAttributes | undefined {
    return this._attributes ? this._attributes : undefined;
  }

  set attributes(attributes: IFlexXmlAttributes | undefined) {
    this._attributes = attributes;
  }

  get children(): FleXmlTag[] | undefined {
    return this._children;
  }

  set children(children: FleXmlTag[] | undefined) {
    this._children = children;
  }

  get text(): any | undefined {
    return this._text;
  }

  set text(text: any | undefined) {
    this._text = text;
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

    if (this.text) {
      xmlObject.elements = [
        {
          type: 'text',
          text: this.text,
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
    const prolog = '<?xml version="1.0" encoding="UTF-8"?>';
    const xmlObject = {
      elements: [this._getXmlObject()],
    };
    return prolog + js2xml(xmlObject, {ignoreDeclaration: false});
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

  public getAttribute = (key: string): any | undefined => {
    if (this._attributes === undefined) return;
    return this._attributes[key];
  };

  public hasAttribute = (key: string): boolean => {
    if (this._attributes === undefined) return false;
    return Object.prototype.hasOwnProperty.call(this._attributes, key);
  };
}

export default FleXmlTag;
