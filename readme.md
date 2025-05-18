# Bespoke Invoice API

A Node.js + Express backend API for handling user/client management, Stripe-based invoicing, and automated communication via email and SMS. Built for the Bespoke Seating Company platform.

---

##  Tech Stack

* Node.js + Express
* PostgreSQL + Prisma ORM
* Stripe (payments + webhooks)
* Twilio (SMS)
* Nodemailer (email)
* Puppeteer (PDF generation)
* dotenv (environment management)

---

## Project Structure

```
invoice-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   └── clients.controller.js
│   ├── routes/
│   │   ├── clients.routes.js
│   │   ├── invoices.routes.js
│   │   └── webhooks.routes.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=10000

# PostgreSQL
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<database>

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# JWT (if used for auth)
JWT_SECRET=supersecrettoken

# Email
EMAIL_USER=you@example.com
EMAIL_PASS=your_email_password
```

---

## 🧪 Local Development

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Runs on `http://localhost:10000`

---

## API Endpoints

| Method | Route                 | Description            |
| ------ | --------------------- | ---------------------- |
| GET    | `/`                   | API health check       |
| POST   | `/api/clients`        | Create new client      |
| POST   | `/api/invoices`       | Create/send invoice    |
| POST   | `/api/stripe-webhook` | Stripe payment webhook |

---

## Deployment (Render)

* Create a new Web Service on [Render](https://render.com)
* Connect GitHub repo
* Add environment variables from `.env`
* Use:

  * Build Command: `npm install`
  * Start Command: `npm start`
* Optional: Set up PostgreSQL using Render’s managed DB

---

## 🛠 Scripts

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

---

##  Author

**Andy Bodnar**
Bespoke Seating Company
[www.bespokeseating.xyz](https://www.bespokeseating.xyz)
`andy@bespokeseating.xyz`

---

## 📄 License

MIT — free to use, modify, and distribute.
