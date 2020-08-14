import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Doctor2Page } from './doctor2.page';

describe('Doctor2Page', () => {
  let component: Doctor2Page;
  let fixture: ComponentFixture<Doctor2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Doctor2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Doctor2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
