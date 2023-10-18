import { request } from '@/utils/ajax';

export async function fetchMockData() {
    return request('/mock/data', {
        method: 'POST'
    });
}

export async function fetchEvaluateList() {
    return request('/api/v1/commit/getCommitHistory', {
        method: 'POST',
    }, '/gw/opencompass-be');
}
