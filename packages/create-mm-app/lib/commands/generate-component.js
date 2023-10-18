"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateComponent = exports.transformStr = exports.CSSTemplate = exports.ComponentTemplate = exports.EntryTemplate = exports.TemplateDir = void 0;
const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs-extra');
exports.TemplateDir = path.resolve(__dirname, '../template/module/component');
exports.EntryTemplate = path.join(exports.TemplateDir, 'index.handlebars');
exports.ComponentTemplate = path.join(exports.TemplateDir, 'component.handlebars');
exports.CSSTemplate = path.join(exports.TemplateDir, 'component.module.handlebars');
// 烤肉串转大驼峰
const transformStr = (str) => {
    if (str === '')
        return '';
    const strArr = str.split('-');
    let newStr = '';
    for (let i = 0; i < strArr.length; i++) {
        newStr += (strArr[i].slice(0, 1)).toUpperCase() + strArr[i].slice(1);
    }
    return newStr;
};
exports.transformStr = transformStr;
const generateComponent = (componentName) => {
    const entryText = fs.readFileSync(exports.EntryTemplate, 'utf8');
    const componentText = fs.readFileSync(exports.ComponentTemplate, 'utf8');
    const cssText = fs.readFileSync(exports.CSSTemplate, 'utf8');
    const entryTemp = Handlebars.compile(entryText);
    const componentTemp = Handlebars.compile(componentText);
    const cssTemp = Handlebars.compile(cssText);
    const formatComponentName = (0, exports.transformStr)(componentName);
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
exports.generateComponent = generateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2dlbmVyYXRlLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDekMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVsQixRQUFBLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3RFLFFBQUEsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQVcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNELFFBQUEsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBVyxFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFDbkUsUUFBQSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBVyxFQUFFLDZCQUE2QixDQUFDLENBQUM7QUFDakYsVUFBVTtBQUNILE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDaEQsSUFBSSxHQUFHLEtBQUssRUFBRTtRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQzFCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBRWhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4RTtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQVZXLFFBQUEsWUFBWSxnQkFVdkI7QUFhSyxNQUFNLGlCQUFpQixHQUFHLENBQUMsYUFBcUIsRUFBa0IsRUFBRTtJQUN2RSxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLHFCQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekQsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyx5QkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRSxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLG1CQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLG9CQUFZLEVBQUMsYUFBYSxDQUFDLENBQUM7SUFFeEQsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDO1FBQzNCLGFBQWEsRUFBRSxtQkFBbUI7UUFDbEMsUUFBUSxFQUFFLGFBQWE7S0FDMUIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUM7UUFDbkMsYUFBYSxFQUFFLG1CQUFtQjtRQUNsQyxRQUFRLEVBQUUsYUFBYTtRQUN2QixjQUFjLEVBQUUsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQy9GLENBQUMsQ0FBQztJQUVILE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUN2QixRQUFRLEVBQUUsYUFBYTtLQUMxQixDQUFDLENBQUM7SUFFSCxPQUFPO1FBQ0gsU0FBUyxFQUFFO1lBQ1AsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixRQUFRLEVBQUUsR0FBRyxhQUFhLE1BQU07U0FDbkM7UUFDRCxLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUUsVUFBVTtZQUNuQixRQUFRLEVBQUUsR0FBRyxhQUFhLGNBQWM7U0FDM0M7UUFDRCxLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUUsWUFBWTtZQUNyQixRQUFRLEVBQUUsV0FBVztTQUN4QjtLQUNKLENBQUM7QUFDTixDQUFDLENBQUM7QUF2Q1csUUFBQSxpQkFBaUIscUJBdUM1QiJ9