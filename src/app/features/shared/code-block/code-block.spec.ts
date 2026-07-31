import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeBlockComponent } from './code-block';

const SNIPPET = 'const count = signal(0);\nconst double = computed(() => count() * 2);';

describe('CodeBlockComponent', () => {
  let fixture: ComponentFixture<CodeBlockComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CodeBlockComponent] }).compileComponents();

    fixture = TestBed.createComponent(CodeBlockComponent);
    fixture.componentRef.setInput('code', SNIPPET);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the snippet inside pre > code', () => {
    const code = host.querySelector('pre.code > code');
    expect(code).not.toBeNull();
    expect(code!.textContent).toBe(SNIPPET);
  });

  it('adds no whitespace of its own, since <pre> preserves every character', () => {
    // A stray newline in the template would indent the first line in the browser.
    expect(host.querySelector('pre')!.textContent).toBe(SNIPPET);
  });
});
