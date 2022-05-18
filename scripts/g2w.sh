#!/bin/bash

for f in ./public/*.gif; do
  vips webpsave $f[n=-1] ${f%.gif}.webp --strip --effort 6
done