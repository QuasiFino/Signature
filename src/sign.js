import web3 from "./web3";
import abi from "ethereumjs-abi";
// import soliditySHA3 from 'solidity-sha3';

// function result(message) {
//     return message;
// };

function sign(account, message, callback) {
    var hash = "0x" + abi.soliditySHA3(
        ["address", "string"],
        [account, message]
    ).toString("hex");

    web3.eth.personal.sign(hash, web3.eth.defaultAccount, callback); //{
    // web3.eth.personal.sign(hash, web3.eth.defaultAccount, function(err, result){
        // console.log(err, result);
    // });
};

export default sign;