import '../../jest.setup';
import styler from '../';

describe('styler', () => {
  test('css', () => {
    const div = document.createElement('div');
    const divStyler = styler(div);

    divStyler.set({ x: 0 });
    divStyler.render();

    expect(div).toHaveStyle('transform: none');

    divStyler.set({ x: 100 });
    divStyler.render();

    expect(div).toHaveStyle('transform: translateX(100px) translateZ(0)');

    divStyler.set({ scale: 1 });
    expect(div).toHaveStyle('transform: translateX(100px) translateZ(0)');
    divStyler.render();

    expect(div).toHaveStyle(
      'transform: translateX(100px) scale(1) translateZ(0)'
    );
  });

  test('css - disable hardware acceleration', () => {
    const div = document.createElement('div');

    const divStyler = styler(div, { enableHardwareAcceleration: false });

    divStyler.set({ x: 100 });
    divStyler.render();

    expect(div).toHaveStyle('transform: translateX(100px)');
  });

  test('css - custom transform', () => {
    const div = document.createElement('div');

    const divStyler = styler(div);

    divStyler.set({
      x: 100,
      transform: ({ x }) => `translateY(${x})`
    });

    divStyler.render();

    expect(div).toHaveStyle('transform: translateY(100px)');
  });

  test('css - transform origin', () => {
    const div = document.createElement('div');

    const divStyler = styler(div);

    divStyler.set({
      originY: '100%'
    });

    divStyler.render();

    expect(div).toHaveStyle('transform-origin: 0 100% 0');
  });

  test('css - only preparse default value types', () => {
    const div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100%';

    const divStyler = styler(div);

    divStyler.render();

    expect(divStyler.get('width')).toBe(100);
    expect(divStyler.get('height')).toBe('100%');
  });

  test('css - set special props', () => {
    const div = document.createElement('div');

    const divStyler = styler(div);

    divStyler.set({
      size: '100px',
      radius: '20px'
    });

    divStyler.render();

    expect(div).toHaveStyle('width: 100px; height: 100px; border-radius: 20px');
  });

  test('css - get special props', () => {
    const div = document.createElement('div');
    div.style.width = '200px';
    div.style.borderRadius = '5px';

    const divStyler = styler(div);

    expect(divStyler.get('size')).toBe(200);
    expect(divStyler.get('radius')).toBe(5);
  });

  test('transform as string', () => {
    const div = document.createElement('div');

    const divStyler = styler(div);

    divStyler.set({
      transform: 'rotateX(90deg)'
    });

    divStyler.render();

    expect(div).toHaveStyle('transform: rotateX(90deg)');
  });
});
