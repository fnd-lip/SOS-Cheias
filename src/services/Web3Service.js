import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0xa98e36A80F7C261Bacb0ad0A1A6712c771147a51";

export async function doLogin() {
  if (!window.ethereum) throw new Error("MetaMask não instalada.");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length) {
    throw new Error("Carteira não conectada.");
  }

  localStorage.setItem("wallet", accounts[0].toLowerCase());
  return accounts[0];
}

function getContract() {
  if (!window.ethereum) throw new Error("MetaMask não instalada.");

  const from = localStorage.getItem("wallet");
  if (!from) throw new Error("Conecte sua carteira primeiro.");

  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function openRequest({ title, description, contact, goal }) {
  const contract = getContract();

  return await contract.methods
    .openRequest(
      title,
      description,
      contact,
      Web3.utils.toWei(String(goal || 0), "ether")
    )
    .send();
}

export async function GetOpenRequests(lastId = 0) {
  const contract = getContract();
  const result = await contract.methods.getOpenRequests(lastId + 1, 10).call();
  return result.filter((rq) => rq.title !== "");
}

export async function closeRequest(id) {
  const contract = getContract();
  return await contract.methods.closeRequest(id).send();
}

export async function donate(id, donationInBnb) {
  const contract = getContract();

  return await contract.methods.donate(id).send({
    value: Web3.utils.toWei(String(donationInBnb || 0), "ether")
  });
}