# sinutre-back
Backend do SiNutre — Sistema de Ingestão de Macronutrientes.

## 🛠️ Tecnologias
TypeScript + Express + Prisma ORM + SQLite

## ✨ Funcionalidades
- Login seguro via GitHub OAuth
- Cadastro, edição e visualização de refeições
- Cálculo automático de calorias e nutrientes
- Registro de histórico diário e mensal

## 🚀 Como instalar e rodar
```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
