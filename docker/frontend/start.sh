#!/bin/sh
set -eu

cd /app

if [ ! -d node_modules ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
    npm install
fi

cat > /app/public/runtime-config.js <<EOF
window.__APP_CONFIG__ = {
  appName: "${VITE_APP_NAME:-Math Olympiad Management System}",
  apiBaseUrl: "${VITE_API_BASE_URL:-http://localhost:8000/api/v1}"
};
EOF

exec npm run dev -- --host 0.0.0.0 --port 5173
