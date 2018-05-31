pragma solidity ^0.4.4;


contract ProofOfExistence1 {
    mapping (bytes32 => bool) private proofs;
    
    function storeProof(bytes32 proof) {
        proofs[proof] = true;
    }

    function proofFor(string document) constant returns (bytes32) {
        return sha256(document);
    }
    
    function notarize(string document) {
        var proof = proofFor(document);
        storeProof(proof);
    }

    function hasProof(bytes32 proof) constant returns (bool) {
        return proofs[proof];
    }


    function checkDocument(string document) constant returns (bool) {
        var proof = proofFor(document);
        return hasProof(proof);
    }


}
