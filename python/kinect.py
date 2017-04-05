from openni import *

ctx = Context()
ctx.init()

# Create a depth generator
depth = DepthGenerator()
depth.create(ctx)

# Set it to VGA maps at 30 FPS
depth.set_resolution_preset(RES_VGA)
depth.fps = 30

# Start generating
ctx.start_generating_all()

while True:
    # Update to next frame
    nRetVal = ctx.wait_one_update_all(depth)

    depthMap = depth.map

    # Get the coordinates of the middle pixel
    x = depthMap.width / 2
    y = depthMap.height / 2

    # Get the pixel at these coordinates
    pixel = depthMap[x, y]

    print
    "The middle pixel is %d millimeters away." % pixel