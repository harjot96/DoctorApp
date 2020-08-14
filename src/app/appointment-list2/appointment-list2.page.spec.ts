import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppointmentList2Page } from './appointment-list2.page';

describe('AppointmentList2Page', () => {
  let component: AppointmentList2Page;
  let fixture: ComponentFixture<AppointmentList2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentList2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentList2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
