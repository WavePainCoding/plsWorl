

import e from 'express';
import kaboom from 'kaboom';

const kabooom = () => kaboom();

const addButton = (txt,p,f) => {
  const btn = 
  add([
    rect(128, 64, {radius: 8}),
    pos(p),
    area(),
    scale(1),
    outline(4),
  ])

  btn.add([
    text(txt),
    color(0, 0, 0),
  ])

  btn.onHoverUpdate( () => {
      const t = time() * 10
      btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
      btn.scale = vec2(1.2)
      setCursor("pointer") 
  })

  btn.onHoverEnd(()=> {
    btn.scale = vec2(1)
    btn.color = rgb()
  })

  btn.onClick(f)

  return btn
}

export default {addButton, kabooom}