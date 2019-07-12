import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
//routes module
import { AppRoutingModule } from './app-routing.module';
//custom module
import { MatInputsModule } from './mat-inputs.module';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { SharedModule } from './shared/shared.module';
// import { TodosModule } from './todos/todos.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    UserComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputsModule,
    SharedModule,
    // TodosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
