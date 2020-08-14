import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeSlotPage } from './time-slot.page';

describe('TimeSlotPage', () => {
  let component: TimeSlotPage;
  let fixture: ComponentFixture<TimeSlotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSlotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
