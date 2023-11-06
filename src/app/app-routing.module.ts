import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './Pages/content/content.component';
import { DummyComponent } from './Pages/dummy/dummy.component';

const routes: Routes = [
  { path: '', component: ContentComponent, title: 'Pretest Angular' },
  { path: 'dummy', component: DummyComponent, title: 'Dummy Chart' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
