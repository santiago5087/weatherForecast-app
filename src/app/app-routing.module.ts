import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelComponent } from './components/panel/panel.component';


const routes: Routes = [
  { path: "", component: PanelComponent },
  { path: "**", redirectTo: '' } // Hace que redireccione todas las rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
