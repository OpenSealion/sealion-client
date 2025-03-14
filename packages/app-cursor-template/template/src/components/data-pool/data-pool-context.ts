import { createContext } from 'react';

export const DefaultData = {};

export interface DataProps {
    [key: string]: any;
}
export const DataPoolContext = createContext<DataProps>(DefaultData);
