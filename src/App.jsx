import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './App.css';

// Mining function
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

// Main component
const App = () => {
    const [inputString, setInputString] = useState('');
    const [result, setResult] = useState('');
    const [mining, setMining] = useState(false);

    const handleInputChange = (event) => {
        setInputString(event.target.value);
    };

    const handleMine = async (event) => {
        event.preventDefault();
        setMining(true);
        setResult('Mining...');

        try {
            const { hash, nonce } = await mine(inputString);
            setResult(`Found hash: ${hash} with nonce: ${nonce}`);
        } catch (error) {
            setResult('Error occurred during mining');
        } finally {
            setMining(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Blockchain Mining</h1>
                <form onSubmit={handleMine}>
                    <label htmlFor="inputString">Enter String:</label>
                    <input
                        type="text"
                        id="inputString"
                        value={inputString}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit" disabled={mining}>
                        {mining ? 'Mining...' : 'Mine'}
                    </button>
                </form>
                <div>{result}</div>
            </header>
        </div>
    );
};

export default App;
