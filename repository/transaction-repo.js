require('dotenv').config();
const myClient = require('./pg-client-factory');
const client = myClient.client;

var saveTransaction = async (txInfo) => {
    await client.connect()
    const res = await client.query('insert into transaction_log (tx_id, create_time, metadata, status) values ($1, now(), $2, \'PENDING\')', [txInfo.txId, JSON.stringify(txInfo)]);
    await client.end()

    if(res.rowCount != 1){
        throw Error('saveTransaction was failed!');
    } 
}

var updateTransactionStatus = async (txId, status) => {
    await client.connect()
    const res = await client.query('update transaction_log set status = $1 where tx_id = $2', [txId, status]);
    await client.end();

    if(res.rowCount != 1){
        throw Error('saveTransaction was failed!');
    }
}


exports.saveTransaction = saveTransaction;
exports.updateTransactionStatus = updateTransactionStatus;
