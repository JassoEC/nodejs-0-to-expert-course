import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  public_path: string;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private compression = require("compression");
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path, routes } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    //middlewares
    this.app.use(this.compression());
    this.app.use(express.json()); //raw
    this.app.use(express.urlencoded({ extended: true })); //www-form-urlencoded

    // Public folder assets
    this.app.use(express.static(this.publicPath));

    // Routes
    this.app.use(this.routes);

    // SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log("Server is running on port 3000");
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
