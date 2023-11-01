const DevConfig = [
    // 数据集列表
    ['datasetList', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-assets/dataset-list.json']
];

const ProConfig = [
    // 数据集列表
    ['datasetList', 'https://opencompass.oss-cn-shanghai.aliyuncs.com/dev-assets/dataset-list.json']
];

export const CDNList = import.meta.env.VITE_NODE === 'production' ? ProConfig : DevConfig;
