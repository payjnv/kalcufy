#!/bin/bash
CALC_NAME=$1
if [ -z "$CALC_NAME" ]; then
  echo "Uso: ./scripts/create-calc-translations.sh nombre-calculadora"
  exit 1
fi
# Quitar "-calculator" del nombre para el archivo
FILE_NAME="${CALC_NAME%-calculator}"
echo '{}' > "src/messages/calculators/en/${FILE_NAME}.json"
echo '{}' > "src/messages/calculators/es/${FILE_NAME}.json"
echo '{}' > "src/messages/calculators/pt/${FILE_NAME}.json"
echo "✅ Traducciones creadas: ${FILE_NAME}.json"
