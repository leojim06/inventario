import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAddComponent } from './inventario-add.component';

describe('InventarioAddComponent', () => {
  let component: InventarioAddComponent;
  let fixture: ComponentFixture<InventarioAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
