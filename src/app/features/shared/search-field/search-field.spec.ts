import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFieldComponent } from './search-field';

describe('SearchFieldComponent', () => {
  let fixture: ComponentFixture<SearchFieldComponent>;
  let field: HTMLInputElement;

  const type = (value: string) => {
    field.value = value;
    field.dispatchEvent(new Event('input'));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SearchFieldComponent] }).compileComponents();

    fixture = TestBed.createComponent(SearchFieldComponent);
    fixture.componentRef.setInput('label', 'Search questions');
    await fixture.whenStable();
    field = (fixture.nativeElement as HTMLElement).querySelector('input')!;
  });

  it('renders a search input named by the required label', () => {
    expect(field.type).toBe('search');
    expect(field.getAttribute('aria-label')).toBe('Search questions');
  });

  it('has no placeholder attribute until one is given', async () => {
    expect(field.hasAttribute('placeholder')).toBe(false);

    fixture.componentRef.setInput('placeholder', 'Search questions...');
    await fixture.whenStable();

    expect(field.getAttribute('placeholder')).toBe('Search questions...');
  });

  describe('as a form control', () => {
    it('shows the value written by the form', async () => {
      fixture.componentInstance.writeValue('signals');
      await fixture.whenStable();

      expect(field.value).toBe('signals');
    });

    it('treats a null value from the form as empty', async () => {
      fixture.componentInstance.writeValue('signals');
      await fixture.whenStable();

      fixture.componentInstance.writeValue(null);
      await fixture.whenStable();

      expect(field.value).toBe('');
    });

    it('reports typing back to the form', () => {
      const changes: string[] = [];
      fixture.componentInstance.registerOnChange((value: string) => changes.push(value));

      type('sig');
      type('signals');

      expect(changes).toEqual(['sig', 'signals']);
    });

    it('reports being touched on blur', () => {
      let touched = 0;
      fixture.componentInstance.registerOnTouched(() => (touched += 1));

      field.dispatchEvent(new Event('blur'));

      expect(touched).toBe(1);
    });

    it('disables the input when the form disables the control', async () => {
      fixture.componentInstance.setDisabledState(true);
      await fixture.whenStable();

      expect(field.disabled).toBe(true);
    });
  });
});
