import { useContext, useMemo } from 'react';
import { DataPoolContext, DataProps } from '@components/data-pool/data-pool-context';

export const useDataPool = (jsonName: string) => {
    const dataPool = useContext<DataProps>(DataPoolContext);

    const data = useMemo<() => any>(() => {
        return dataPool[jsonName];
    }, [dataPool, jsonName]);
    return [!!data, data];
};

export const useAllDataPool = () => {
    const dataPool = useContext(DataPoolContext);
    return dataPool;
};
