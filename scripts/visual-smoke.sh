#!/usr/bin/env bash
# Prompt 12 S101 - Visual smoke screenshots (Chromium headless; sem deps novas).
# Uso:  ./scripts/visual-smoke.sh [out-dir]   (requer servidor em http://localhost:3000)
# QA: 1440x1000 desktop, ?theme=light para paridade de tema, ?cb=<ts> anti-cache.
set -euo pipefail
OUT="${1:-.agents/shots/smoke}"
BASE="${BASE_URL:-http://localhost:3000}"
CB="cb$(date +%s)"
PROFILE="$(mktemp -d)"
mkdir -p "$OUT"
shoot() { # nome rota-hash largura altura extra-query
  # query SEMPRE antes do hash: location.search so ve o que vem antes de '#'
  local query="$CB"; [ -n "$5" ] && query="$CB&$5"
  chromium --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
    --force-prefers-reduced-motion --user-data-dir="$PROFILE" \
    --window-size="$3,$4" --virtual-time-budget=10000 \
    --screenshot="$OUT/$1.png" "$BASE/?$query$2" 2>/dev/null || echo "FALHOU: $1"
}
echo "capturando smoke screenshots em $OUT"
shoot dashboard-dark        "#dashboard"      1440 1000 ""
shoot dashboard-light       "#dashboard"      1440 1000 "theme=light"
shoot models-dark           "#models"         1440 1000 ""
shoot model-dossier-dark    "#model/gpt-6-astra" 1440 1000 ""
shoot plans-dark            "#plans"          1440 1000 ""
shoot compare-dark          "#compare"        1440 1000 ""
shoot benchmarks-dark       "#benchmarks"     1440 1000 ""
shoot history-lineages      "#history"        1440 1000 ""
shoot history-lineages-lt   "#history"        1440 1000 "theme=light"
shoot history-timeline      "#history?tab=timeline" 1440 1000 ""
shoot history-benchmarks    "#history?tab=benchmarks" 1440 1000 ""
shoot history-deeplink      "#history?tab=lineages&family=openai-gpt56&node=gpt-6-astra" 1440 1000 ""
shoot data-health-dark      "#data-health"    1440 1000 ""
shoot history-mobile        "#history"        390 844 ""
shoot history-tablet        "#history"        1024 900 ""
rm -rf "$PROFILE"
ls -la "$OUT"
echo "compare visual dos PNGs antes/depois (S91). A avaliacao final e pelos screenshots."
