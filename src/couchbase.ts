import 'reflect-metadata';
import 'dotenv/config';
import chalk from 'chalk';
import {RoadmanBuild, RoadMan, awaitTo} from '@roadmanjs/core';
import {startCouchbase} from './database';

/**
 * An example of a last RoadMan
 * @param RoadmanBuild
 */
export const couchbaseRoadman: RoadMan = async (args: RoadmanBuild): Promise<RoadmanBuild> => {
    const [errorStarting, started] = await awaitTo(startCouchbase());
    if (started) {
        console.log('CouchSet', chalk.green(`Couchbase has started`));
        return args;
    }
    throw errorStarting ? errorStarting : new Error('Error starting Couchbase');
};
