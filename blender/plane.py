"""Renders the Contact paper plane: a flat note folding into a dart, as a transparent frame sequence.

Run (from the project folder):
  "C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe" --background --factory-startup --python blender/plane.py
Writes public/images/plane/fold-00.webp … fold-23.webp (used by src/components/ContactPlane.vue; the last
frame doubles as the static image for no-JS and reduced motion).

The dart is four rigid triangles hinged on one line (nose → tail): two wings and two keel halves.
Flat: every flap lies in one plane (a diamond-shaped note). Folded: keels drop to vertical, wings lift.
"""
import bpy, math, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "images", "plane")
FRAMES = 24

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def srgb(hex_):
    c = [int(hex_[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)


def material(name, hex_):
    m = bpy.data.materials.new(name)
    bsdf = m.node_tree.nodes.get("Principled BSDF") if m.node_tree else None
    if bsdf is None:
        m.use_nodes = True
        bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*srgb(hex_), 1)
    bsdf.inputs["Roughness"].default_value = 0.7
    m.use_backface_culling = False
    return m


PAPER = material("Paper", "F3EEE5")  # a touch darker than the page so it never vanishes into the background
PAPER_SHADE = material("PaperShade", "DCD2C2")
STRIPE = material("Stripe", "A8501F")

# Hinge runs along X from tail T(-1,0,0) to nose N(1.2,0,0). Each flap's origin is at T, so rotating about X folds it.
N, T = (1.2, 0, 0), (-1.0, 0, 0)


def flap(name, tip, mat):
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata([(0, 0, 0), (N[0] - T[0], 0, 0), (0, tip[1], tip[2])], [], [(0, 1, 2)])
    o = bpy.data.objects.new(name, mesh)
    o.location = T
    mesh.materials.append(mat)
    scene.collection.objects.link(o)
    sol = o.modifiers.new("thick", "SOLIDIFY")
    sol.thickness = 0.012
    return o


wing_l = flap("WingL", (0, 0.62, 0), PAPER)
wing_r = flap("WingR", (0, -0.62, 0), PAPER)
keel_l = flap("KeelL", (0, 0.3, 0), PAPER_SHADE)   # modelled flat; folds down to vertical
keel_r = flap("KeelR", (0, -0.3, 0), PAPER_SHADE)

# A thin terracotta stripe on each wing (reads as a letterhead on the flat note, a livery when folded).
for wing, side in ((wing_l, 1), (wing_r, -1)):
    sm = bpy.data.meshes.new("Stripe")
    sm.from_pydata([(0.25, side * 0.36, 0.008), (1.15, side * 0.07, 0.008), (1.05, side * 0.05, 0.008), (0.25, side * 0.31, 0.008)], [], [(0, 1, 2, 3)])
    so = bpy.data.objects.new("Stripe", sm)
    sm.materials.append(STRIPE)
    scene.collection.objects.link(so)
    so.parent = wing

rig = bpy.data.objects.new("Rig", None)
scene.collection.objects.link(rig)
for o in (wing_l, wing_r, keel_l, keel_r):
    o.parent = rig

# ---- Keyframes: 0 = flat note facing the camera, FRAMES-1 = dart in a 3/4 flying pose ----
scene.frame_start, scene.frame_end = 0, FRAMES - 1


def key(frame, fold, pose):
    """fold 0..1 folds the flaps; pose 0..1 turns the rig from 'note' to 'flying'."""
    # Rotation about +X: a +y point goes up for positive angles, a -y point goes down.
    keel_l.rotation_euler.x = math.radians(-90 * fold)    # keels swing down under the hinge
    keel_r.rotation_euler.x = math.radians(90 * fold)
    wing_l.rotation_euler.x = math.radians(14 * fold)     # wings lift into a shallow V
    wing_r.rotation_euler.x = math.radians(-14 * fold)
    # Note: sheet faces the camera (roll 90°). Flying: banked 35° so the wing tops stay visible.
    rig.rotation_euler = (math.radians(90 - 55 * pose), math.radians(-8 * pose), math.radians(28 * pose - 10))
    rig.location = (0, 0, 0.25 * pose)
    for o in (keel_l, keel_r, wing_l, wing_r):
        o.keyframe_insert("rotation_euler", frame=frame)
    rig.keyframe_insert("rotation_euler", frame=frame)
    rig.keyframe_insert("location", frame=frame)


key(0, 0, 0)
key(4, 0, 0.1)
key(16, 1, 0.55)
key(FRAMES - 1, 1, 1)

# ---- Camera, light, transparent output ----
cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
scene.collection.objects.link(cam)
cam.location = (0.4, -5.2, 1.6)
cam.rotation_euler = (math.radians(76), 0, math.radians(4))
cam.data.lens = 50
scene.camera = cam
for rot, energy in (((0.6, 0.4, 0.8), 3.2), ((-0.4, -0.3, -2.2), 1.4)):
    light = bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN"))
    light.data.energy = energy
    light.rotation_euler = rot
    scene.collection.objects.link(light)
fill = bpy.data.objects.new("fill", bpy.data.lights.new("fill", "POINT"))  # lights the note while it faces the camera
fill.data.energy = 450
fill.location = (0.6, -4.2, 2.2)
scene.collection.objects.link(fill)
scene.world = bpy.data.worlds.new("w")
engines = [e.identifier for e in scene.render.bl_rna.properties["engine"].enum_items]
scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in engines else "BLENDER_EEVEE"
scene.view_settings.view_transform = "Standard"
scene.render.film_transparent = True
# Ink outlines give the paper an illustrated edge that reads on the cream page.
scene.render.use_freestyle = True
scene.render.line_thickness_mode = "ABSOLUTE"
scene.render.line_thickness = 1.2
fs = scene.view_layers[0].freestyle_settings
lineset = fs.linesets[0] if len(fs.linesets) else fs.linesets.new("Ink")
lineset.linestyle = lineset.linestyle or bpy.data.linestyles.new("Ink")  # the empty factory scene has none
lineset.linestyle.color = srgb("1C1B18")
lineset.select_by_visibility = True
lineset.select_crease = False
scene.render.resolution_x, scene.render.resolution_y = 480, 360
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.color_mode = "RGBA"
scene.render.image_settings.quality = 80

os.makedirs(OUT_DIR, exist_ok=True)
for f in range(FRAMES):
    scene.frame_set(f)
    scene.render.filepath = os.path.join(OUT_DIR, f"fold-{f:02d}.webp")
    bpy.ops.render.render(write_still=True)
total = sum(os.path.getsize(os.path.join(OUT_DIR, n)) for n in os.listdir(OUT_DIR))
print("FRAMES", FRAMES, "TOTAL", total, "bytes")
