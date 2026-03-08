import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x6eBD5c140aD4AE241338baDCC077B178c3B99E26";
const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";

function normalizeChainId(chainId) {
  return String(chainId).toLowerCase();
}

export async function doLogin() {
  if (!window.ethereum) throw new Error("MetaMask não instalada.");

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  if (!accounts || !accounts.length) {
    throw new Error("Carteira não conectada.");
  }

  let chainIdHex = await window.ethereum.request({
    method: "eth_chainId"
  });

  chainIdHex = normalizeChainId(chainIdHex);

  if (chainIdHex !== SEPOLIA_CHAIN_ID_HEX) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }]
      });

      chainIdHex = await window.ethereum.request({
        method: "eth_chainId"
      });

      chainIdHex = normalizeChainId(chainIdHex);
    } catch (err) {
      console.error("Erro ao trocar para Sepolia:", err);
      throw new Error("Mude a rede do MetaMask para Sepolia e tente novamente.");
    }
  }

  if (chainIdHex !== SEPOLIA_CHAIN_ID_HEX) {
    throw new Error("Conecte o MetaMask na rede Sepolia.");
  }

  localStorage.setItem("wallet", accounts[0].toLowerCase());
  return accounts[0];
}

async function getWeb3Sepolia() {
  if (!window.ethereum) throw new Error("MetaMask não instalada.");

  let chainIdHex = await window.ethereum.request({
    method: "eth_chainId"
  });

  chainIdHex = normalizeChainId(chainIdHex);

  if (chainIdHex !== SEPOLIA_CHAIN_ID_HEX) {
    throw new Error("Conecte o MetaMask na rede Sepolia.");
  }

  return new Web3(window.ethereum);
}

async function getContractWithSigner() {
  const from = localStorage.getItem("wallet");
  if (!from) throw new Error("Conecte sua carteira primeiro.");

  const web3 = await getWeb3Sepolia();
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

async function getContractReadOnly() {
  const web3 = await getWeb3Sepolia();
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
}

export async function registrarPedido({ title, description, contact }) {
  const contract = await getContractWithSigner();

  return await contract.methods
    .registrarPedido(title, description, contact)
    .send();
}

export async function listarPedidos() {
  const contract = await getContractReadOnly();
  return await contract.methods.listarPedidos().call();
}