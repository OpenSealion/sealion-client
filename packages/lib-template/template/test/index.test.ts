import { add, minus, waitChildFinishGaokao } from '../src/index';

test('1 + 2 = 3', () => {
    expect(add(1, 2)).toBe(3);
});

test('3 - 1 >< 2', () => {
    expect(minus(3, 1)).not.toBe(5);
});

test('测试考上心仪的大学', async () => {
    const result = await waitChildFinishGaokao(600);
    expect(result).toBeTruthy();
})

test('测试没考上心仪的大学', async () => {
    const result = await waitChildFinishGaokao(660);
    expect(result).toBeFalsy();
})
