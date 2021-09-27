import 'dotenv/config';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import chalk from 'chalk';
import {couchset} from 'couchset';

const connectionString = get(process.env, 'COUCHBASE_URL', 'couchbase://localhost');
const bucketName = get(process.env, 'COUCHBASE_BUCKET', 'stq');
const username = get(process.env, 'COUCHBASE_USERNAME', 'admin');
const password = get(process.env, 'COUCHBASE_PASSWORD', '123456');

export const connectionOptions = {
    connectionString,
    bucketName,
    username,
    password,
};

export const startCouchbase = (): Promise<boolean> => {
    console.log(
        'Couchbase',
        chalk.redBright(
            '*************************ENV********************',
            process.env && process.env.NODE_ENV
        )
    );

    console.log(
        'Couchbase',
        chalk.yellow(
            '...starting',
            JSON.stringify({
                host: connectionString,
                bucket: bucketName,
                username,
                password: isEmpty(password) ? 'empty' : 'xxxxxx',
            })
        )
    );
    return new Promise((res, rej) => {
        couchset(connectionOptions)
            .then(() => {
                console.log(
                    'Couchbase ',
                    chalk.greenBright(
                        'started ✅✅✅',
                        JSON.stringify({host: connectionString, bucket: bucketName})
                    )
                );
                res(true);
            })
            .catch((error) => rej(error));
    });
};
