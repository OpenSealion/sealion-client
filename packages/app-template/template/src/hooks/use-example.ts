import { useEffect, useState } from 'react';

export const useExample = (exampleId: string) => {
    // just a example
    const [example, setExample] = useState<string>('');
    useEffect(() => {
        if (exampleId) {
            setExample(`example-${exampleId}`);
        }
    }, [exampleId]);

    return example;
};
