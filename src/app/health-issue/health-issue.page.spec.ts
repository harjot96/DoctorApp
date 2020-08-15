import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HealthIssuePage } from './health-issue.page';

describe('HealthIssuePage', () => {
  let component: HealthIssuePage;
  let fixture: ComponentFixture<HealthIssuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthIssuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HealthIssuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
