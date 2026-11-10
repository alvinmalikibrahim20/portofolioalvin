"""Builds the hero scene (laptop + phone) and exports public/models/hero.glb.

Run (from the project folder):
  "C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe" --background --factory-startup --python blender/hero.py
Add `-- preview` to also render blender/hero-preview.png for a quick visual check.

Object names are a contract with src/hero3d.js:
  Lid (pivot on the hinge), LaptopScreen, Phone, PhoneScreen.
Screens are plain UV-mapped planes; the web page paints animated UI onto them.
"""
import bpy, bmesh, math, os, sys
from mathutils import Matrix, Vector

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "models", "hero.glb")
PREVIEW = "--" in sys.argv and "preview" in sys.argv[sys.argv.index("--") + 1:]

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def srgb(hex_):  # site palette is sRGB; Blender wants linear
    c = [int(hex_[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)


def material(name, hex_, rough, metal=0.0):
    m = bpy.data.materials.new(name)
    bsdf = m.node_tree.nodes.get("Principled BSDF") if m.node_tree else None
    if bsdf is None:  # Blender 5 creates node materials by default; older versions need the toggle
        m.use_nodes = True
        bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*srgb(hex_), 1)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metal
    return m


INK = material("Ink", "1C1B18", 0.38, 0.35)
KEYS = material("Keys", "2E2C28", 0.6)
PAD = material("Pad", "262420", 0.3, 0.2)
TERRACOTTA = material("Terracotta", "A8501F", 0.4, 0.1)
SCREEN = material("Screen", "F0EDE5", 0.9)


def box(name, size, loc, mat, bevel=0.03, segments=3):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.object
    o.name = name
    o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    if bevel:
        mod = o.modifiers.new("bevel", "BEVEL")
        mod.width, mod.segments, mod.limit_method = bevel, segments, "ANGLE"
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return o


def plane(name, w, h, loc, mat, rot_x=math.radians(90)):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc, rotation=(rot_x, 0, 0))
    o = bpy.context.object
    o.name = name
    o.scale = (w, h, 1)
    bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(mat)
    return o


def parent(child, par):
    child.parent = par
    child.matrix_parent_inverse = par.matrix_world.inverted()


# ---- Laptop (Blender: +Y is the back, camera looks from -Y) ----
W, D, T = 3.2, 2.2, 0.12
base = box("LaptopBase", (W, D, T), (0, 0, T / 2), INK, bevel=0.05)

# Keyboard: one mesh of 13 x 4 keys.
mesh = bpy.data.meshes.new("Keyboard")
bm = bmesh.new()
cols, rows, key, gap = 13, 4, 0.17, 0.035
for r in range(rows):
    for c in range(cols):
        x = (c - (cols - 1) / 2) * (key + gap)
        y = 0.25 + (r - (rows - 1) / 2) * (key + gap)
        bmesh.ops.create_cube(bm, size=1, matrix=Matrix.Translation((x, y, T + 0.012)) @ Matrix.Diagonal((key, key, 0.025, 1)))
bm.to_mesh(mesh)
bm.free()
keyboard = bpy.data.objects.new("Keyboard", mesh)
scene.collection.objects.link(keyboard)
keyboard.data.materials.append(KEYS)
parent(keyboard, base)

pad = plane("Trackpad", 1.1, 0.62, (0, -0.68, T + 0.002), PAD, rot_x=0)
parent(pad, base)

# Lid: modelled upright, origin moved onto the hinge so the web page can open/close it.
LH, LT = 2.1, 0.07
hinge = Vector((0, D / 2 - 0.04, T))
lid = box("Lid", (W, LT, LH), (0, hinge.y, T + LH / 2), INK, bevel=0.04)
scene.cursor.location = hinge
bpy.ops.object.origin_set(type="ORIGIN_CURSOR")
screen = plane("LaptopScreen", W - 0.22, LH - 0.24, (0, hinge.y - LT / 2 - 0.002, T + LH / 2 + 0.03), SCREEN)
parent(screen, lid)
lid.rotation_euler.x = math.radians(-14)  # opened ~104°

# ---- Phone, standing front-left of the laptop ----
PW, PH, PT = 0.82, 1.7, 0.09
phone = box("Phone", (PW, PT, PH), (0, 0, PH / 2), TERRACOTTA, bevel=0.09, segments=5)
scene.cursor.location = (0, 0, 0)
bpy.ops.object.origin_set(type="ORIGIN_CURSOR")
phone_screen = plane("PhoneScreen", PW - 0.1, PH - 0.14, (0, -PT / 2 - 0.002, PH / 2), SCREEN)
parent(phone_screen, phone)
phone.location = (-2.05, -1.25, 0)
phone.rotation_euler = (math.radians(-8), 0, math.radians(18))

os.makedirs(os.path.dirname(OUT), exist_ok=True)
bpy.ops.export_scene.gltf(filepath=OUT, export_format="GLB", export_apply=True)
print("EXPORTED", OUT, os.path.getsize(OUT), "bytes")

if PREVIEW:
    cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
    scene.collection.objects.link(cam)
    cam.location = (-1.2, -8.5, 3.6)
    cam.rotation_euler = (math.radians(72), 0, math.radians(-6))
    scene.camera = cam
    for rot, energy in (((0.8, 0.2, 0.6), 4), ((-0.6, -0.4, -2.4), 1.5)):
        light = bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN"))
        light.data.energy = energy
        light.rotation_euler = rot
        scene.collection.objects.link(light)
    scene.world = bpy.data.worlds.new("w")
    scene.render.film_transparent = True
    engines = [e.identifier for e in scene.render.bl_rna.properties["engine"].enum_items]
    scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in engines else "BLENDER_EEVEE"
    scene.render.resolution_x, scene.render.resolution_y = 800, 560
    scene.render.filepath = os.path.join(ROOT, "blender", "hero-preview.png")
    bpy.ops.render.render(write_still=True)
    print("PREVIEW", scene.render.filepath)
