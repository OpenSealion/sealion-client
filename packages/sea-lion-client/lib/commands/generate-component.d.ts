export declare const TemplateDir: any;
export declare const EntryTemplate: any;
export declare const ComponentTemplate: any;
export declare const CSSTemplate: any;
export declare const transformStr: (str: string) => string;
export interface FileContentProps {
    content: string;
    filename: string;
}
export interface ComponentProps {
    component: FileContentProps;
    style: FileContentProps;
    entry: FileContentProps;
}
export declare const generateComponent: (componentName: string) => ComponentProps;
