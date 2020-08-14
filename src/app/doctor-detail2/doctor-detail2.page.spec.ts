import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorDetail2Page } from './doctor-detail2.page';

describe('DoctorDetail2Page', () => {
  let component: DoctorDetail2Page;
  let fixture: ComponentFixture<DoctorDetail2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorDetail2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorDetail2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
