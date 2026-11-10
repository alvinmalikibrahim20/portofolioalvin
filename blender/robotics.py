"""Builds the Racer Robot R&D scene and exports public/models/robotics.glb.

Run (from the project folder):
  "C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe" --background --factory-startup --python blender/robotics.py
It also renders public/images/projects/racer-robot-scene.webp (phones / no-JS still).

Object names are a contract with src/robotics3d.js:
  Robot (drives the track; +X is forward), Head (child, yaw follows the cursor), Beacon (antenna tip), Cloud.
The neural network is drawn by the page (nodes light up individually), not modelled here.
"""
import bpy, math, os, random

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "models", "robotics.glb")
STILL = os.path.join(ROOT, "public", "images", "projects", "racer-robot-scene.webp")
random.seed(3)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def srgb(hex_):
    c = [int(hex_[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)


def material(name, hex_, rough, metal=0.0, emit=0.0):
    m = bpy.data.materials.new(name)
    bsdf = m.node_tree.nodes.get("Principled BSDF") if m.node_tree else None
    if bsdf is None:
        m.use_nodes = True
        bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*srgb(hex_), 1)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metal
    if emit:
        bsdf.inputs["Emission Color"].default_value = (*srgb(hex_), 1)
        bsdf.inputs["Emission Strength"].default_value = emit
    return m


BOARD = material("Board", "26302A", 0.55, 0.1)
TRACE = material("Trace", "A8501F", 0.35, 0.6)
PAD = material("Pad", "C9A27A", 0.3, 0.8)
CREAM = material("Cream", "F0EDE5", 0.4)
BODY = material("Body", "A8501F", 0.3, 0.2)
INK = material("Ink", "1C1B18", 0.45, 0.3)
LED = material("Led", "E0703A", 0.3, 0.0, emit=3.0)


def finish(o, mat, bevel=0.0, smooth=True):
    if bevel:
        mod = o.modifiers.new("bevel", "BEVEL")
        mod.width, mod.segments, mod.limit_method = bevel, 3, "ANGLE"
    if smooth:
        bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return o


def box(name, size, loc, mat, bevel=0.03, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object
    o.name = name
    o.scale = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)  # Blender 5 defaults would bake location too
    return finish(o, mat, bevel)


def cyl(name, r, depth, loc, mat, rot=(0, 0, 0), verts=32, bevel=0.0):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=depth, location=loc, rotation=rot, vertices=verts)
    o = bpy.context.object
    o.name = name
    return finish(o, mat, bevel)


def sphere(name, r, loc, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=loc, segments=32, ring_count=16)
    o = bpy.context.object
    o.name = name
    return finish(o, mat)


def parent(child, par):
    child.parent = par
    child.matrix_parent_inverse = par.matrix_world.inverted()


# ---- PCB board with traces and pads ----
board = box("Board", (7.4, 4.6, 0.12), (0, 0, -0.06), BOARD, bevel=0.06)
for _ in range(16):
    horizontal = random.random() < 0.5
    length = random.uniform(0.6, 1.8)
    x, y = random.uniform(-3.3, 3.3), random.choice((random.uniform(-2.1, -1.7), random.uniform(1.7, 2.1), random.uniform(-0.3, 0.3)))
    if abs(y) < 0.4:
        x = random.choice((random.uniform(-3.4, -3.0), random.uniform(3.0, 3.4)))  # keep the centre clear for the track
    # Keep every trace (and its end pads) on the board.
    x = max(-3.5 + (length / 2 if horizontal else 0), min(3.5 - (length / 2 if horizontal else 0), x))
    y = max(-2.1 + (0 if horizontal else length / 2), min(2.1 - (0 if horizontal else length / 2), y))
    t = box("Trace", (length, 0.05, 0.012) if horizontal else (0.05, length, 0.012), (x, y, 0.006), TRACE, bevel=0)
    parent(t, board)
    for end in (-1, 1):
        px, py = (x + end * length / 2, y) if horizontal else (x, y + end * length / 2)
        pad = cyl("Pad", 0.07, 0.02, (px, py, 0.01), PAD, verts=16)
        parent(pad, board)

# ---- Line-follower track: a cream ellipse ----
bpy.ops.curve.primitive_bezier_circle_add(radius=1, location=(0, 0, 0.02))
track = bpy.context.object
track.name = "Track"
track.scale = (2.6, 1.45, 1)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
track.data.bevel_depth = 0.035
track.data.resolution_u = 24
bpy.ops.object.convert(target="MESH")
finish(track, CREAM)
track.scale.z = 0.25

# ---- Robot (+X forward) ----
robot = box("Robot", (0.95, 0.72, 0.3), (0, 0, 0.3), BODY, bevel=0.08)
for y in (0.43, -0.43):
    w = cyl("Wheel", 0.2, 0.12, (-0.12, y, 0.2), INK, rot=(math.radians(90), 0, 0), bevel=0.02)
    parent(w, robot)
caster = sphere("Caster", 0.08, (0.36, 0, 0.08), INK)
parent(caster, robot)
bar = box("SensorBar", (0.08, 0.6, 0.06), (0.5, 0, 0.2), INK, bevel=0.01)
parent(bar, robot)
for y in (-0.2, 0, 0.2):
    led = sphere("Led", 0.035, (0.55, y, 0.2), LED)
    parent(led, robot)

head = box("Head", (0.5, 0.55, 0.36), (0.05, 0, 0.66), CREAM, bevel=0.08)
scene.cursor.location = (0.05, 0, 0.48)  # yaw pivot at the neck
bpy.context.view_layer.objects.active = head
bpy.ops.object.origin_set(type="ORIGIN_CURSOR")
for y in (0.12, -0.12):
    eye = cyl("Eye", 0.07, 0.03, (0.31, y, 0.7), INK, rot=(0, math.radians(90), 0), verts=24)
    parent(eye, head)
antenna = cyl("Antenna", 0.018, 0.34, (0.0, 0, 1.0), INK, verts=12)
parent(antenna, head)
beacon = sphere("Beacon", 0.07, (0.0, 0, 1.19), LED)
parent(beacon, head)
parent(head, robot)
robot.location = (2.6, 0, 0)  # starts on the right of the track; the page drives it

# ---- Cloud (IoT backend), top right ----
cloud_parts = [sphere("Cloud", r, loc, CREAM) for r, loc in ((0.42, (2.5, 0.6, 2.9)), (0.32, (2.05, 0.6, 2.8)), (0.3, (2.95, 0.6, 2.78)), (0.28, (2.35, 0.6, 3.15)))]
for o in bpy.context.selected_objects:
    o.select_set(False)
for o in cloud_parts:
    o.select_set(True)
bpy.context.view_layer.objects.active = cloud_parts[0]
bpy.ops.object.join()
cloud = bpy.context.object
cloud.name = "Cloud"

os.makedirs(os.path.dirname(OUT), exist_ok=True)
bpy.ops.export_scene.gltf(filepath=OUT, export_format="GLB", export_apply=True)
print("EXPORTED", OUT, os.path.getsize(OUT), "bytes")

# ---- Still ----
robot.location = (1.2, -1.3, 0)
robot.rotation_euler.z = math.radians(-125)  # face the camera so the eyes read
cloud.location = (1.9, 0.6, 2.2)  # pull the cloud into frame for the still
cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
scene.collection.objects.link(cam)
cam.location = (0, -8.8, 4.6)
cam.rotation_euler = (math.radians(64), 0, 0)
cam.data.lens = 34
scene.camera = cam
for rot, energy in (((0.7, 0.3, 0.5), 3.0), ((-0.5, -0.4, -2.4), 1.0)):
    light = bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN"))
    light.data.energy = energy
    light.rotation_euler = rot
    scene.collection.objects.link(light)
world = bpy.data.worlds.new("w")
scene.world = world
if world.node_tree:
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (*srgb("1A1E1B"), 1)
engines = [e.identifier for e in scene.render.bl_rna.properties["engine"].enum_items]
scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in engines else "BLENDER_EEVEE"
scene.view_settings.view_transform = "Standard"
scene.render.resolution_x, scene.render.resolution_y = 1280, 800
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.quality = 82
scene.render.filepath = STILL
bpy.ops.render.render(write_still=True)
print("STILL", STILL, os.path.getsize(STILL), "bytes")
