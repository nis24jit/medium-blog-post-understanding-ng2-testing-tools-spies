import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { AppModule } from "./app/dojo/app.module";
// import { AppModule } from "./app/dojo_http/app.module";

if (process.env.ENV === "production") {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);

if (process.env.ENV === "development") {
  // Utilizing (webpack.DefinePlugin + Uglifly minification algorithm) to
  // inclusion toggle of code based on environment variables defined below,
  // this helps hide code based on the environment variable and reduce the
  // size of the end result bundle (Primarly used by production when Uglifying)
  console.log(`common to display only on "development" environment \n // Utilizing
                 (webpack.DefinePlugin + Uglifly minification algorithm) to inclusion
                 toggle of code based on environment variables defined below, this helps
                 hide code based on the environment variable and reduce the size of the
                 end result bundle (Primarly used by production when Uglifying)`);
}
if (process.env.ENV === "production") {
  // Utilizing (webpack.DefinePlugin + Uglifly minification algorithm) to
  // inclusion toggle of code based on environment variables defined below,
  // this helps hide code based on the environment variable and reduce the
  // size of the end result bundle (Primarly used by production when Uglifying)
  console.log(`common to display only on "production" environment \n // Utilizing
                (webpack.DefinePlugin + Uglifly minification algorithm) to inclusion
                toggle of code based on environment variables defined below, this helps
                hide code based on the environment variable and reduce the size of the
                end result bundle (Primarly used by production when Uglifying)`);
}
