# Filename: YubiKey.py
# Author: Luke Graber
# Purpose: YubiKey Class Definition - Simulate the YubiKey Access Device

import Crypto
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256

class YubiKey:
    def __init__(self, pinArg, userIdArg):
        modulusLength = 4096
        self.pin = str(pinArg)
        self.userId = userIdArg
        self.keyPair = RSA.generate(modulusLength)
    
    def getPublicKey(self):
        return self.keyPair.publickey()

    def getUserId(self):
        return self.userId
    
    def sign(self, message):
        signer = PKCS1_v1_5.new(self.keyPair)
        digest = SHA256.new()
        digest.update(message)
        return signer.sign(digest)