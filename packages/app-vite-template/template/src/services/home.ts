import { request, requestWidthCancel } from '@/utils/ajax';

export async function fetchMockData() {
    return request('/mock/data', {
        method: 'POST'
    });
}

export async function fetchEvaluateList() {
    return request('/mock/comments', {
        method: 'POST',
    });
}

export const fetchComments = () => {
    return requestWidthCancel('/mock/posts', {
        meta: {
            isAllResponseBody: true
        },
    });
};
