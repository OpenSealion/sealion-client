import { useContext, useMemo } from 'react';
import { DataPoolContext } from '@/components/data-pool/data-pool-context';

export const useDataPool = (jsonName: string) => {
    const dataPool = useContext(DataPoolContext);

    const data = useMemo(() => {
        return dataPool[jsonName]
    }, [dataPool, jsonName]);
    return [!!data, data];
}

export const useAllDataPool = () => {
    const dataPool = useContext(DataPoolContext);
    return dataPool;
}
