import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0xa98e36A80F7C261Bacb0ad0A1A6712c771147a51";
export async function doLogin(){
    if(!window.ethereum) throw new Error("Metamask não instalado");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(! accounts || !accounts.length) throw new Error("Carteira não permitida");

    localStorage.setItem("wallet", accounts[0].toLowerCase());
    return accounts[0];
}

export async function GetOpenRequests(lastId =0){
    if(!window.ethereum) throw new Error("Metamask não instalado");

    const from = localStorage.getItem("wallet");
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {from});
    contract.methods.GetOpenRequests(lastId + 1, 10).call();
    return request.filter(rq => rq.title !== "");


}

function getContract() {
    if (!window.ethereum) throw new Error("Sem MetaMask instalada!");

    const from = localStorage.getItem("wallet");
    const web3 = new Web3(window.ethereum);

    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function openRequest({ title, description, contact, goal }) {
    const contract = getContract();
    return contract.methods.openRequest(title, description, contact, Web3.utils.toWei(goal, "ether")).send();
}

export async function closeRequest(id) {
    const contract = getContract();
    return contract.methods.closeRequest(id).send();
}

export async function donate(id, donationInBnb) {
    const contract = getContract();
    return contract.methods.donate(id).send({
        value: Web3.utils.toWei(donationInBnb, "ether")
    });
}