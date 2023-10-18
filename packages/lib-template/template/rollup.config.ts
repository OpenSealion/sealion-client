import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import JsonPlugin from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default defineConfig([
    {
        input: './src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'umd',
                name: packageJson.name,
            },
            {
                file: packageJson.module,
                format: 'esm',
            },
        ],
        plugins: [typescript({ compilerOptions: { lib: ['esnext'] } }), JsonPlugin()],
        watch: {
            exclude: 'node_modules/**',
        },
    },
    {
        input: './src/index.ts',
        output: [{
            file: packageJson.types,
            format: 'esm'
        }],
        plugins: [dts()]
    }
]);
