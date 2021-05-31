---
name: "Déployer votre site"
date: "2021-05-27"
menu: [
              {
                  label: 'Déployer votre site',
                  id: 'site-deployment',
              },
              {
                  label: 'Configurer son serveur de média',
                  id: 'configure-your-media-server',
              },
          ]
inSection: false
backUrl: "/docs"
---
Le moyen le plus simple de déployer votre site en production est d'utiliser la <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">plate-forme Vercel</a> des créateurs de <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">NextJS</a>. <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a> est une plate-forme cloud pour les sites statiques, les applications hybrides et les fonctions sans serveur.

## Commencer
Si vous ne l'avez pas déjà fait, transférez les fichers de base de votre site vers un fournisseur Git de votre choix: <a href="https://github.com" target="_blank" rel="noopener noreferrer">Github</a> , <a href="https://about.gitlab.com" target="_blank" rel="noopener noreferrer">GitLab</a> ou <a href="https://bitbucket.org" target="_blank" rel="noopener noreferrer">BitBucket</a>. Votre référentiel peut être privé (recommandé) ou public.

Ensuite, suivez ces étapes:
<ol>
    <li><a href="https://vercel.com/signup" target="_blank" rel="noopener noreferrer">Inscrivez-vous à Vercel</a> (aucune carte de crédit n'est requise).</li>
    <li>Après vous être inscrit, vous arriverez sur la page <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">«Importer un projet»</a> . Sous «À partir du référentiel Git», choisissez le fournisseur Git que vous utilisez et configurez une intégration.</li>
    <li>Une fois que cela est configuré, la liste de vos référentiels git apparait. Cliquez sur le bouton «Importer» correspondant au référentiel souhaité puis choississez d'importer le projet sur votre compte Vercel personnel. Vercel détecte automatiquement que votre application utilise Next.js et configure la configuration de construction pour vous.  <br/>
        Pas besoin de changer quoi que ce soit, tout devrait bien fonctionner!  <br/>
        Cependant, vous devez définir les variabbles d'environnement en saisissant le nom puis la valeur souhaité et pour finir cliquez sur le bouton ajouter.<br/>
        Répêtez cette opération pour les variables si dessous:  
        <ul>
            <li>nom: SERVER | valeur: votre nom de domaine (exemple: https://exemple.fr) <required>(obligatoire)</required></li>
            <li>nom: MEDIA_SERVER | valeur: URL de l'emplacement de vos images (exemple: https://media.exemple.fr) <required>(obligatoire)</required> - <tip>Voir: <a href="/docs/configure-your-media-server">Configurer son serveur de média</a></tip></li>
            <li>nom: LOCALE | valeur: langue principale de votre site (exemple: fr) <required>(obligatoire)</required></li>
            <li>nom: DB_URL | valeur: chaine de connexion à votre base de donnée  <br/>
                -> mysql://[nom d'utilisateur]:[mot de passe]@[hôte]/[nom de la base]  <br/>
                (exemple: mysql://utilisateur:monmotdepasse@serveur.alwaysdata.net/mabase) <required>(obligatoire)</required></li>
            <li>nom: FTP_URL | valeur: chaine de connexion à votre serveur FTP <br/>
                -> ftp://[nom d'utilisateur]:[mot de passe]@[hôte]:[port]  <br/>
                (exemple: ftp://utilisateur:monmotdepasse@ftp.cluster028.hosting.ovh.net:21) <required>(obligatoire)</required></li>
            <li>nom: FTP_BASEDIR | valeur: dossier où sont stocker vos images (exemple: /media) <required>(obligatoire)</required></li>
            <li>nom: SECRET | valeur: Une chaîne aléatoire utilisée pour hacher des jetons, signer des cookies et générer des clés cryptographiques (exemple: c8o3A44NC6b7rASa) <required>(obligatoire)</required> <br/>
                <tip>La chaîne doit être uniquement composé de chiffres et de lettres aléatoires, relativement longue (16 caractères minimum)</tip></li>
        </ul>
        <p>Vous pouvez également définir les variables si dessous pour ajouter des fonctionnalités supplémentaire à votre site:</p>
        <ul>
            <li>Authentification par compte Google - <tip>Voir: <a href="/docs/google-authentication">Gestion de l'authentification par Google</a></tip>
                <ul>
                    <li>nom: GOOGLE_ID | valeur: votre identifiant google <required>(obligatoire)</required></li>
                    <li>nom: GOOGLE_SECRET | valeur: votre clé google secrète <required>(obligatoire)</required></li>
                </ul>
            </li>
        </ul>
    </li>
    <li>Après l'importation, Vercel déploiera votre application site et vous fournira une URL de déploiement. Cliquez sur «Visiter» pour voir votre application en production.</li>
</ol>  

En cas d'échec de compilation de votre site, veuillez suivre cette documentation: <a href="/docs/build-errors">Erreurs de compilation</a>.
