// A Human-Readable ABI; for interacting with the contract, we

import { BigNumber, ethers } from "ethers";


export type MessageData = {
    msg: string;
    sender: string;
    timestamp: BigNumber;
    sending?: undefined;
} | {
    msg: string;
    sender: string;
    sending: boolean;
    timestamp?: undefined;
}

// must include any fragment we wish to use
export const ABI = [
    {
        "inputs": [],
        "name": "readAllMessages",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "msg",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct GuestBook.message[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "offset",
                "type": "uint256"
            }
        ],
        "name": "readMessages",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "msg",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct GuestBook.message[16]",
                "name": "",
                "type": "tuple[16]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_msg",
                "type": "string"
            }
        ],
        "name": "sendMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export const ADDRESS = "0xb5079f23b6C331C990b1152b5260D70e51e432c6";

export const getContract = (provider: ethers.Signer) => new ethers.Contract(ADDRESS, ABI, provider) as unknown as {
    sendMessage(memory: string): Promise<any>;
    readMessages(offset: number): Promise<MessageData[]>;
    readAllMessages(): Promise<MessageData[]>;
};
