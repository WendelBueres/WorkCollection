import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  const port = 3000;

  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(port, () => {
    console.log(`Servidor executando na porta: ${port}`);
  });
})();
