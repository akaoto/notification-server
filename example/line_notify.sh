#!/bin/bash -l

MESSAGE=$1
ACCESS_TOKEN=`curl -Ls ${NOTIFICATION_SERVER_URL} -d "{\"api_token\": \"${NOTIFICATION_SERVER_API_TOKEN}\"}" | jq .access_token`
curl -Ls -o /dev/null ${NOTIFICATION_SERVER_URL}/line/notify -H "Authorization: Bearer ${ACCESS_TOKEN}" -d "{\"message\": \"${MESSAGE}\"}"
