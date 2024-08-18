echo "Запускаем докер 🐋"
docker compose up -d --wait

echo "Накатываем миграции 🛠"
npx prisma migrate deploy

echo "Запускаем приложение 🚀"
npm run dev