import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProductosVentaComponent } from './tabla-productos-venta.component';

describe('TablaProductosVentaComponent', () => {
  let component: TablaProductosVentaComponent;
  let fixture: ComponentFixture<TablaProductosVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaProductosVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaProductosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
