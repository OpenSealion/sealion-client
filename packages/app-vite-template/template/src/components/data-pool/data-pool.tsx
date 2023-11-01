import {
    useState, useEffect, FC, ReactNode, memo
} from 'react';
import { DataPoolContext, DefaultData } from './data-pool-context';
import { fetchMetaData, addRandomQuery } from './utils';

export interface DataPoolProps {
    URLList: string[][];
    children: ReactNode;
}

const DataPool: FC<DataPoolProps> = ({ URLList, children }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(DefaultData);

    useEffect(() => {
        const initMetaData = () => {
            setLoading(false);
            const fetchTaskList = URLList.map(item => {
                // todo 需要验证url是否正确
                // todo 需要解决缓存问题
                const [key, url] = item;
                return new Promise<any>((resolve, reject) => {
                    fetchMetaData(addRandomQuery(url))
                        .then(resp => {
                            resolve({
                                key,
                                resp
                            });
                        }).catch(err => {
                            reject(err);
                        });
                });
            });

            Promise.all(fetchTaskList)
                .then(resps => {
                    const _data = {};
                    resps.forEach(keyVal => {
                        _data[keyVal.key] = keyVal.resp;
                    });

                    setData(_data);
                }).finally(() => {
                    setLoading(true);
                });
        };

        initMetaData();
    }, [URLList]);

    return (
        <DataPoolContext.Provider value={data}>
            { loading && children }
        </DataPoolContext.Provider>
    );
};

export default memo(DataPool, (oldProps, newProps) => {
    const oldUrlStr = oldProps.URLList.join();
    const newUrlStr = newProps.URLList.join();
    return oldUrlStr === newUrlStr;
});
