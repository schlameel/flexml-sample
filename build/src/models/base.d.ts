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
declare abstract class BaseModel implements IXmlBase {
    private _tagName;
    private _attributes?;
    private _children?;
    private _value?;
    private static _builder;
    constructor(tagName: string);
    get tagName(): string;
    set tagName(tagName: string);
    get attributes(): IXmlAttributes | undefined;
    set attributes(attributes: IXmlAttributes | undefined);
    get children(): BaseModel[] | undefined;
    set children(children: BaseModel[] | undefined);
    get value(): any | undefined;
    set value(value: any | undefined);
    protected _getXmlObject: () => Any;
    toXml: () => string;
    addAttribute: (key: string, value: any) => void;
    removeAttribute: (key: string) => void;
}
export default BaseModel;
