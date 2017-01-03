import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DataDisplayComponent } from "./data-display.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/data-display",
    pathMatch: "full",
  },
  {
    path: "data-display",
    component: DataDisplayComponent,
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
