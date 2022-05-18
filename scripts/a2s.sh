#!/bin/bash

for f in ./public/*.webp; do
  vips webpsave $f ${f%.webp}-static.webp --strip --effort 6
done