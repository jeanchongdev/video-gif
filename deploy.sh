#!/bin/bash

echo "📦 Compilando proyecto..."
npm run build

echo "📁 Copiando archivos a la carpeta docs..."
rm -rf docs/*
cp -r dist/* docs/

echo "📤 Subiendo a GitHub..."
git add .
git commit -m "🚀 Actualización automática: cambios en src y docs"
git push origin main

echo "✅ Listo. Cambios aplicados y subidos a GitHub Pages."
