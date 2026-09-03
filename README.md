
1. php artisan serve
2. npm run dev



# Mahadeva Children Home

Laravel + Inertia (React) application.

## Local Development

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm run dev
```

## Deployment (GitHub → cPanel Git Version Control)

This project deploys using cPanel's **Git Version Control** feature
(reference: [Git Version Control](https://docs.cpanel.net/cpanel/files/git-version-control/)).
Production assets (`public/build`) are compiled **locally** and pushed to GitHub;
cPanel then pulls the repository and runs the server-side tasks defined in
[.cpanel.yml](.cpanel.yml) (composer install, caching, migrations).

### 1. Build for production locally

```bash
npm run build          # compiles resources/js + resources/css into public/build
composer install --no-dev --optimize-autoloader   # optional local sanity check
```

Commit the compiled `public/build` directory along with your code changes —
it is **not** git-ignored so cPanel receives ready-to-serve assets and does
not need Node/npm installed on the server.

### 2. Push to GitHub

```bash
git add .
git commit -m "Build: production release"
git push origin main   # or your deploy branch, e.g. "prod"
```

### 3. One-time cPanel setup

1. Log in to **cPanel → Files → Git Version Control**.
2. Click **Create**.
   - Enable **Clone a Repository** and set the **Clone URL** to your GitHub
     repository (use an `https://` URL for a public repo, or set up an SSH
     deploy key first for a private repo — see
     [Guide to Git: Set Up Access to Private Repositories](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-set-up-access-to-private-repositories)).
   - Set **Repository Path** to the application root, e.g.
     `/home/USERNAME/mahadevachildrenhome` (this must **not** be
     `public_html` directly — point your domain's document root to
     `.../mahadevachildrenhome/public` instead, via **Domains** in cPanel).
   - Give it a **Repository Name** and click **Create**.
3. Update `.cpanel.yml` in this repo: replace `USERNAME` in the `DEPLOYPATH`
   line with your actual cPanel username, matching the Repository Path above.
4. On the server, copy `.env.example` to `.env` inside the deployed path and
   configure production DB/mail/app settings (the `.env` file is git-ignored
   and must be created manually the first time), then run once via cPanel
   Terminal or SSH:
   ```bash
   cd /home/USERNAME/mahadevachildrenhome
   php artisan key:generate
   php artisan storage:link
   ```

### 4. Deploy on every push

1. In cPanel → Git Version Control, click **Manage** next to the repository.
2. Open **Pull or Deploy**.
3. Click **Update from Remote** to fetch the latest commit from GitHub.
4. Click **Deploy HEAD Commit** — this runs the task list in `.cpanel.yml`
   (`composer install --no-dev`, config/route/view cache rebuild, and
   `php artisan migrate --force`).

Repeat steps 3–4 (or automate them with the post-receive hook cPanel adds to
managed repositories) each time you push a new production build to GitHub.
