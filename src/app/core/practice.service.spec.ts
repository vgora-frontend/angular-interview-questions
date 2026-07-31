import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';
import { PracticeService } from './practice.service';
import { Question } from './models/content.model';

const question = (id: string): Question => ({
  id,
  category: 'signals',
  q: { en: id, uk: id },
  a: { en: `answer ${id}`, uk: `answer ${id}` },
});

function configure(questions: Question[]): PracticeService {
  TestBed.configureTestingModule({
    providers: [
      {
        provide: ContentService,
        useValue: {
          questions: signal(questions).asReadonly(),
          categories: signal([]).asReadonly(),
        },
      },
    ],
  });
  return TestBed.inject(PracticeService);
}

describe('PracticeService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts closed', () => {
    const service = configure([question('a')]);
    expect(service.isOpen()).toBe(false);
    expect(service.question()).toBeNull();
  });

  it('opens on a question with the answer still hidden', () => {
    const service = configure([question('a'), question('b')]);

    service.openRandomQuestion();

    expect(service.isOpen()).toBe(true);
    expect(service.question()).not.toBeNull();
    expect(service.revealed()).toBe(false);
  });

  it('reveals the answer', () => {
    const service = configure([question('a')]);
    service.openRandomQuestion();

    service.reveal();

    expect(service.revealed()).toBe(true);
  });

  it('never re-rolls to the question already on screen', () => {
    const service = configure([question('a'), question('b')]);
    // Always picks index 0 of whatever pool it is handed.
    vi.spyOn(Math, 'random').mockReturnValue(0);

    service.openRandomQuestion();
    const first = service.question();
    service.openRandomQuestion();

    expect(service.question()).not.toBe(first);
  });

  it('re-rolls to the only question when there is just one, and hides the answer again', () => {
    const service = configure([question('a')]);
    service.openRandomQuestion();
    service.reveal();

    service.openRandomQuestion();

    expect(service.question()?.id).toBe('a');
    expect(service.revealed()).toBe(false);
  });

  it('closes and forgets the revealed state', () => {
    const service = configure([question('a')]);
    service.openRandomQuestion();
    service.reveal();

    service.close();

    expect(service.isOpen()).toBe(false);
    expect(service.revealed()).toBe(false);
  });

  it('stays closed when there is no content', () => {
    const service = configure([]);

    service.openRandomQuestion();

    expect(service.isOpen()).toBe(false);
  });
});
