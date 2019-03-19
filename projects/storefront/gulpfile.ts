import { exec } from 'child_process';
import { dest, parallel, series, src } from 'gulp';
import path from 'path';

function someTask() {
    console.log('Some task...');
    return Promise.resolve();
}

export const bundle = parallel(someTask);
