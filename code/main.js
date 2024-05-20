import kaboom from 'kaboom';
kaboom()

loadSprite("bag", "/sprites/bag.png")
loadSprite("ghosty", "/sprites/ghosty.png")
loadSprite("grass", "/sprites/Grass.png",{
  sliceX: 14,
})
loadSprite("stone", "/sprites/Stone.png", {
  sliceX: 14,
})
loadSprite("door1", "/sprites/door_p1.png")
loadSprite("door2", "/sprites/door_p2.png")
loadSprite("steel", "/sprites/steel.png")
loadSprite("door", "/sprites/door.png")
loadSprite("key", "/sprites/key.png")
loadSprite("bean", "/sprites/bean.png")
loadSprite("bullet", "/sprites/bullet.png")

//"=:8","<:2",">:3","^:1",
scene("main", (levelIdx) => {
  const levels = [
    
    [
      "#=========[]==============#", //Implement "[]"
      "< a  .                    >",
      "<    .....                >",
      "<                         >",
      "<    .....                >",
      "< $  .                    >",
      "<.....                    >",
      "<                         >",
      "<                         >",
      "<   @                     >",
      "#^^^^^^^^^^^^^^^^^^^^^^^^^#",
      ],
    [
      "---------",
      "-       -",
      "-  $    -",
      "|       -",
      "-       -",
      "-  b  b -",
      "-   @   -",
      "---------",
      ],
    ]

  addLevel(levels[levelIdx], {
    width: 64,
    height: 64,
    pos: vec2(64, 64),
    
    "@": () => [
      sprite("bean"),
      scale(0.8),
      area(),
      solid(),
      "player",
      ],
    //"=:8","<:2",">:3","^:1",
    "=": () => [
      sprite("grass", {frame: 8}),
      scale(4),
      area(),
      solid(),
      "wall",
      ],
    "#": () => [
      sprite("grass", {frame: 0}),
      scale(4),
      area(),
      solid(),
      "wall",
    ],  
    "^": () => [
      sprite("grass", {frame: 1}),
      scale(4),
      area(),
      solid(),
      "wall",
    ],
    "<": () => [
      sprite("grass", {frame: 2}),
      scale(4),
      area(),
      solid(),
      "wall",
      ],
    ">": () => [
      sprite("grass", {frame: 3}),
      scale(4),
      area(),
      solid(),
      "wall",
      ],
    "-": () => [
      sprite("steel"),
      area(),
      solid(),
      "wall",
      ],
      
    ".": () => [
      sprite("stone", {frame: 1}),
      scale(4),
      area(),
      solid(),
      "wall",
    ],
    "[": () =>[
      sprite("door1"),
      scale(4),
      area(),
      solid(),
      "door",
      "wall",
    ],
    "]": () =>[
      sprite("door2"),
      scale(4),
      area(),
      solid(),
      "door",
      "wall",
    ],
    "$": () => [
      sprite("key"),
      area(),
      "key",
      ],
    "|": () => [
      sprite("door"),
      area(),
      solid(),
      "door",
      ],
    "a": () => [
      sprite("bag"),
      area(),
      solid(),
      "character",
      { msg: "get out!" },
      ],
    "b": () => [
      sprite("ghosty"),
      area(),
      solid(),
      "character",
      { msg: "hi!" },
      ],

  })

  const player = get("player")[0]
  player.onUpdate( () =>{
    camPos(player.pos)
  })
  const npc = get("character")[0]
  npc.onClick(()=>{
    addKaboom(npc.pos)
  })
  const dialog = add([
    text(""),
    pos(),
    ])

  let hasKey = false

  player.onCollide("key", (key) => {
    destroy(key)
    hasKey = true
  })

  player.onCollide("door", () => {
    if (hasKey) {
      if (levelIdx + 1 < levels.length) {
          go("main", levelIdx + 1)
      } else {
          go("win")
      }
    } else {
      dialog.text = "you got no key!"
      dialog.pos = player.pos, player.pos-player.height
      dialog.scale = 0.2
    }
  })

  player.onCollide("character", (ch) => {
    dialog.text = ch.msg
  })

  const dirs = {
    "a": LEFT,
    "d": RIGHT,
    "w": UP,
    "s": DOWN,
    
  }
  for (const dir in dirs) {
    onKeyDown(dir, () => {
      dialog.text = ""
      player.move(dirs[dir].scale(320))
    })
  }
})


scene("win", () => {

  add([
    text("You Win!"),
    pos(width() / 2, height() / 2),
    origin("center"),
    ])
})
go("main", 0)