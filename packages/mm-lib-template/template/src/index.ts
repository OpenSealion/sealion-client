/**
 * 加
 */
export const add = (a: number, b: number): number => {
    return a + b;
};

/**
 * 减
 */
export const minus = (a: number, b: number): number => {
    return a - b;
};

const gaokao = (): Promise<number> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(650);
        }, 1000);
    });
};

export const waitChildFinishGaokao = async (expectSchoolScore: number): Promise<boolean> => {
    const score = await gaokao();
    return expectSchoolScore < score;
};
