
const axios = require('axios');
require('dotenv').config();
/*
var requestFreeStx = (waleltAddress, successCallBack, faileCallback) => {
    axios
      .post(process.env.FAUCETS_STX_API, {
        address: waleltAddress,
        stacking: false
      })
      .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
        successCallBack(res.body);
      })
      .catch(error => {
        console.error(error);
        faileCallback();
      });
}
*/


var requestFreeStx = async (waleltAddress) => {
  let res = await axios
    .post(process.env.FAUCETS_STX_API, {
      address: waleltAddress,
      stacking: false
    });

    if(res.status != 200){
      throw Error(`RequestFreeSTX failed status : ${res.status}`);
    }

    console.log(`requestFreeStx : ${JSON.stringify(res.data)}`);
    return res.data;
}

exports.requestFreeStx = requestFreeStx;