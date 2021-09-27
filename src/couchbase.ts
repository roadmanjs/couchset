import 'reflect-metadata';
import 'dotenv/config';
import chalk from 'chalk';
import {RoadmanBuild, RoadMan, awaitTo} from '@roadmanjs/core';
import {startCouchbase} from './database';

/**
 * A Couchbase roadman using CouchSet
 * @docs https://couchset.org
 * @param RoadmanBuild
 */
export const couchsetRoadman: RoadMan = async (args: RoadmanBuild): Promise<RoadmanBuild> => {
    const [errorStarting, started] = await awaitTo(startCouchbase());
    if (started) {
        console.log('CouchSet', chalk.green(`Couchbase has started`));
        return args;
    }
    throw errorStarting ? errorStarting : new Error('Error starting Couchbase');
};
