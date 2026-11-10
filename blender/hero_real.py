"""Realistic pass of the hero scene: a detailed laptop + phone with PBR materials.
Exports public/models/hero-real.glb (same object names as hero.glb, so src/hero3d.js can swap it in).

Run (from the project folder):
  "C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe" --background --factory-startup --python blender/hero_real.py
Add `-- render` for a Cycles still at blender/hero-real-render.png (slow on CPU: a few minutes).

Contract with src/hero3d.js: Lid (pivot on the hinge), LaptopScreen, Phone, PhoneScreen (UV 0..1 planes).
"""
import bpy, bmesh, math, os, sys
from mathutils import Matrix, Vector

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "models", "hero-real.glb")
RENDER = "--" in sys.argv and "render" in sys.argv[sys.argv.index("--") + 1:]

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def srgb(hex_):
    c = [int(hex_[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)


def material(name, hex_, rough, metal=0.0, coat=0.0):
    m = bpy.data.materials.new(name)
    bsdf = m.node_tree.nodes.get("Principled BSDF") if m.node_tree else None
    if bsdf is None:
        m.use_nodes = True
        bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*srgb(hex_), 1)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metal
    if coat:  # exported as KHR_materials_clearcoat → MeshPhysicalMaterial in three.js
        bsdf.inputs["Coat Weight"].default_value = coat
        bsdf.inputs["Coat Roughness"].default_value = 0.03
    return m


ALU = material("Aluminium", "6E6C68", 0.3, 1.0)           # space-grey bead-blasted aluminium
ALU_DARK = material("AluminiumDark", "3B3A37", 0.35, 1.0)
KEYCAP = material("Keycap", "141413", 0.62)
PAD = material("Trackpad", "55534F", 0.22, 0.4, coat=0.6)
GLASS = material("BlackGlass", "050505", 0.04, 0.0, coat=1.0)
LOGO = material("Logo", "D7D3CB", 0.08, 1.0)
FRAME = material("Frame", "A8501F", 0.26, 0.9)            # terracotta anodised phone frame
LENS = material("Lens", "0B0B0C", 0.02, 0.2, coat=1.0)
SCREEN = material("Screen", "F0EDE5", 0.9)


def finish(o, mat, bevel=0.0, segments=4):
    if bevel:
        mod = o.modifiers.new("bevel", "BEVEL")
        mod.width, mod.segments, mod.limit_method = bevel, segments, "ANGLE"
        o.modifiers.new("wn", "WEIGHTED_NORMAL")  # crisp flats with soft bevel highlights
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return o


def box(name, size, loc, mat, bevel=0.02, segments=4):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.object
    o.name = name
    o.scale = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return finish(o, mat, bevel, segments)


def cyl(name, r, depth, loc, mat, rot=(0, 0, 0), verts=48, bevel=0.0):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=depth, location=loc, rotation=rot, vertices=verts)
    o = bpy.context.object
    o.name = name
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    return finish(o, mat, bevel)


def plane(name, w, h, loc, mat):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc, rotation=(math.radians(90), 0, 0))
    o = bpy.context.object
    o.name = name
    o.scale = (w, h, 1)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    o.data.materials.append(mat)
    return o


def parent(child, par):
    child.parent = par
    child.matrix_parent_inverse = par.matrix_world.inverted()


# ===== Laptop (Blender: +Y is the back, camera looks from -Y) =====
W, D, T = 3.2, 2.2, 0.1
base = box("LaptopBase", (W, D, T), (0, 0, T / 2), ALU, bevel=0.05, segments=6)
deck = box("Deck", (2.96, 1.2, 0.004), (0, 0.3, T + 0.001), ALU_DARK, bevel=0.0)  # covers function row to spacebar row
parent(deck, base)

# Keyboard: rounded keycaps in one mesh (13 x 4 + a function row + a spacebar row).
mesh = bpy.data.meshes.new("Keyboard")
bm = bmesh.new()
pitch, cap = 0.205, 0.17
rows = [(13, 0.0), (13, 0.0), (12, 0.1), (11, 0.2)]
for r, (count, shift) in enumerate(rows):
    for c in range(count):
        x = (c - (count - 1) / 2) * pitch + shift * 0.1
        y = 0.62 - r * pitch
        bmesh.ops.create_cube(bm, size=1, matrix=Matrix.Translation((x, y, T + 0.02)) @ Matrix.Diagonal((cap, cap, 0.03, 1)))
for c in range(13):  # half-height function row
    bmesh.ops.create_cube(bm, size=1, matrix=Matrix.Translation(((c - 6) * pitch, 0.8, T + 0.02)) @ Matrix.Diagonal((cap, 0.08, 0.03, 1)))
for x, w in ((-1.08, 0.36), (-0.74, 0.17), (0, 1.15), (0.74, 0.17), (1.08, 0.36)):  # bottom row with spacebar
    bmesh.ops.create_cube(bm, size=1, matrix=Matrix.Translation((x, 0.62 - 4 * pitch, T + 0.02)) @ Matrix.Diagonal((w, cap, 0.03, 1)))
bm.to_mesh(mesh)
bm.free()
keyboard = bpy.data.objects.new("Keyboard", mesh)
scene.collection.objects.link(keyboard)
bpy.context.view_layer.objects.active = keyboard
keyboard.select_set(True)
finish(keyboard, KEYCAP, bevel=0.012, segments=3)
parent(keyboard, base)

pad = box("Trackpad", (1.25, 0.62, 0.004), (0, -0.66, T + 0.001), PAD, bevel=0.01)
parent(pad, base)
hinge = cyl("Hinge", 0.045, 2.5, (0, D / 2 - 0.05, T + 0.01), ALU_DARK, rot=(0, math.radians(90), 0), verts=32)
parent(hinge, base)

# Lid: aluminium shell + black glass front + screen, pivot on the hinge.
LH, LT = 2.1, 0.05
hy = D / 2 - 0.05
lid = box("Lid", (W, LT, LH), (0, hy, T + LH / 2 + 0.01), ALU, bevel=0.035, segments=6)
scene.cursor.location = (0, hy, T + 0.01)
bpy.context.view_layer.objects.active = lid
bpy.ops.object.origin_set(type="ORIGIN_CURSOR")
front = box("Bezel", (W - 0.03, 0.006, LH - 0.03), (0, hy - LT / 2 - 0.003, T + LH / 2 + 0.01), GLASS, bevel=0.012)
parent(front, lid)
screen = plane("LaptopScreen", W - 0.22, LH - 0.26, (0, hy - LT / 2 - 0.0075, T + LH / 2 + 0.035), SCREEN)
parent(screen, lid)
camdot = cyl("Webcam", 0.018, 0.004, (0, hy - LT / 2 - 0.0072, T + LH - 0.05), LENS, rot=(math.radians(90), 0, 0), verts=24)
parent(camdot, lid)
logo = cyl("Logo", 0.17, 0.003, (0, hy + LT / 2 + 0.0015, T + LH / 2 + 0.05), LOGO, rot=(math.radians(90), 0, 0), verts=64)
parent(logo, lid)
lid.rotation_euler.x = math.radians(-14)  # opened ~104°

# ===== Phone: anodised frame, black glass front, camera bump on the back =====
PW, PH, PT = 0.82, 1.7, 0.085
phone = box("Phone", (PW, PT, PH), (0, 0, PH / 2), FRAME, bevel=0.1, segments=10)
scene.cursor.location = (0, 0, 0)
bpy.context.view_layer.objects.active = phone
bpy.ops.object.origin_set(type="ORIGIN_CURSOR")
glass = box("PhoneGlass", (PW - 0.03, 0.004, PH - 0.03), (0, -PT / 2 - 0.001, PH / 2), GLASS, bevel=0.09, segments=10)
parent(glass, phone)
phone_screen = plane("PhoneScreen", PW - 0.1, PH - 0.16, (0, -PT / 2 - 0.0035, PH / 2), SCREEN)
parent(phone_screen, phone)
bump = box("CameraBump", (0.34, 0.025, 0.34), (-0.16, PT / 2 + 0.012, PH - 0.27), FRAME, bevel=0.06, segments=8)
parent(bump, phone)
for dx, dz in ((-0.07, 0.07), (0.07, -0.07), (-0.07, -0.07)):
    lens = cyl("Lens", 0.055, 0.03, (-0.16 + dx, PT / 2 + 0.027, PH - 0.27 + dz), LENS, rot=(math.radians(90), 0, 0), bevel=0.008)
    parent(lens, phone)
phone.location = (-2.05, -1.25, 0)
phone.rotation_euler = (math.radians(-8), 0, math.radians(18))

os.makedirs(os.path.dirname(OUT), exist_ok=True)
bpy.ops.export_scene.gltf(filepath=OUT, export_format="GLB", export_apply=True)
print("EXPORTED", OUT, os.path.getsize(OUT), "bytes")

if RENDER:
    # Studio still in Cycles: soft area lights, a shadow-catcher floor, filmic look.
    cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
    scene.collection.objects.link(cam)
    cam.location = (-1.6, -8.2, 3.4)
    cam.rotation_euler = (math.radians(73), 0, math.radians(-9))
    cam.data.lens = 55
    scene.camera = cam
    for name, loc, size, energy in (("key", (4, -4, 6), 5, 1400), ("fill", (-6, -3, 3), 6, 500), ("rim", (0, 6, 5), 4, 900)):
        light = bpy.data.objects.new(name, bpy.data.lights.new(name, "AREA"))
        light.data.size, light.data.energy = size, energy
        light.location = loc
        light.rotation_euler = (Vector((0, 0.3, 0.8)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
        scene.collection.objects.link(light)
    bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, 0))
    floor = bpy.context.object
    floor.data.materials.append(material("Floor", "F3F0EA", 0.85))  # page-coloured table so shadows read
    world = bpy.data.worlds.new("w")
    scene.world = world
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (*srgb("FAF9F6"), 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 96
    scene.cycles.use_denoising = True
    scene.view_settings.view_transform = "AgX"
    scene.render.resolution_x, scene.render.resolution_y = 1280, 860
    scene.render.filepath = os.path.join(ROOT, "blender", "hero-real-render.png")
    bpy.ops.render.render(write_still=True)
    print("RENDERED", scene.render.filepath)
