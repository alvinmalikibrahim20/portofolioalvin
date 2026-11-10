"""Builds the Tunas Auction showroom scene and exports public/models/auction.glb.

Run (from the project folder):
  "C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe" --background --factory-startup --python blender/auction.py
It also renders public/images/projects/tunas-auction-scene.webp, the still shown on phones and without JavaScript.

Object names are a contract with src/auction3d.js:
  Turntable (car is its child), Gavel (pivot at the handle end, exported raised), Block, Paddle0..2 (pivot at the grip).
"""
import bpy, bmesh, math, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "models", "auction.glb")
STILL = os.path.join(ROOT, "public", "images", "projects", "tunas-auction-scene.webp")

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


PAINT = material("Paint", "A8501F", 0.25, 0.3)
GLASS = material("Glass", "1C1B18", 0.08, 0.7)
TYRE = material("Tyre", "161513", 0.7)
CREAM = material("Cream", "F0EDE5", 0.35)
STAGE = material("Stage", "2E2C28", 0.45, 0.2)
WOOD = material("Wood", "8A5A3B", 0.45)
TAIL = material("Tail", "7A1F12", 0.3)


def finish(o, mat, bevel=0.0, segments=3, smooth=True):
    if bevel:
        mod = o.modifiers.new("bevel", "BEVEL")
        mod.width, mod.segments, mod.limit_method = bevel, segments, "ANGLE"
    if smooth:
        bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return o


def box(name, size, loc, mat, bevel=0.03, segments=3):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.object
    o.name = name
    o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    return finish(o, mat, bevel, segments)


def cyl(name, r, depth, loc, mat, rot=(0, 0, 0), verts=48, bevel=0.0):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=depth, location=loc, rotation=rot, vertices=verts)
    o = bpy.context.object
    o.name = name
    bpy.ops.object.transform_apply(rotation=True)  # so joined parts share an unrotated local space
    return finish(o, mat, bevel)


def parent(child, par):
    child.parent = par
    child.matrix_parent_inverse = par.matrix_world.inverted()


def pivot(o, point):
    scene.cursor.location = point
    bpy.context.view_layer.objects.active = o
    for other in bpy.context.selected_objects:
        other.select_set(False)
    o.select_set(True)
    bpy.ops.object.origin_set(type="ORIGIN_CURSOR")


# ---- Turntable ----
table = cyl("Turntable", 2.7, 0.18, (0, 0, 0.09), STAGE, verts=96, bevel=0.03)
bpy.ops.mesh.primitive_torus_add(major_radius=2.66, minor_radius=0.035, location=(0, 0, 0.18), major_segments=128)
ring = finish(bpy.context.object, PAINT)
ring.name = "Ring"
parent(ring, table)

# ---- Car (length along X, front at +X) ----
car_parts = []
body = box("Body", (3.7, 1.65, 0.5), (0, 0, 0.62), PAINT, bevel=0.16, segments=4)
car_parts.append(body)

# Cabin: a box whose roof is pulled in, so it reads as a car silhouette.
bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.25, 0, 1.12))
cabin = bpy.context.object
cabin.name = "Cabin"
cabin.scale = (2.0, 1.45, 0.52)
bpy.ops.object.transform_apply(scale=True)
bm = bmesh.new()
bm.from_mesh(cabin.data)
for v in bm.verts:
    if v.co.z > 0:
        v.co.x = v.co.x * 0.62 - 0.1
        v.co.y *= 0.9
bm.to_mesh(cabin.data)
bm.free()
finish(cabin, PAINT, bevel=0.12, segments=4)
car_parts.append(cabin)
# Glass band slightly proud of the cabin: reads as side windows, windscreen and rear window.
car_parts.append(box("Windows", (1.68, 1.36, 0.24), (-0.3, 0, 1.13), GLASS, bevel=0.06))

for x in (1.18, -1.18):
    for y in (0.82, -0.82):
        car_parts.append(cyl("Tyre", 0.38, 0.3, (x, y, 0.56), TYRE, rot=(math.radians(90), 0, 0), bevel=0.05))
        car_parts.append(cyl("Hub", 0.19, 0.32, (x, y, 0.56), CREAM, rot=(math.radians(90), 0, 0), verts=24))
for y in (0.52, -0.52):
    car_parts.append(box("Headlight", (0.06, 0.38, 0.12), (1.86, y, 0.72), CREAM, bevel=0.02))
    car_parts.append(box("Taillight", (0.06, 0.4, 0.1), (-1.86, y, 0.74), TAIL, bevel=0.02))

for o in bpy.context.selected_objects:
    o.select_set(False)
for o in car_parts:
    o.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.convert(target="MESH")  # bake bevels before joining
bpy.ops.object.join()
car = bpy.context.object
car.name = "Car"
car.location.z += 0.2  # tyres rest on the turntable surface
parent(car, table)
table.rotation_euler.z = math.radians(-28)

# ---- Gavel on its sound block, front right ----
block = cyl("Block", 0.5, 0.16, (3.3, -2.0, 0.08), WOOD, bevel=0.03)
handle = cyl("Gavel", 0.06, 1.5, (4.05, -2.0, 0.55), WOOD, rot=(0, math.radians(90), 0), verts=24)
head = cyl("Head", 0.2, 0.6, (3.3, -2.0, 0.55), WOOD, verts=48, bevel=0.03)
for o in bpy.context.selected_objects:
    o.select_set(False)
handle.select_set(True)
head.select_set(True)
bpy.context.view_layer.objects.active = handle
bpy.ops.object.join()
gavel = bpy.context.object
gavel.name = "Gavel"
pivot(gavel, (4.8, -2.0, 0.55))
gavel.rotation_euler.y = math.radians(38)  # raised; the page swings it back to 0 to strike

# ---- Bid paddles, left foreground (hidden/raised by the page) ----
for i, (x, y) in enumerate(((-3.7, -0.4), (-3.1, -2.2), (-1.2, -3.2))):
    disc = cyl(f"Paddle{i}", 0.34, 0.05, (x, y, 1.35), CREAM, rot=(math.radians(90), 0, 0), verts=48, bevel=0.015)
    grip = box("Grip", (0.08, 0.05, 0.8), (x, y, 0.75), STAGE, bevel=0.015)
    for o in bpy.context.selected_objects:
        o.select_set(False)
    disc.select_set(True)
    grip.select_set(True)
    bpy.context.view_layer.objects.active = disc
    bpy.ops.object.join()
    paddle = bpy.context.object
    paddle.name = f"Paddle{i}"
    pivot(paddle, (x, y, 0.35))

os.makedirs(os.path.dirname(OUT), exist_ok=True)
bpy.ops.export_scene.gltf(filepath=OUT, export_format="GLB", export_apply=True)
print("EXPORTED", OUT, os.path.getsize(OUT), "bytes")

# ---- Still for phones / no-JS: final "sold" moment ----
gavel.rotation_euler.y = 0
cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
scene.collection.objects.link(cam)
cam.location = (0.6, -10.5, 4.4)
cam.rotation_euler = (math.radians(70), 0, math.radians(3))
cam.data.lens = 42
scene.camera = cam
for rot, energy in (((0.7, 0.3, 0.5), 3.5), ((-0.5, -0.4, -2.4), 1.2)):
    light = bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN"))
    light.data.energy = energy
    light.rotation_euler = rot
    scene.collection.objects.link(light)
world = bpy.data.worlds.new("w")
scene.world = world
world.color = srgb("1C1B18")
if world.node_tree:  # Blender 5 worlds are node based
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (*srgb("1C1B18"), 1)
engines = [e.identifier for e in scene.render.bl_rna.properties["engine"].enum_items]
scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in engines else "BLENDER_EEVEE"
scene.view_settings.view_transform = "Standard"
scene.render.resolution_x, scene.render.resolution_y = 1280, 800
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.quality = 82
scene.render.filepath = STILL
bpy.ops.render.render(write_still=True)
print("STILL", STILL, os.path.getsize(STILL), "bytes")
