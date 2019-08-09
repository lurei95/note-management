import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { declarations, imports, providers } from './app.module';
import { RouterTestingModule } from "@angular/router/testing"

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: declarations,
      imports: [...imports, RouterTestingModule],
      providers: providers
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});