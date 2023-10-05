import expressApp from "./app";
import config from "./config";

expressApp.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
