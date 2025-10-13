import { Route } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

export const homeRoutes: Route[] = [
{path: "", component: HomeComponent},
{path: "**", redirectTo: ""}
]