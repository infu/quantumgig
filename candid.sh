#!/bin/bash
dfx generate quantumgig
cp -R src/declarations/quantumgig ../qgig/src/declarations
echo REACT_APP_QUANTUMGIG_ID=$(dfx canister id quantumgig) > ../qgig/.env