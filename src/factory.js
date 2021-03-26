import web3 from './web3';
import Confirm from './build/contracts/Confirm.json';

const instance = new web3.eth.Contract(Confirm.abi, '0x56d350D3aF87EE3c26e49C9Dff0A16dBc1db3C8f');

export default instance;