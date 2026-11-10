"""Builds the Finance operations scene and exports public/models/finance.glb.

Run (from the project folder):
  "C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe" --background --factory-startup --python blender/finance.py
It also renders public/images/projects/finance-operations-scene.webp (phones / no-JS still, final "reconciled" state).

Object names are a contract with src/finance3d.js:
  PillarA (auction ops), PillarB (finance console), PillarC (ERP), LedgerA0..4 / LedgerC0..4 (exported misaligned),
  Coin and Card (templates the page clones to flow along the rails).
"""
import bpy, math, os, random

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "models", "finance.glb")
STILL = os.path.join(ROOT, "public", "images", "projects", "finance-operations-scene.webp")
random.seed(7)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def srgb(hex_):
    c = [int(hex_[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)


def material(name, hex_, rough, metal=0.0):
    m = bpy.data.materials.new(name)
    bsdf = m.node_tree.nodes.get("Principled BSDF") if m.node_tree else None
    if bsdf is None:
        m.use_nodes = True
        bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*srgb(hex_), 1)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metal
    return m


INK = material("Ink", "1C1B18", 0.4, 0.3)
CREAM = material("Cream", "FAF9F6", 0.45)
SAND = material("Sand", "E3C9B8", 0.5)
TERRA = material("Terracotta", "A8501F", 0.3, 0.2)
GOLD = material("Coin", "C2733A", 0.22, 0.75)


def box(name, size, loc, mat, bevel=0.04, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object
    o.name = name
    o.scale = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        mod = o.modifiers.new("bevel", "BEVEL")
        mod.width, mod.segments, mod.limit_method = bevel, 3, "ANGLE"
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return o


def parent(child, par):
    child.parent = par
    child.matrix_parent_inverse = par.matrix_world.inverted()


PILLARS = (("PillarA", -3.6, 1.2), ("PillarB", 0.0, 1.6), ("PillarC", 3.6, 1.2))
for name, x, h in PILLARS:
    p = box(name, (1.5, 1.5, h), (x, 0, h / 2), INK, bevel=0.12)
    cap = box(name + "Cap", (1.56, 1.56, 0.06), (x, 0, h + 0.03), TERRA, bevel=0.03)
    parent(cap, p)

# Ledger stacks on the auction (A) and ERP (C) pillars, exported out of line; the page squares them up.
for name, x, h in (PILLARS[0], PILLARS[2]):
    for i in range(5):
        slab = box(f"Ledger{name[-1]}{i}", (1.05, 0.75, 0.12), (x + random.uniform(-0.32, 0.32), random.uniform(-0.12, 0.12), h + 0.12 + i * 0.14),
                   CREAM if i % 2 == 0 else SAND, bevel=0.03, rot=(0, 0, math.radians(random.uniform(-16, 16))))

# Finance console on B: a tilted panel with a terracotta screen.
console = box("Console", (1.3, 0.1, 0.85), (0, 0.15, 1.6 + 0.55), INK, bevel=0.04, rot=(math.radians(-18), 0, 0))
screen = box("ConsoleScreen", (1.16, 0.02, 0.7), (0, 0.09, 1.6 + 0.56), TERRA, bevel=0.0, rot=(math.radians(-18), 0, 0))
parent(screen, console)
stand = box("Stand", (0.18, 0.18, 0.3), (0, 0.25, 1.6 + 0.15), INK, bevel=0.03)

# Templates the page clones (kept off-stage).
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=0.06, location=(0, 0, -6), rotation=(math.radians(90), 0, 0), vertices=40)
coin = bpy.context.object
coin.name = "Coin"
bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
bpy.ops.object.shade_smooth()
coin.data.materials.append(GOLD)
card = box("Card", (0.46, 0.02, 0.32), (0, 0, -6), CREAM, bevel=0.01)
stripe = box("CardStripe", (0.3, 0.025, 0.04), (0, 0, -6 + 0.07), TERRA, bevel=0.0)
parent(stripe, card)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
bpy.ops.export_scene.gltf(filepath=OUT, export_format="GLB", export_apply=True)
print("EXPORTED", OUT, os.path.getsize(OUT), "bytes")

# ---- Still: final state, ledgers squared up, a few coins/cards in flight on the arcs ----
for o in bpy.data.objects:
    if o.name.startswith("Ledger"):
        pillar_x = -3.6 if o.name[6] == "A" else 3.6
        o.location.x, o.location.y, o.rotation_euler.z = pillar_x, 0, 0
for i, t in enumerate((0.3, 0.65)):
    c = coin.copy(); scene.collection.objects.link(c)
    c.location = (-3.6 + 3.6 * t, 0, 2.2 + math.sin(t * math.pi) * 1.0)
    k = card.copy(); scene.collection.objects.link(k)
    k.location = (3.6 * t, 0, 2.5 + math.sin(t * math.pi) * 0.9)
cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
scene.collection.objects.link(cam)
cam.location = (0, -12.5, 4.6)
cam.rotation_euler = (math.radians(76), 0, 0)
cam.data.lens = 40
scene.camera = cam
for rot, energy in (((0.7, 0.3, 0.5), 3.2), ((-0.5, -0.4, -2.4), 1.2)):
    light = bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN"))
    light.data.energy = energy
    light.rotation_euler = rot
    scene.collection.objects.link(light)
world = bpy.data.worlds.new("w")
scene.world = world
if world.node_tree:
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (*srgb("EFEAE0"), 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 1.0
engines = [e.identifier for e in scene.render.bl_rna.properties["engine"].enum_items]
scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in engines else "BLENDER_EEVEE"
scene.view_settings.view_transform = "Standard"
scene.render.resolution_x, scene.render.resolution_y = 1280, 800
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.quality = 82
scene.render.filepath = STILL
bpy.ops.render.render(write_still=True)
print("STILL", STILL, os.path.getsize(STILL), "bytes")
