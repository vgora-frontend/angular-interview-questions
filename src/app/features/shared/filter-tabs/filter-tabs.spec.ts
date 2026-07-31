import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterTab, FilterTabsComponent } from './filter-tabs';

const TABS: FilterTab[] = [
  { key: 'all', label: 'All' },
  { key: 'signals', label: 'Signals', divider: true },
  { key: 'rxjs', label: 'RxJS' },
];

describe('FilterTabsComponent', () => {
  let fixture: ComponentFixture<FilterTabsComponent>;
  let host: HTMLElement;

  const tabs = () => Array.from(host.querySelectorAll<HTMLButtonElement>('.tab'));
  const labels = () => tabs().map((button) => button.textContent?.trim());

  async function render(active: string): Promise<void> {
    fixture.componentRef.setInput('tabs', TABS);
    fixture.componentRef.setInput('active', active);
    fixture.componentRef.setInput('label', 'Filter by category');
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FilterTabsComponent] }).compileComponents();

    fixture = TestBed.createComponent(FilterTabsComponent);
    host = fixture.nativeElement as HTMLElement;
    await render('all');
  });

  it('renders one button per tab, in order', () => {
    expect(labels()).toEqual(['All', 'Signals', 'RxJS']);
  });

  it('names the group on its own host element, adding no wrapper', () => {
    expect(host.getAttribute('role')).toBe('group');
    expect(host.getAttribute('aria-label')).toBe('Filter by category');
    expect(host.querySelector('div')).toBeNull();
  });

  it('renders a decorative divider before a tab that asks for one', () => {
    const dividers = host.querySelectorAll('.divider');
    expect(dividers).toHaveLength(1);
    expect(dividers[0].getAttribute('aria-hidden')).toBe('true');
    // Sits immediately before the tab that declared it.
    expect(dividers[0].nextElementSibling?.textContent?.trim()).toBe('Signals');
  });

  it('marks only the active tab, for sighted and assistive users alike', async () => {
    const [all, signals] = tabs();
    expect(all.classList.contains('active')).toBe(true);
    expect(all.getAttribute('aria-pressed')).toBe('true');
    expect(signals.getAttribute('aria-pressed')).toBe('false');

    await render('signals');

    expect(tabs()[0].classList.contains('active')).toBe(false);
    expect(tabs()[1].classList.contains('active')).toBe(true);
  });

  it('writes the picked tab back through the two-way model', async () => {
    tabs()[2].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.active()).toBe('rxjs');
  });
});
