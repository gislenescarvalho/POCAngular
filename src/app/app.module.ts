import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Mock
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './utils/in-memory-data.service';

// Routes
import { routing } from './app.routing';

// Services
import { UserService } from './services/user.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Pipes
import { SearchFilterPipe } from './pipes/searchfilter.pipe';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchFilterPipe,
    DashboardComponent,
    UserDetailComponent,
    UserSearchComponent,
    AppNavbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    routing
  ],
  providers: [
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
