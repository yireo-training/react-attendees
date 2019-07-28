#!/bin/bash
yarn build

ssh yireo "rm -r /home/yireo/public_html/attendees.yireo.com/*"

cd build/
scp -r * yireo:/home/yireo/public_html/attendees.yireo.com/
