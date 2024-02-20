import { request, requestWidthCancel } from '@/utils/ajax';

export async function fetchMockData() {
    return request('/mock/data', {
        method: 'POST'
    });
}

export async function fetchEvaluateList() {
    return request('/mock/comments');
}

export const fetchComments = () => {
    return requestWidthCancel('/mock/comments', {
        meta: {
            isAllResponseBody: true
        },
    });
};
