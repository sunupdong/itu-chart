import { createRenderer } from '../../src/renderer';
import { shape } from '../../src/renderer/shape';
import { createDiv, getAttributes, mount } from '../utils';

describe('shapes', () => {
  test('shape(name, context, attributes) creates SVG elements width specified attributes and mounts it to group.', () => {
    const renderer = createRenderer(600, 400);
    const context = { group: renderer.group() };

    const s = shape('circle', context, {
      cx: 100,
      cy: 100,
      r: 50,
      fill: 'red',
      stroke: 'yellow',
      strokeWidth: 10,
    });

    mount(createDiv(), renderer.node());

    expect(s.tagName).toBe('circle');
    expect(s.parentNode).toBe(renderer.group());
    expect(getAttributes(s, ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width'])).toEqual({
      cx: '100',
      cy: '100',
      r: '50',
      fill: 'red',
      stroke: 'yellow',
      'stroke-width': '10',
    });
  });

  test('circle() creates circle element.', () => {
    const renderer = createRenderer(600, 400);

    const circle = renderer.circle({
      cx: 100,
      cy: 100,
      r: 50,
      fill: 'red',
      stroke: 'yellow',
      strokeWidth: 10,
    });

    mount(createDiv(), renderer.node());
    expect(circle.tagName).toBe('circle');
  });

  test('rect() creates rect element and accepts negative width and height.', () => {
    const renderer = createRenderer(600, 400);

    const rect = renderer.rect({
      x: 100,
      y: 100,
      width: -50,
      height: -50,
    });

    expect(getAttributes(rect, ['x', 'y', 'width', 'height'])).toEqual({
      x: '50',
      y: '50',
      width: '50',
      height: '50',
    });
    mount(createDiv(), renderer.node());
    expect(rect.tagName).toBe('rect');
  });

  test('line() creates line element.', () => {
    const renderer = createRenderer(600, 400);
    const line = renderer.line({
      x1: 0,
      y1: 0,
      x2: 50,
      y2: 50,
      stroke: 'black',
    });
    mount(createDiv(), renderer.node());
    expect(line.tagName).toBe('line');
  });

  test('text() creates text element and sets textContent.', () => {
    const renderer = createRenderer(600, 400);
    const text = renderer.text({
      x: 100,
      y: 100,
      text: 'hello world',
    });
    expect(text.tagName).toBe('text');
    mount(createDiv(), renderer.node());
    expect(text.textContent).toBe('hello world');
  });

  test('path() creates path element and accepts array to specify path.', () => {
    const renderer = createRenderer(600, 400);
    const d = [
      ['M', 10, 10],
      ['L', 100, 100],
      ['L', 100, 10],
      ['Z'],
    ];
    const path = renderer.path({
      d,
      stroke: 'black',
      fill: 'red',
    });
    expect(path.tagName).toBe('path');
    mount(createDiv(), renderer.node());
    expect(path.getAttribute('d')).toBe('M 10 10 L 100 100 L 100 10 Z');
  });
});
