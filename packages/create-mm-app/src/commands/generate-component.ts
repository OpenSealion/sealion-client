const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs-extra');

export const TemplateDir = path.resolve(__dirname, '../template/module/component');
export const EntryTemplate = path.join(TemplateDir, 'index.handlebars');
export const ComponentTemplate = path.join(TemplateDir, 'component.handlebars');
export const CSSTemplate = path.join(TemplateDir, 'component.module.handlebars');
// 烤肉串转大驼峰
export const transformStr = (str: string): string => {
    if (str === '') return '';
    const strArr = str.split('-');
    let newStr = '';

    for (let i = 0; i < strArr.length; i++) {
        newStr += (strArr[i].slice(0, 1)).toUpperCase() + strArr[i].slice(1);
    }

    return newStr;
};

export interface FileContentProps {
    content: string;
    filename: string;
}

export interface ComponentProps {
    component: FileContentProps;
    style: FileContentProps;
    entry: FileContentProps;
}

export const generateComponent = (componentName: string): ComponentProps => {
    const entryText = fs.readFileSync(EntryTemplate, 'utf8');
    const componentText = fs.readFileSync(ComponentTemplate, 'utf8');
    const cssText = fs.readFileSync(CSSTemplate, 'utf8');
    const entryTemp = Handlebars.compile(entryText);
    const componentTemp = Handlebars.compile(componentText);
    const cssTemp = Handlebars.compile(cssText);

    const formatComponentName = transformStr(componentName);

    const entryContent = entryTemp({
        componentName: formatComponentName,
        filename: componentName
    });

    const componentContent = componentTemp({
        componentName: formatComponentName,
        filename: componentName,
        cssWrapperName: formatComponentName.slice(0, 1).toLowerCase() + formatComponentName.slice(1)
    });

    const cssContent = cssTemp({
        filename: componentName
    });

    return {
        component: {
            content: componentContent,
            filename: `${componentName}.tsx`
        },
        style: {
            content: cssContent,
            filename: `${componentName}.module.less`
        },
        entry: {
            content: entryContent,
            filename: 'index.tsx'
        }
    };
};
