const DevConfig = [
    ['header-config', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-assets/opencompass-header.json'],
    /**
     * 表格配置
     * 
     */
    // 多模态表格配置
    ['multi-model-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-columns/multi-model-table.json'],
    ['large-language-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-columns/large-language-all-table.json'],
    ['large-language-cn-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-columns/large-language-cn-all-table.json'],
    ['large-language-zn-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-columns/large-language-en-all-table.json'],
    ['large-language-examination-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-columns/large-language-examination-table.json'],
    ['large-language-lan-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-columns/large-language-lan-table.json'],
    ['large-language-knowledge-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-columns/large-language-knowledge-table.json'],
    ['large-language-inference-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-columns/large-language-inference-table.json'],
    ['large-language-understanding-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-columns/large-language-understanding-table.json'],
    /**
     * 数据获取
     * 
     */
    // 多模态表格数据
    ['leaderboard-multimodal', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-assets/multi-model-data.json'],
    // 大预言模型数据
    ['large-language-model', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-assets/large-language-model-data.json'],
    // 数据集数据
    ['datasets', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-assets/large-language-dataset-data.json'],
    // 数据集列表
    ['datasetList', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-assets/dataset-list.json']
];

const ProConfig = [
    ['header-config', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/assets/opencompass-header.json'],
    /**
     * 表格配置
     * 
     */
    // 多模态表格配置
    ['multi-model-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/prod-columns/multi-model-table.json'],
    ['large-language-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/prod-columns/large-language-all-table.json'],
    ['large-language-cn-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/prod-columns/large-language-cn-all-table.json'],
    ['large-language-zn-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/prod-columns/large-language-en-all-table.json'],
    ['large-language-examination-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/prod-columns/large-language-examination-table.json'],
    ['large-language-lan-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/prod-columns/large-language-lan-table.json'],
    ['large-language-knowledge-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/prod-columns/large-language-knowledge-table.json'],
    ['large-language-inference-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/prod-columns/large-language-inference-table.json'],
    ['large-language-understanding-table', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/prod-columns/large-language-understanding-table.json'],
    /**
     * 数据获取
     * 
     */
    // 多模态表格数据
    ['leaderboard-multimodal', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/assets/multi-model-data.json'],
    // 大预言模型数据
    ['large-language-model', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/assets/large-language-model-data.json'],
    // 数据集数据
    ['datasets', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/assets/large-language-dataset-data.json'],
    // 数据集列表
    ['datasetList', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-assets/dataset-list.json']
];

export const CDNList =  import.meta.env.VITE_NODE === 'production' ? ProConfig : DevConfig;
