#!/usr/bin/env bash
# ==============================================================================
# Script de Inicialização do Servidor Local - Comparação de Modelos de IA
# ==============================================================================

cd "$(dirname "$0")" || exit 1

PORT="${PORT:-3000}"

echo "============================================================"
echo "⚡  Iniciando Servidor Web Local..."
echo "============================================================"

if command -v node >/dev/null 2>&1; then
  echo "🚀 Executando via Node.js (server.js)..."
  exec node server.js
elif command -v python3 >/dev/null 2>&1; then
  echo "🐍 Node.js não encontrado. Executando via Python 3 http.server na porta ${PORT}..."
  exec python3 -m http.server --bind 0.0.0.0 "${PORT}"
else
  echo "❌ Erro: Nem Node.js nem Python 3 foram encontrados no sistema."
  exit 1
fi
