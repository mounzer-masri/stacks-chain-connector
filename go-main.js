const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
require('dotenv').config();

let apiGateway = require('./stacksNetworkGateway/stacks-api-gateway.js');
let txRepo = require('./repository/transaction-repo.js');


const main = async() => {
    try{
      var txInfo = await apiGateway.requestFreeStx(process.env.WALLET_ADDRESS);
      await txRepo.saveTransaction(txInfo);
      console.log(`Tx was saved to POSTGRESQL!`);
   
      const client = await connectWebSocketClient(process.env.STACKS_WS); 
      await client.subscribeAddressTransactions(process.env.WALLET_ADDRESS, async (event) =>{
            console.log(`event was received  ${JSON.stringify(event)}`);

            if(event.tx_id === txInfo.tx_id){
              //todo : rather than UPDATE operation make append_only operation!
              await txRepo.updateTransactionStatus(event.tx_id, event.tx_status);
              console.log(`Tx status was updated succefully!`)
            }
      });

      console.log(`Subscribed for wallet changes : ${process.env.WALLET_ADDRESS}`);
    } catch(error){
      console.log(`App Error Detected >> ${error.message}`);
      console.error(error);
    }
}


console.log('Application has started!');
main();