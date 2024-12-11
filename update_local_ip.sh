#!/bin/bash

# Get the local IP address
LOCAL_IPv4=$(hostname -I | awk '{print $1}')

echo "Detected Local IP: $LOCAL_IPv4"

# Replace $LOCAL_IPv4 in nginx.conf with the actual IP
sed "s/\$LOCAL_IPv4/$LOCAL_IPv4/g" nginx.conf.template > nginx.conf
