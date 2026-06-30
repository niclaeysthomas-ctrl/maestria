#!/bin/bash
# Lance Maestria et ouvre le navigateur.
# Double-clique dessus depuis le Finder pour démarrer l'app.
PORT=8123
DIR="$(cd "$(dirname "$0")" && pwd)"

# Tue l'éventuel serveur tournant sur le même port
lsof -ti:$PORT | xargs kill -9 2>/dev/null

# Lance le serveur en arrière-plan
python3 -m http.server $PORT --directory "$DIR" &>/tmp/maestria-server.log &
echo "Maestria → http://localhost:$PORT"

# Attend que le serveur soit prêt (max 3s)
for i in 1 2 3; do
  sleep 1
  curl -sf "http://localhost:$PORT/index.html" -o /dev/null && break
done

# Ouvre dans le navigateur par défaut
open "http://localhost:$PORT"
