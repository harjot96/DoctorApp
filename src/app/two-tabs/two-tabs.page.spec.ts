import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TwoTabsPage } from './two-tabs.page';

describe('TwoTabsPage', () => {
  let component: TwoTabsPage;
  let fixture: ComponentFixture<TwoTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TwoTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
