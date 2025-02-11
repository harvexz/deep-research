#!/bin/bash

rm logs/tokens.csv
../docker_cl.sh
docker compose run --build --rm deep-research
cd logs
python3 cost.py
cd ..
