import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoSeleccionadoComponent } from './producto-seleccionado.component';

describe('ProductoSeleccionadoComponent', () => {
  let component: ProductoSeleccionadoComponent;
  let fixture: ComponentFixture<ProductoSeleccionadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoSeleccionadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
