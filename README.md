# 🎯 Maestria

Tracker **gamifié** de maîtrise multi-disciplines. 100 % local, gratuit, hors-ligne.
Conçu comme une brique possible de ton projet **Life-RPG** (domaines = attributs, disciplines = compétences).

## Disciplines suivies
- 🥊 **Corps** : Boxe
- 🎸 **Art** : Guitare (+ métronome intégré)
- 🧠 **Esprit** : Échecs, Mathématiques, Science
- 🗣️ **Langues** : Arabe, Espagnol (niveaux CECRL + vocabulaire)

## Ce que ça fait
- **Séances** loggées (durée, intensité, compétences travaillées, notes) → **XP**
- **Niveaux** par compétence, par discipline, par domaine, et **niveau global**
- **Streak** (jours d'affilée) + heatmap de régularité sur 28 jours
- **Coach exigeant** dont le ton s'adapte à ta régularité (la « dureté adaptative »)
- **Objectifs / quêtes**, **badges / trophées**
- **Courbes** de progression (BPM guitare, Elo échecs, poids boxe, vocabulaire…)
- **Journal de connaissances** (maths/science/langues) avec **révisions espacées** (système Leitner)
- **Export .ics** des rappels de révision vers Google Agenda / Apple Calendrier
- **Métronome** (Web Audio) → logge le BPM atteint en un clic
- **Sauvegarde / import** de tes données (fichier .json)

## Lancer l'app

### Le plus simple (depuis un ordinateur)
Ouvre simplement `index.html` dans ton navigateur (double-clic).
> Tout marche en local. Seul le mode hors-ligne installable (service worker) nécessite un petit serveur, voir ci-dessous.

### Avec serveur local (recommandé, active le mode PWA installable)
```bash
cd maestria
python3 -m http.server 8123
```
Puis ouvre **http://localhost:8123** dans Chrome/Safari.

### L'installer sur ton téléphone (PWA gratuite)
1. Héberge le dossier gratuitement (glisser-déposer sur **Netlify Drop** : https://app.netlify.com/drop, ou un repo **GitHub Pages**).
2. Ouvre l'URL sur ton téléphone → menu → **« Ajouter à l'écran d'accueil »**.
3. L'icône apparaît comme une vraie app, et ça marche hors-ligne.

## Où sont mes données ?
Dans le **stockage local de ton navigateur** (clé `maestria_state_v1`). Elles ne quittent jamais ton appareil.
👉 Pense à **Réglages → Exporter ma sauvegarde** de temps en temps pour garder un backup.

## Ajouter une 8ᵉ discipline (ou un domaine)
Tout est piloté par la donnée. Ouvre `js/config.js` et ajoute un objet dans `DISCIPLINES` :
```js
piano: {
  id: 'piano', name: 'Piano', domain: 'art', icon: '🎹', type: 'practice',
  skills: ['Gammes', 'Lecture', 'Morceaux'],
  metrics: [{ id: 'bpm', name: 'BPM max', unit: 'bpm', higherBetter: true }],
  features: { metronome: true },
}
```
Aucune autre ligne de code à toucher. (`type` : `practice` | `knowledge` | `language`.)

## Structure du code
```
index.html              page + ordre de chargement des scripts
manifest.webmanifest    métadonnées PWA
sw.js                   service worker (offline)
icon.svg                icône de l'app
css/styles.css          thème sombre RPG, mobile-first
js/config.js            domaines, disciplines, badges  ← la config à éditer
js/store.js             état, persistance, XP/niveaux/streak/coach adaptatif
js/srs.js               journal + révisions espacées + export .ics
js/metronome.js         métronome Web Audio
js/app.js               rendu, routage, interactions
```
