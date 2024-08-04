# Blockchain Mining with React

## Overview

This project is a blockchain mining application built with React. It demonstrates a simplified Proof of Work (PoW) algorithm where users can input a string and mine for a hash that meets a specified difficulty criterion. 

## How It Works

### Mining Algorithm

1. **Input String**: Users provide a string which is the basis for the mining process.
2. **Nonce**: An incremental value that is appended to the input string to generate different hashes.
3. **Hash Function**: The SHA-256 hashing algorithm is used to compute the hash of the concatenated input string and nonce.
4. **Difficulty**: The mining process continues until a hash is found that starts with a predetermined number of zeros (e.g., "0000").
5. **Result**: Once a valid hash is found, it is displayed along with the nonce that produced it.

### Proof of Work (PoW)

The mining mechanism in this application simulates Proof of Work, a consensus algorithm used in blockchain technology. PoW requires computational work to find a valid hash, which is crucial for maintaining the security and integrity of blockchain networks.

- **Difficulty**: The number of leading zeros required in the hash determines the difficulty of the mining process.
- **Computational Effort**: The process involves trial and error to find a nonce that results in a hash meeting the difficulty criteria.

## Code Explanation

### Mining Function

The `mine` function is the core of the mining process:

```javascript
const mine = (inputString, difficulty = '0000') => {
    return new Promise((resolve) => {
        let nonce = 0;
        let hash = '';
        while (true) {
            hash = CryptoJS.SHA256(inputString + nonce).toString(CryptoJS.enc.Hex);
            if (hash.startsWith(difficulty)) {
                resolve({ hash, nonce });
                break;
            }
            nonce++;
        }
    });
};
